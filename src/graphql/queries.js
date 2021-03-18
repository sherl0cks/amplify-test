/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        prospectID
        activeSiteModelName
        activeSiteModel {
          id
          name
          version
          versionCount
          projectID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        siteModelNames
        siteModels {
          nextToken
          startedAt
        }
        activeDesign {
          id
          projectID
          siteModelID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        designs {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      prospectID
      activeSiteModelName
      activeSiteModel {
        id
        name
        version
        versionCount
        projectID
        trees {
          id
        }
        roofFacets {
          type
          bbox
        }
        roofObstructions {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      siteModelNames
      siteModels {
        items {
          id
          name
          version
          versionCount
          projectID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      activeDesign {
        id
        projectID
        siteModelID
        layout {
          id
        }
        stringing {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      designs {
        items {
          id
          projectID
          siteModelID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        prospectID
        activeSiteModelName
        activeSiteModel {
          id
          name
          version
          versionCount
          projectID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        siteModelNames
        siteModels {
          nextToken
          startedAt
        }
        activeDesign {
          id
          projectID
          siteModelID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        designs {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSiteModels = /* GraphQL */ `
  query SyncSiteModels(
    $filter: ModelSiteModelFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSiteModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        version
        versionCount
        projectID
        trees {
          id
        }
        roofFacets {
          type
          bbox
        }
        roofObstructions {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSiteModel = /* GraphQL */ `
  query GetSiteModel($id: ID!) {
    getSiteModel(id: $id) {
      id
      name
      version
      versionCount
      projectID
      trees {
        id
      }
      roofFacets {
        type
        geometry {
          type
          coordinatesString
        }
        properties {
          id
          type
        }
        bbox
      }
      roofObstructions {
        id
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listSiteModels = /* GraphQL */ `
  query ListSiteModels(
    $filter: ModelSiteModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSiteModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        version
        versionCount
        projectID
        trees {
          id
        }
        roofFacets {
          type
          bbox
        }
        roofObstructions {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDesigns = /* GraphQL */ `
  query SyncDesigns(
    $filter: ModelDesignFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDesigns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        projectID
        siteModelID
        layout {
          id
        }
        stringing {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDesign = /* GraphQL */ `
  query GetDesign($id: ID!) {
    getDesign(id: $id) {
      id
      projectID
      siteModelID
      layout {
        id
        modulePlacements {
          id
        }
        moduleSpecification {
          id
        }
      }
      stringing {
        id
        inverterSelections {
          id
          quantity
        }
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listDesigns = /* GraphQL */ `
  query ListDesigns(
    $filter: ModelDesignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDesigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectID
        siteModelID
        layout {
          id
        }
        stringing {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listProjectsByProspectId = /* GraphQL */ `
  query ListProjectsByProspectId(
    $prospectID: String
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectsByProspectId(
      prospectID: $prospectID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        prospectID
        activeSiteModelName
        activeSiteModel {
          id
          name
          version
          versionCount
          projectID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        siteModelNames
        siteModels {
          nextToken
          startedAt
        }
        activeDesign {
          id
          projectID
          siteModelID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        designs {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listSiteModelsByProjectId = /* GraphQL */ `
  query ListSiteModelsByProjectId(
    $projectID: ID
    $nameVersion: ModelSiteModelByProjectIDCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSiteModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSiteModelsByProjectId(
      projectID: $projectID
      nameVersion: $nameVersion
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        version
        versionCount
        projectID
        trees {
          id
        }
        roofFacets {
          type
          bbox
        }
        roofObstructions {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listDesignsByProjectId = /* GraphQL */ `
  query ListDesignsByProjectId(
    $projectID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDesignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDesignsByProjectId(
      projectID: $projectID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        projectID
        siteModelID
        layout {
          id
        }
        stringing {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const listDesignsBySiteModelId = /* GraphQL */ `
  query ListDesignsBySiteModelId(
    $siteModelID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelDesignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDesignsBySiteModelId(
      siteModelID: $siteModelID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        projectID
        siteModelID
        layout {
          id
        }
        stringing {
          id
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
