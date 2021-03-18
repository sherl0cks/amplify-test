export const schema = {
    "models": {
        "Project": {
            "name": "Project",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "prospectID": {
                    "name": "prospectID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "activeSiteModelName": {
                    "name": "activeSiteModelName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "activeSiteModel": {
                    "name": "activeSiteModel",
                    "isArray": false,
                    "type": {
                        "model": "SiteModel"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "projectActiveSiteModelId"
                    }
                },
                "siteModels": {
                    "name": "siteModels",
                    "isArray": true,
                    "type": {
                        "model": "SiteModel"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "projectID"
                    }
                },
                "activeDesign": {
                    "name": "activeDesign",
                    "isArray": false,
                    "type": {
                        "model": "Design"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "projectActiveDesignId"
                    }
                },
                "designs": {
                    "name": "designs",
                    "isArray": true,
                    "type": {
                        "model": "Design"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "projectID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Projects",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byProspectID",
                        "fields": [
                            "prospectID"
                        ],
                        "queryField": "listProjectsByProspectId"
                    }
                }
            ]
        },
        "SiteModel": {
            "name": "SiteModel",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "version": {
                    "name": "version",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "versionCount": {
                    "name": "versionCount",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "projectID": {
                    "name": "projectID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "trees": {
                    "name": "trees",
                    "isArray": true,
                    "type": {
                        "nonModel": "Tree"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "roofFacets": {
                    "name": "roofFacets",
                    "isArray": true,
                    "type": {
                        "nonModel": "RoofFacet"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "roofObstructions": {
                    "name": "roofObstructions",
                    "isArray": true,
                    "type": {
                        "nonModel": "RoofObstruction"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                }
            },
            "syncable": true,
            "pluralName": "SiteModels",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byProjectID",
                        "fields": [
                            "projectID",
                            "name",
                            "version"
                        ],
                        "queryField": "listSiteModelsByProjectId"
                    }
                }
            ]
        },
        "Design": {
            "name": "Design",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "projectID": {
                    "name": "projectID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "siteModelID": {
                    "name": "siteModelID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "layout": {
                    "name": "layout",
                    "isArray": false,
                    "type": {
                        "nonModel": "Layout"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "stringing": {
                    "name": "stringing",
                    "isArray": false,
                    "type": {
                        "nonModel": "Stringing"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Designs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byProjectID",
                        "fields": [
                            "projectID"
                        ],
                        "queryField": "listDesignsByProjectId"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bySiteModelID",
                        "fields": [
                            "siteModelID"
                        ],
                        "queryField": "listDesignsBySiteModelId"
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {
        "Tree": {
            "name": "Tree",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "RoofFacet": {
            "name": "RoofFacet",
            "fields": {
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "geometry": {
                    "name": "geometry",
                    "isArray": false,
                    "type": {
                        "nonModel": "Polygon"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "properties": {
                    "name": "properties",
                    "isArray": false,
                    "type": {
                        "nonModel": "RoofFacetProperties"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "bbox": {
                    "name": "bbox",
                    "isArray": true,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "Polygon": {
            "name": "Polygon",
            "fields": {
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "coordinatesString": {
                    "name": "coordinatesString",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "RoofFacetProperties": {
            "name": "RoofFacetProperties",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "RoofObstruction": {
            "name": "RoofObstruction",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Layout": {
            "name": "Layout",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "modulePlacements": {
                    "name": "modulePlacements",
                    "isArray": true,
                    "type": {
                        "nonModel": "ModulePlacement"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "moduleSpecification": {
                    "name": "moduleSpecification",
                    "isArray": false,
                    "type": {
                        "nonModel": "ModuleSpecification"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "ModulePlacement": {
            "name": "ModulePlacement",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "ModuleSpecification": {
            "name": "ModuleSpecification",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "Stringing": {
            "name": "Stringing",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "inverterSelections": {
                    "name": "inverterSelections",
                    "isArray": true,
                    "type": {
                        "nonModel": "InverterSelection"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "InverterSelection": {
            "name": "InverterSelection",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "inverterSpecification": {
                    "name": "inverterSpecification",
                    "isArray": false,
                    "type": {
                        "nonModel": "InverterSpecification"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "quantity": {
                    "name": "quantity",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "InverterSpecification": {
            "name": "InverterSpecification",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "be473e620b6b79341c3009c61003abd2"
};