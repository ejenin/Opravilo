import {getClient} from '../../api/BaseClient'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {ICreateProjectArgs, IEditProjectArgs} from './types'
import {CreateProjectRequest, UpdateProjectRequest} from '../../api/client'
import {projectRemoved} from './actions'

const client = getClient()

export const fetchProjects = createAsyncThunk(
    'fetchProjects', 
    async () => {
        return await client.projectsAll()
    }
)

export const createProject = createAsyncThunk(
    'createProject',
    async (args: ICreateProjectArgs, {dispatch}) => {
        const request: CreateProjectRequest = new CreateProjectRequest({
            description: args.description,
            name: args.name
        })
        
        await client.projects(request)
        dispatch(fetchProjects())
    }
)

export const editProjectThunk = createAsyncThunk(
    'editProject',
    async (args: IEditProjectArgs, {dispatch}) => {
        const request: UpdateProjectRequest = new UpdateProjectRequest({
            description: args.description,
            name: args.name,
        })

        await client.projects4(args.id, request)
        dispatch(fetchProjects())
    }
)

export const removeProject = createAsyncThunk(
    'removeProject',
    async (projectId: number, {dispatch}) => {
        await client.projects3(projectId)
        dispatch(projectRemoved(projectId))
    }
)