import {Amplify, DataStore} from "aws-amplify";
import geojson from "./data.json";
import {Project, SiteModel} from "./models";
import {
    geoJsonFeatureCollectionToProject,
    geoJsonFeatureToRoofFacet,
    projectToGeoJsonFeatureCollection,
    removeRoofFacetFromSiteModel,
    roofFacetToGeoJsonFeature,
} from "./domainModel/functionalProject";
import * as Repository from "./domainModel/repository";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// it.skip("should read and write GeoJSON", async () => {
//   require("util").inspect.defaultOptions.depth = null;

//   console.log("start");
//   await DataStore.start();

//   console.log("befpre");
//   const initialDatabaseResult = await DataStore.query(Project, (p) =>
//     p.prospectID("eq", "12345")
//   );
//   console.log("after");
//   const projectLengthInDatabase = initialDatabaseResult.length;

//   // if (projectLengthInDatabase === 0){
//   console.log("Database is empty. Let's populate it.");
//   // @ts-ignore
//   const project = geoJsonFeatureCollectionToProject(geojson);
//   console.log(project);
//   console.log(projectToGeoJsonFeatureCollection(project));
//   await DataStore.save(project);
//   if (project.activeSiteModel != undefined) {
//     await DataStore.save(project.activeSiteModel);
//   }
//   console.log(project.id);

//   await sleep(1000);
// });

jest.setTimeout(120000);

it("hello", async () => {
    await DataStore.clear()

    Amplify.Logger.LOG_LEVEL = 'DEBUG';

    // @ts-ignore
    const project = geoJsonFeatureCollectionToProject(geojson);

    await Repository.saveProject(project); // Will save initial project and site model
    if (project.activeSiteModel !== undefined) {

        await sleep(1000);

        const updatedSiteModel = removeRoofFacetFromSiteModel(project.activeSiteModel);
        await Repository.saveSiteModel(updatedSiteModel); // only saves updated site model

        await sleep(3000);
    }
});

it("query", async () => {
    const zero = await DataStore.query(SiteModel, (siteModel) =>
        siteModel
            .projectID("eq", "8f3ae965-c93c-4782-8bc2-cada11e005c9")
            .name("eq", "default")
            .version("eq", 0)
    );
    zero.map((it) =>
        console.log(
            it.roofFacets?.length +
            " " +
            it.name +
            " " +
            it.version +
            " " +
            it.versionCount
        )
    );
});


it('Foo', () =>{
   console.log([1,2,3,4,5].slice(1, 5))
});
