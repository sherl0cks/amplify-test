import {RoofFacet, Project, SiteModel} from "../models/index";
import {
    Feature as GeoJsonFeature,
    Polygon as GeoJsonPolygon,
    FeatureCollection as GeoJsonFeatureCollection,
    FeatureCollection,
} from "geojson";
import "bson-objectid";
import ObjectID from "bson-objectid";

/**
 * A note on identity and DataStore:
 * 1. Objects are immutable
 * 2. Identities are assigned by DataStore and cannot be provided by clients.
 *
 * This encourages:
 * 1. A functional programming model.
 * 2. useState / useContext / DataStore.query to retrieve the DataStore record when writing back.
 *      e.g. SiteModel (DataStore model) => GeoJson (not datastore model) => SiteModel => DataStore.save()
 */

export function roofFacetToGeoJsonFeature(
    roofFacet: RoofFacet
): GeoJsonFeature {
    return {
        type: "Feature",
        properties: {
            id: roofFacet.properties.id,
            type: "RoofFacet",
        },
        geometry: {
            type: "Polygon",
            coordinates: JSON.parse(roofFacet.geometry.coordinatesString),
        },
    };
}

export function geoJsonFeatureToRoofFacet(feature: GeoJsonFeature): RoofFacet {
    const geoJsonPolygon = feature.geometry as GeoJsonPolygon;
    return new RoofFacet({
        type: "Feature",
        properties: {
            id: feature.properties?.id,
            type: "RoofFacet",
        },
        geometry: {
            type: "Polygon",
            coordinatesString: JSON.stringify(geoJsonPolygon.coordinates),
        },
    });
}

export function geoJsonFeatureCollectionToProject(
    featureCollection: FeatureCollection
): Project {
    const project = new Project({activeSiteModelName: "default"})
    const siteModel = new SiteModel({
        name: "default",
        projectID: project.id,
        version: 0,
        versionCount: 1,
        roofFacets: featureCollection.features
            .filter((feature) => feature.properties?.type === "RoofFacet")
            .map((feature) => geoJsonFeatureToRoofFacet(feature)),
    });

    return Project.copyOf(project, updated => {
        updated.activeSiteModel = siteModel
    })
}

export function projectToGeoJsonFeatureCollection(
    project: Project
): GeoJsonFeatureCollection {
    if (project?.activeSiteModel?.roofFacets === undefined) {
        throw new Error("roof facets must be defined!");
    }
    return siteModelToGeoJsonFeatureCollection(project.activeSiteModel)
}

export function siteModelToGeoJsonFeatureCollection(siteModel: SiteModel): GeoJsonFeatureCollection {
    if (siteModel?.roofFacets === undefined) {
        throw new Error("roof facets must be defined!");
    }
    return {
        type: "FeatureCollection",
        features: siteModel.roofFacets.map((roofFacet) =>
            roofFacetToGeoJsonFeature(roofFacet)
        ),
    };
}

export function removeRoofFacetFromSiteModel(siteModel: SiteModel): SiteModel {
    const newRoofFacets = siteModel?.roofFacets ? [...siteModel.roofFacets] : [];
    if (newRoofFacets.length > 0) newRoofFacets.splice(-1, 1);
    return SiteModel.copyOf(siteModel, (updated) => {
        updated.versionCount += 1
        updated.roofFacets = newRoofFacets;
    });
}

export function restoreSiteModelToOlderVersion(siteModel: SiteModel, olderVersion: SiteModel): SiteModel {
    return SiteModel.copyOf(siteModel, updated => {
        updated.versionCount += 1
        updated.roofFacets = olderVersion.roofFacets
    })
}
