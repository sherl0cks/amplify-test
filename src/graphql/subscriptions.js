/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
export const onCreateSiteModel = /* GraphQL */ `
  subscription OnCreateSiteModel {
    onCreateSiteModel {
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
export const onUpdateSiteModel = /* GraphQL */ `
  subscription OnUpdateSiteModel {
    onUpdateSiteModel {
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
export const onDeleteSiteModel = /* GraphQL */ `
  subscription OnDeleteSiteModel {
    onDeleteSiteModel {
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
export const onCreateDesign = /* GraphQL */ `
  subscription OnCreateDesign {
    onCreateDesign {
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
export const onUpdateDesign = /* GraphQL */ `
  subscription OnUpdateDesign {
    onUpdateDesign {
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
export const onDeleteDesign = /* GraphQL */ `
  subscription OnDeleteDesign {
    onDeleteDesign {
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
