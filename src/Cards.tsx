import {Project, SiteModel} from "./models";
import Grid from "@material-ui/core/Grid";
import {Button, Card, CardContent, makeStyles, TextField, Typography} from "@material-ui/core";
import {useState} from "react";

interface VersionListProps {
    siteModelHistory: SiteModel[]

    handleSiteModelChange(siteModel: SiteModel): void

    handleRestoreLatestSiteModelToOlderVersion(olderVersion: SiteModel): void
}

export function VersionList(props: VersionListProps) {

    return (
        <Grid container justify="center" spacing={2}>
            <h2>Site Model Versions</h2>

            {props.siteModelHistory.map((value) => (
                <Grid key={value.version} item>
                    <VersionCard handleSiteModelChange={props.handleSiteModelChange}
                                 handleRestoreLatestSiteModelToOlderVersion={props.handleRestoreLatestSiteModelToOlderVersion}
                                 siteModel={value}/>
                </Grid>
            ))}
        </Grid>
    );
}

interface VersionCardProps {
    siteModel: SiteModel

    handleSiteModelChange(siteModel: SiteModel): void

    handleRestoreLatestSiteModelToOlderVersion(olderVersion: SiteModel): void
}

export function VersionCard(props: VersionCardProps) {
    const useStyles = makeStyles({
        root: {
            minWidth: 250,
        },
    });
    const classes = useStyles();

    function onViewClick() {
        props.handleSiteModelChange(props.siteModel)
    }

    function onRestoreClick() {
        props.handleRestoreLatestSiteModelToOlderVersion(props.siteModel)
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography>Name: {props.siteModel.name} Version: {props.siteModel.version}</Typography>
                <Typography color={"textSecondary"}>Roof Sections: {props.siteModel.roofFacets?.length}</Typography>

                <Button color={"primary"} size="small" onClick={onViewClick}>View</Button>
                <Button color={"secondary"} size="small" onClick={onRestoreClick}>Restore</Button>
            </CardContent>
        </Card>
    );
}

interface SiteModelListProps {
    siteModelNames: string[]
    project: Project

    handleSelectSiteModel(siteModelName: string): Promise<void>

    handleCreateSiteModel(siteModelName: string): Promise<void>
    handleLoadProject(projectID: string): void
}

export function SiteModelList(props: SiteModelListProps) {
    const useStyles = makeStyles({
        root: {
            minWidth: 150,
        },
    });
    const classes = useStyles();
    return (
        <div>
            <Grid container justify="center" spacing={2}>
                <h2>Project</h2>
                <Grid item key="project" className={classes.root}>
                    <ProjectCard handleLoadProject={props.handleLoadProject} project={props.project}/>
                </Grid>
                <h2>Site Models</h2>
                <Grid key="create" className={classes.root} item>
                    <CreateSiteModelCard handleCreateSiteModel={props.handleCreateSiteModel}/>
                </Grid>
                {props.siteModelNames.map((value) => (
                    <Grid key={value} item>
                        <SiteModelCard name={value} handleSelectSiteModel={props.handleSelectSiteModel}/>
                    </Grid>
                ))}

            </Grid>
        </div>

    );
}

interface CreateSiteModelCardProps {
    handleCreateSiteModel(siteModelName: string): Promise<void>
}

export function CreateSiteModelCard(props: CreateSiteModelCardProps) {
    const [siteModelName, setSiteModelName] = useState("")

    function onClick() {
        props.handleCreateSiteModel(siteModelName)
    }

    return (
        <Card>
            <CardContent>
                <Typography color="textPrimary" gutterBottom>
                    Create A New Site Model
                </Typography>
                <p/>
                <TextField id="standard-basic" label="Name" value={siteModelName}
                           onChange={(e) => {
                               setSiteModelName(e.target.value)
                           }}/>
                <Button color={"secondary"} size="small" onClick={onClick}>Create</Button>
            </CardContent>
        </Card>
    );
}

interface ProjectCardProps {
    project: Project
    handleLoadProject(projectID : String): void
}

export function ProjectCard(props: ProjectCardProps) {
    const [newProjectID, setNewProjectId] = useState("")

    function onClick() {
        props.handleLoadProject(newProjectID)
    }

    return (
        <Card>
            <CardContent>
                <Typography color="textPrimary" gutterBottom>
                    Current ID
                </Typography>
                <Typography color="textSecondary" gutterBottom>{props.project.id}</Typography>
                <p/>
                <TextField id="standard-basic" label="Project ID" value={newProjectID}
                           onChange={(e) => {
                               setNewProjectId(e.target.value)
                           }}
                />
                <Button color={"secondary"} size="small" onClick={onClick}>Load Project</Button>
            </CardContent>
        </Card>
    );
}

interface SiteModelCardProps {
    name: string

    handleSelectSiteModel(siteModelName: string): Promise<void>
}

export function SiteModelCard(props: SiteModelCardProps) {
    const useStyles = makeStyles({
        root: {
            minWidth: 100,
        },
    });
    const classes = useStyles();

    function onClick() {
        props.handleSelectSiteModel(props.name)
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography color="textPrimary" gutterBottom>
                    Name: {props.name}
                </Typography>
                <Button color={"primary"} size="small" onClick={onClick}>Select</Button>
            </CardContent>
        </Card>
    );
}
