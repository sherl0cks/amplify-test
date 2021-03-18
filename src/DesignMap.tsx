import {removeRoofFacetFromSiteModel} from "./domainModel/functionalProject";
import DeckGL from "@deck.gl/react";
import {StaticMap} from "react-map-gl";
import {SiteModel} from "./models";
import {GeoJsonLayer} from "@deck.gl/layers";

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

interface MapProps {
    activeSiteModelVersion: SiteModel | undefined,
    layers: GeoJsonLayer<any>[]

    handleNewSiteModelVersion(siteModel: SiteModel): void
}

export function DesignMap(props: MapProps) {

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
