import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Tree {
  readonly id: string;
  constructor(init: ModelInit<Tree>);
}

export declare class RoofFacet {
  readonly type: string;
  readonly geometry: Polygon;
  readonly properties: RoofFacetProperties;
  readonly bbox?: (number | null)[];
  constructor(init: ModelInit<RoofFacet>);
}

export declare class Polygon {
  readonly type: string;
  readonly coordinatesString: string;
  constructor(init: ModelInit<Polygon>);
}

export declare class RoofFacetProperties {
  readonly id: string;
  readonly type?: string;
  constructor(init: ModelInit<RoofFacetProperties>);
}

export declare class RoofObstruction {
  readonly id: string;
  constructor(init: ModelInit<RoofObstruction>);
}

export declare class Layout {
  readonly id: string;
  readonly modulePlacements?: (ModulePlacement | null)[];
  readonly moduleSpecification?: ModuleSpecification;
  constructor(init: ModelInit<Layout>);
}

export declare class ModulePlacement {
  readonly id: string;
  constructor(init: ModelInit<ModulePlacement>);
}

export declare class ModuleSpecification {
  readonly id: string;
  constructor(init: ModelInit<ModuleSpecification>);
}

export declare class Stringing {
  readonly id: string;
  readonly inverterSelections?: (InverterSelection | null)[];
  constructor(init: ModelInit<Stringing>);
}

export declare class InverterSelection {
  readonly id: string;
  readonly inverterSpecification?: InverterSpecification;
  readonly quantity?: number;
  constructor(init: ModelInit<InverterSelection>);
}

export declare class InverterSpecification {
  readonly id: string;
  constructor(init: ModelInit<InverterSpecification>);
}

export declare class Project {
  readonly id: string;
  readonly prospectID?: string;
  readonly activeSiteModelName?: string;
  readonly activeSiteModel?: SiteModel;
  readonly siteModels?: SiteModel[];
  readonly activeDesign?: Design;
  readonly designs?: (Design | null)[];
  constructor(init: ModelInit<Project>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

export declare class SiteModel {
  readonly id: string;
  readonly name: string;
  readonly version: number;
  readonly versionCount: number;
  readonly projectID: string;
  readonly trees?: Tree[];
  readonly roofFacets?: RoofFacet[];
  readonly roofObstructions?: RoofObstruction[];
  constructor(init: ModelInit<SiteModel>);
  static copyOf(source: SiteModel, mutator: (draft: MutableModel<SiteModel>) => MutableModel<SiteModel> | void): SiteModel;
}

export declare class Design {
  readonly id: string;
  readonly projectID: string;
  readonly siteModelID: string;
  readonly layout?: Layout;
  readonly stringing?: Stringing;
  constructor(init: ModelInit<Design>);
  static copyOf(source: Design, mutator: (draft: MutableModel<Design>) => MutableModel<Design> | void): Design;
}