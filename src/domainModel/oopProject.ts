import { BBox, Feature, FeatureCollection, Geometry, Polygon as GeoJsonPolygon, Position as GeoJsonPosition } from 'geojson'
import { throws } from 'node:assert';
import { 
    Project as DataStoreProject, 
    SiteModel as DataStoreSiteModel,
    RoofFacet as DataStoreRoofFacet, 
    Polygon as DataStorePolygon,  
    RoofFacetProperties as DataStoreRoofFacetProperties
} from '../models/index'


// export class Project extends DataStoreProject {
//     toFeatureCollection() : FeatureCollection {
//         return "a"
//     }
// }

export class SiteModel extends DataStoreSiteModel {
    toFeatureArray() : Array<Feature> {
        // @ts-ignore
        return this.roofFacets as Array<Feature>;
    }
    static fromFeatureArray(featureArray : Array<Feature>) : SiteModel {
        // @ts-ignore
        const roofFacets = featureArray.map(feature => new RoofFacet({ properties: feature.properties, geometry: feature.geometry }) );
        return new SiteModel({name: "test", projectID: "projectID", roofFacets: roofFacets});
    }
} 

export class RoofFacet extends DataStoreRoofFacet implements Feature {
    type!: 'Feature'
    geometry!: Polygon;
    properties!: RoofFacetProperties
    bbox?: BBox
}

export class Polygon extends DataStorePolygon implements GeoJsonPolygon {
    type!: 'Polygon';
    get coordinates(): GeoJsonPosition[][] {
        return JSON.parse(this.coordinatesString)
    }
    bbox?: BBox
}

export class RoofFacetProperties extends DataStoreRoofFacetProperties {
    
}