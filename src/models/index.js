// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Project, SiteModel, Design, Tree, RoofFacet, Polygon, RoofFacetProperties, RoofObstruction, Layout, ModulePlacement, ModuleSpecification, Stringing, InverterSelection, InverterSpecification } = initSchema(schema);

export {
  Project,
  SiteModel,
  Design,
  Tree,
  RoofFacet,
  Polygon,
  RoofFacetProperties,
  RoofObstruction,
  Layout,
  ModulePlacement,
  ModuleSpecification,
  Stringing,
  InverterSelection,
  InverterSpecification
};