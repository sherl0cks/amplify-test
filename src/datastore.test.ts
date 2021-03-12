
import { Amplify, DataStore } from 'aws-amplify';
import geojson from './datasmall.json'
import { Project } from './models';
import {geoJsonFeatureCollectionToProject, geoJsonFeatureToRoofFacet, projectToGeoJsonFeatureCollection, roofFacetToGeoJsonFeature} from './domainModel/functionalProject'
import awsconfig from "./aws-exports";



Amplify.configure(awsconfig)
DataStore.configure({
  errorHandler: (error) => {
    console.warn('Unrecoverable error', { error });
  },
});
jest.setTimeout(30000)


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

it('should read and write GeoJSON', async () =>  {
  
    require('util').inspect.defaultOptions.depth = null
    
    console.log("start")
    await DataStore.start()

    console.log("befpre")
    const initialDatabaseResult = await DataStore.query(Project)
    console.log("after")
    const projectLengthInDatabase = initialDatabaseResult.length

    // if (projectLengthInDatabase === 0){
      console.log("Database is empty. Let's populate it.")
      // @ts-ignore
      const project = geoJsonFeatureCollectionToProject(geojson)
      console.log(project)
      console.log(projectToGeoJsonFeatureCollection(project))
      await DataStore.save(project)
      if (project.activeSiteModel != undefined){
        await DataStore.save(project.activeSiteModel)
      }
      console.log(project.id)

      await sleep(1000)
    // } else {
      // console.log(initialDatabaseResult)
    // } 
});