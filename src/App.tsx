import {useState} from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Amplify, DataStore} from 'aws-amplify';
import geojson from './data.json';
import {
    geoJsonFeatureCollectionToProject,
    removeRoofFacetFromSiteModel, restoreSiteModelToOlderVersion,
    siteModelToGeoJsonFeatureCollection
} from './domainModel/functionalProject';
import awsconfig from './aws-exports'
import {Project, SiteModel} from './models';
import {useEffect} from 'react';
import * as Repository from "./domainModel/repository";
import {
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGluLWhvbG1lcyIsImEiOiJja2txMDd4aDQwNWJ5Mm5rNXgzcDgzaDRhIn0.uaIsmfpDTTwt50NoXf0ybg';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -80.92553298898889,
    latitude: 34.07755236737492,
    zoom: 20,
    pitch: 0,
    bearing: 0,
    maxZoom: 30
};

Amplify.configure(awsconfig)

DataStore.configure({
    errorHandler: (error) => {
        console.warn('Unrecoverable error', {error});
    },
});


async function getGeoJson(): Promise<Project> {
    const project = await DataStore.query(Project, '863948aa-7cca-4758-a532-7352da532d1e')
    console.log(project)
    if (project === undefined) {
        throw new Error("Cannot find project")
    }
    return project
}

function createSiteModelGeoJsonLayer(siteModel: SiteModel | undefined): GeoJsonLayer<any> {
    if (siteModel === undefined) {
        throw new Error("Cannot be undefined.")
    }
    return new GeoJsonLayer({
        id: 'geojson-layer',
        // @ts-ignore
        data: siteModelToGeoJsonFeatureCollection(siteModel),
        pickable: true,
        stroked: true,
        filled: true,
        extruded: false,
        wireframe: true,
        lineWidthScale: .2,
        lineWidthMinPixels: 1,
        getFillColor: () => [173, 216, 230, 100],
        getRadius: 100,
        getLineWidth: 1,
        getElevation: 30,
        getLineColor: [255, 255, 255]
    })
}

interface MapProps {
    activeSiteModelVersion: SiteModel | undefined,
    layers: GeoJsonLayer<any>[]
    handleNewSiteModelVersion(siteModel: SiteModel): void
}

function Map(props: MapProps) {

    async function removeRoofFacet() {
        if (props.activeSiteModelVersion !== undefined && props.activeSiteModelVersion.version === 0) {
            const newSiteModel = removeRoofFacetFromSiteModel(props.activeSiteModelVersion)
            props.handleNewSiteModelVersion(newSiteModel)
        } else {
            console.warn('Version 0 site model was not set in Map component.')
        }
    }

    return (
        <div style={{height: '100vh', width: '80vw', position: 'relative'}}>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={props.layers}
            >
                <StaticMap height="100vh" width="100wh" mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                           mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/>
                <button onClick={removeRoofFacet}>Delete</button>
            </DeckGL>
        </div>
    );
}

interface VersionListProps {
    siteModelHistory: SiteModel[]
    handleSiteModelChange(siteModel: SiteModel): void
    handleRestoreLatestSiteModelToOlderVersion(olderVersion: SiteModel): void
}

function VersionList(props: VersionListProps) {
    // @ts-ignore
    return (
        <Grid container justify="center" spacing={2}>
            <h2>Site Model Versions</h2>
            {props.siteModelHistory.map((value) => (
                <Grid key={value.version} item>
                    <VersionCard handleSiteModelChange={props.handleSiteModelChange} handleRestoreLatestSiteModelToOlderVersion={props.handleRestoreLatestSiteModelToOlderVersion} siteModel={value}/>
                </Grid>
            ))}
        </Grid>
    );
}

interface VersionCardProps {
    siteModel: SiteModel
    handleSiteModelChange(siteModel: SiteModel): void
    handleRestoreLatestSiteModelToOlderVersion(olderVersion: SiteModel): void
}

function VersionCard(props: VersionCardProps) {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
    });
    const classes = useStyles();

    function onViewClick() {
        props.handleSiteModelChange(props.siteModel)
    }

    function onRestoreClick() {
        props.handleRestoreLatestSiteModelToOlderVersion(props.siteModel)
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title={`Version: ${props.siteModel.version}`}
                subheader={`Roof Sections: ${props.siteModel.roofFacets?.length}`}
            />
            <CardActions disableSpacing>
                <Button size="small" onClick={onViewClick}>View</Button>
                <Button size="small" onClick={onRestoreClick}>Restore</Button>
            </CardActions>
        </Card>
    );
}

// function SiteModelsList(){
//     return(
//
//     );
// }

function App() {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'row',
        },
        paper: {
            height: '100vh',
            width: '100',
        },
        control: {
            padding: theme.spacing(2),
        },
    }));
    const classes = useStyles();


    // @ts-ignore TODO sort out how to remove this bit
    const [project, setProject] = useState(geoJsonFeatureCollectionToProject(geojson))
    const [activeSiteModelVersion, setActiveSiteModelVersion] = useState(project.activeSiteModel as SiteModel)
    const [latestSiteModelVersion, setLatestSiteModelVersion] = useState(activeSiteModelVersion)
    const [siteModelHistory, setSiteModelHistory] = useState([] as SiteModel[])
    const [layers, setLayers] = useState(
        [
            createSiteModelGeoJsonLayer(activeSiteModelVersion)
        ]
    )

    useEffect(
        () => {
            Repository.saveProject(project).then(
                siteModel => {
                    setSiteModelHistory([project.activeSiteModel as SiteModel, siteModel])
                }
            )


        }, []
    )

    function handleSiteModelChange(siteModel: SiteModel): void {
        setActiveSiteModelVersion(siteModel)
        setLayers([
            createSiteModelGeoJsonLayer(siteModel)
        ])
    }

    async function handleNewSiteModelVersion(newSiteModelVersion: SiteModel): Promise<void> {
        setActiveSiteModelVersion(newSiteModelVersion)
        setLatestSiteModelVersion(newSiteModelVersion)
        // @ts-ignore
        setLayers(createSiteModelGeoJsonLayer(newSiteModelVersion))

        const savedSiteModelVersion = await Repository.saveSiteModel(newSiteModelVersion)

        const history = siteModelHistory.slice(1, siteModelHistory.length)
        setSiteModelHistory([newSiteModelVersion, ...history, savedSiteModelVersion])
    }

    async function handleRestoreLatestSiteModelToOlderVersion(olderVersion: SiteModel): Promise<void>{
        const newSiteModelVersion = restoreSiteModelToOlderVersion(latestSiteModelVersion, olderVersion)
        return handleNewSiteModelVersion(newSiteModelVersion)
    }


    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={2}>
                <VersionList handleSiteModelChange={handleSiteModelChange} handleRestoreLatestSiteModelToOlderVersion={handleRestoreLatestSiteModelToOlderVersion} siteModelHistory={siteModelHistory}/>
            </Grid>
            <Grid item xs={10}>
                <Map activeSiteModelVersion={activeSiteModelVersion} layers={layers} handleNewSiteModelVersion={handleNewSiteModelVersion}/>
            </Grid>
        </Grid>
    );
}


export default App;


