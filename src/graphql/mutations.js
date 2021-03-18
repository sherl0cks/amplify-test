/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const createSiteModel = /* GraphQL */ `
  mutation CreateSiteModel(
    $input: CreateSiteModelInput!
    $condition: ModelSiteModelConditionInput
  ) {
    createSiteModel(input: $input, condition: $condition) {
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
export const updateSiteModel = /* GraphQL */ `
  mutation UpdateSiteModel(
    $input: UpdateSiteModelInput!
    $condition: ModelSiteModelConditionInput
  ) {
    updateSiteModel(input: $input, condition: $condition) {
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
export const deleteSiteModel = /* GraphQL */ `
  mutation DeleteSiteModel(
    $input: DeleteSiteModelInput!
    $condition: ModelSiteModelConditionInput
  ) {
    deleteSiteModel(input: $input, condition: $condition) {
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
export const createDesign = /* GraphQL */ `
  mutation CreateDesign(
    $input: CreateDesignInput!
    $condition: ModelDesignConditionInput
  ) {
    createDesign(input: $input, condition: $condition) {
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
export const updateDesign = /* GraphQL */ `
  mutation UpdateDesign(
    $input: UpdateDesignInput!
    $condition: ModelDesignConditionInput
  ) {
    updateDesign(input: $input, condition: $condition) {
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
export const deleteDesign = /* GraphQL */ `
  mutation DeleteDesign(
    $input: DeleteDesignInput!
    $condition: ModelDesignConditionInput
  ) {
    deleteDesign(input: $input, condition: $condition) {
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
