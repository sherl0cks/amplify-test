import { useState } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

import { Amplify, DataStore } from 'aws-amplify';
import geojson from './data.json';
import { geoJsonFeatureCollectionToProject, projectToGeoJsonFeatureCollection } from './domainModel/functionalProject';
import awsconfig from './aws-exports'
import { Project } from './models';
import { useEffect } from 'react';
import {FeatureCollection} from 'geojson'

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
    console.warn('Unrecoverable error', { error });
  },
});



async function getGeoJson() : Promise<Project> {
  const project = await DataStore.query(Project, '863948aa-7cca-4758-a532-7352da532d1e')
  console.log(project)
  if (project === undefined){
    throw new Error("Cannot find project")
  }
  return project
}

function App() {

  // @ts-ignore TODO sort out how to remove this bit
  const [project, setProject] = useState(geoJsonFeatureCollectionToProject(geojson))
  const [layers, setLayer] = useState(
    [
      new GeoJsonLayer({
        id: 'geojson-layer',
        // @ts-ignore
        data: projectToGeoJsonFeatureCollection(project),
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
    ]
  )

  useEffect( () => {
    // @ts-ignore
    getGeoJson().then(project => {
      setProject(project)
      setLayer(
        [
          new GeoJsonLayer({
            id: 'geojson-layer',
            // @ts-ignore
            data: projectToGeoJsonFeatureCollection(project),
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
        ]
      )
    })
    }, []
  )



  return (

    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap height="100%" width="100%" mapStyle="mapbox://styles/mapbox/satellite-streets-v11" mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;


