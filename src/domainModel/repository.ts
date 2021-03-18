import {Amplify, DataStore} from 'aws-amplify';
import {Project, SiteModel} from '../models/index'

export async function saveSiteModel(siteModel: SiteModel): Promise<SiteModel> {
    if (siteModel.version != 0) {
        throw new Error("SiteModel must be version 0")
    }

    await DataStore.save(siteModel)
    const versionedSiteModel = createVersionedSiteModel(siteModel)
    await DataStore.save(versionedSiteModel)
    return versionedSiteModel
}

export async function saveProject(project: Project): Promise<SiteModel> {
    await DataStore.save(project)
    if (project.activeSiteModel !== undefined) {
        const versionedSiteModel = createVersionedSiteModel(project.activeSiteModel)
        await DataStore.save(versionedSiteModel)
        return versionedSiteModel
    } else {
        throw new Error("Should not happen")
    }
}

function createVersionedSiteModel(siteModel: SiteModel): SiteModel {
    return new SiteModel({...siteModel, version: siteModel.versionCount})
}
