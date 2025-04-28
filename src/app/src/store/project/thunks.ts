import {getClient} from '../../api/BaseClient'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {AppState} from '../store'
import {CreateCardRequest, CreateStateRequest, UpdateCardRequest, UpdateStateRequest} from '../../api/client'
import {ICardModel, IChangeCardStateArgs, IEditStateArgs, IFullStateModel} from './types'
import {moveCardToState} from './actions'

const client = getClient()

export const fetchProject = createAsyncThunk(
    'fetchProject',
    async (projectId: number) => {
        return await client.projects2(projectId)
    }
)

export const removeState = createAsyncThunk(
    'removeState',
    async (stateId: number, {dispatch, getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id

        await client.states3(projectId, stateId)
        dispatch(fetchProject(projectId))
    }
)

export const addState = createAsyncThunk(
    'addState',
    async (name: string, {dispatch, getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id

        const request: CreateStateRequest = new CreateStateRequest({
            name: name
        })

        await client.states(projectId, request)
        dispatch(fetchProject(projectId))
    }
)

export const editState = createAsyncThunk(
    'editState',
    async (args: IEditStateArgs, {getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id

        const request: UpdateStateRequest = new UpdateStateRequest({
            name: args.name
        })
        
        return await client.states2(projectId, args.stateId, request)
    }
)

export const editCard = createAsyncThunk(
    'editCard',
    async (args: ICardModel, {getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id
        
        const request: UpdateCardRequest = new UpdateCardRequest({
            name: args.name,
            description: args.description
        })
        
        return await client.cards2(args.id, projectId, request)
    }
)

export const createCard = createAsyncThunk(
    'createCard',
    async (args: ICardModel, {getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id
        const stateId = appState.project.selectedStateId

        const request: CreateCardRequest = new CreateCardRequest({
            name: args.name,
            description: args.description
        })

        return await client.cards(stateId, projectId, request)
    }
)

export const removeCard = createAsyncThunk(
    'removeCard',
    async (cardId: number, {getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id
        
        await client.cards3(projectId, cardId)
        return cardId
    }
)

export const changeState = createAsyncThunk(
    'changeState',
    async (args: IChangeCardStateArgs, {dispatch, getState}) => {
        const appState = getState() as AppState
        const projectId = appState.project.currentProject.id
        
        const currentStateId = appState.project.currentProject.states.filter((s: IFullStateModel) => s.cards.some(c => c.id == args.cardId))[0].id
        
        await dispatch(moveCardToState(args)) 
        
        try {
            // todo: better backend action url/name
            await client.state(args.cardId, args.newStateId, projectId)   
        } catch {
            await dispatch(moveCardToState({cardId: args.cardId, newStateId: currentStateId}))
        }
    }
)