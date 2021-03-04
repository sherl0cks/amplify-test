import React from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGluLWhvbG1lcyIsImEiOiJja2txMDd4aDQwNWJ5Mm5rNXgzcDgzaDRhIn0.uaIsmfpDTTwt50NoXf0ybg';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -80.92553298898889,
  latitude: 34.07755236737492,
  zoom: 18,
  pitch: 0,
  bearing: 0,
  maxZoom: 30
};

// Data to be used by the LineLayer
const data = 'https://gist.githubusercontent.com/sherl0cks/18e75a205999a81ef26306f8455f41e4/raw/25e5afef69b987c9e2fb91c9ebd1329b5983ff1d/geo.json'
function App() {
  const layers = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data,
      pickable: true,
      stroked: true,
      filled: true,
      extruded: false,
      wireframe: true,
      lineWidthScale: .1,
      lineWidthMinPixels: 1,
      getFillColor: () => [Math.random() * 255, Math.random() * 255, Math.random() * 255, 255],
      getRadius: 100,
      getLineWidth: 1,
      getElevation: 30,
      getLineColor: [255, 255, 255]
    })
  ];

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


