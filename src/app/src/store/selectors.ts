import {createSelector} from '@reduxjs/toolkit'
import {AppState} from './store'
import {IFullStateModel, IStateModel} from './project/types'
import {ISelectedState} from '../components/create-state-form/types'
import {IProjectModel} from './home/types'
import {ISelectedProject} from '../components/create-project-form/types'
import {ICardModel} from '../components/card-view/types'

export const selectedStateSelector = createSelector(
    [(state: AppState) => state.project.currentProject.states, (state: AppState) => state.project.selectedStateId],
    (states: IStateModel[], stateId): ISelectedState => {
        return states.filter((s) => s.id === stateId)[0]
    }
)

export const selectedProjectSelector = createSelector(
    [(state: AppState) => state.home.projects, (state: AppState) => state.home.selectedProjectId],
    (projects: IProjectModel[], selectedProjectId): ISelectedProject => {
        return projects.filter((p) => p.id == selectedProjectId)[0]
    }
)

export const selectedCardSelector = createSelector(
    [(state: AppState) => state.project.currentProject, (state: AppState) => state.project.selectedCardId],
    (project, selectedCardId) : ICardModel => {
        const state = project.states.filter((s: IFullStateModel) => s.cards.some(c => c.id == selectedCardId))[0]
        return state != undefined ? state.cards.filter((c: ICardModel) => c.id == selectedCardId)[0] : undefined
    }
)

export const cardStateSelector = createSelector(
    [(state: AppState) => state.project.currentProject.states, (state: AppState) => state.project.selectedCardId],
    (states: IFullStateModel[], selectedCardId) : IStateModel => {
        if (!selectedCardId) return undefined
        return states.filter(s => s.cards.some(c => c.id == selectedCardId))[0]
    }
)