import {useEffect, useState} from 'react';
import {GeoJsonLayer} from '@deck.gl/layers';
import Grid from '@material-ui/core/Grid';
import {Amplify, DataStore} from 'aws-amplify';
import geojson from './data.json';
import {
    geoJsonFeatureCollectionToProject,
    geoJsonFeatureCollectionToSiteModel,
    restoreSiteModelToOlderVersion,
    siteModelToGeoJsonFeatureCollection
} from './domainModel/functionalProject';
import awsconfig from './aws-exports'
import {SiteModel, Project} from './models';
import * as Repository from "./domainModel/repository";
import {makeStyles} from "@material-ui/core";
import {SiteModelList, VersionList} from "./Cards";
import {DesignMap} from "./DesignMap";


Amplify.configure(awsconfig)

DataStore.configure({
    errorHandler: (error) => {
        console.warn('Unrecoverable error', {error});
    },
});

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
    const [siteModelNames, setSiteModelNames] = useState([] as string[])
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
                    setSiteModelNames([project.activeSiteModel?.name as string])
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

    async function handleRestoreLatestSiteModelToOlderVersion(olderVersion: SiteModel): Promise<void> {
        const newSiteModelVersion = restoreSiteModelToOlderVersion(latestSiteModelVersion, olderVersion)
        return handleNewSiteModelVersion(newSiteModelVersion)
    }

    async function handleCreateSiteModel(siteModelName: string): Promise<void> {
        // @ts-ignore
        const newSiteModel = geoJsonFeatureCollectionToSiteModel(geojson, project.id, siteModelName)


        const updatedProject = Project.copyOf(project, updated => {
            updated.activeSiteModel = newSiteModel
            updated.activeSiteModelName = siteModelName
            updated.siteModelNames = [...siteModelNames, siteModelName]
        })
        setProject(updatedProject)
        const newSiteModelVersion = await Repository.saveProject(updatedProject)
        console.log("new site model version name: " + newSiteModelVersion.name)
        setSiteModelHistory([updatedProject.activeSiteModel as SiteModel, newSiteModelVersion])
        setSiteModelNames([...siteModelNames, siteModelName])
        setActiveSiteModelVersion(newSiteModel)
        setLatestSiteModelVersion(newSiteModel)
        // @ts-ignore
        setLayers(createSiteModelGeoJsonLayer(newSiteModel))
    }


    async function handleSelectSiteModel(siteModelName: string) {
        const siteModels = await DataStore.query(SiteModel, siteModel => siteModel.projectID("eq", project.id).name("beginsWith", siteModelName))
        const orderedSiteModels = siteModels.sort((one, two) => {
            return one.version - two.version
        })
        const newProject = Project.copyOf(project, updated => {
            updated.activeSiteModel = orderedSiteModels[0]
            updated.activeSiteModelName = siteModelName
        })
        await DataStore.save(newProject)
        orderedSiteModels.map(it => console.log(it.name + " " + it.version))
        setSiteModelHistory(orderedSiteModels)
        setActiveSiteModelVersion(orderedSiteModels[0])
        setLatestSiteModelVersion(orderedSiteModels[0])
        // @ts-ignore
        setLayers(createSiteModelGeoJsonLayer(orderedSiteModels[0]))
    }

    async function handleLoadProject(projectID: string) {
        const newProject = await DataStore.query(Project, projectID)
        console.log(project)
        if (newProject !== undefined) {
            setProject(newProject)
            setSiteModelNames(newProject.siteModelNames as string[])
            const siteModels = await DataStore.query(SiteModel, siteModel => siteModel.projectID("eq", project.id).name("beginsWith", project.activeSiteModelName as string))
            const orderedSiteModels = siteModels.sort((one, two) => {
                return one.version - two.version
            })
            orderedSiteModels.map(it => console.log(it.name + " " + it.version))
            // TODO fix me await handleSelectSiteModel(newProject.activeSiteModelName as string)
        }
    }

    return (
        <Grid container className={classes.root} spacing={4}>
            <Grid item xs={1}>
                <SiteModelList project={project} siteModelNames={siteModelNames}
                               handleCreateSiteModel={handleCreateSiteModel}
                               handleSelectSiteModel={handleSelectSiteModel}
                               handleLoadProject={handleLoadProject}
                />
            </Grid>
            <Grid item xs={2}>
                <VersionList handleSiteModelChange={handleSiteModelChange}
                             handleRestoreLatestSiteModelToOlderVersion={handleRestoreLatestSiteModelToOlderVersion}
                             siteModelHistory={siteModelHistory}/>
            </Grid>
            <Grid item xs={9}>
                <DesignMap activeSiteModelVersion={activeSiteModelVersion} layers={layers}
                           handleNewSiteModelVersion={handleNewSiteModelVersion}/>
            </Grid>
        </Grid>
    );
}


export default App;


