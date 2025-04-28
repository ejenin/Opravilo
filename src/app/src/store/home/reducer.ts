import {IHomeState} from './types'
import {createReducer} from '@reduxjs/toolkit'
import {createProject, editProjectThunk, fetchProjects, removeProject} from './thunks'
import {editProject, hideCreateProjectModal, projectRemoved, showCreateProjectModal,} from './actions'

const initialState: IHomeState = {
    fetchingProjects: false,
    projects: [],
    createProjectsModalVisible: false,
    fetchingCreateOrEditProject: false,
}

export const homeReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      return {...state, fetchingProjects: true}  
    })
    builder.addCase(fetchProjects.fulfilled, (state, {payload}) => {
        return {...state, fetchingProjects: false, projects: payload}
    })
    builder.addCase(fetchProjects.rejected, (state) => {
        return {...state, fetchingProjects: false}
    })
    builder.addCase(showCreateProjectModal, (state) => {
        return {...state, createProjectsModalVisible: true}
    })
    builder.addCase(hideCreateProjectModal, (state) => {
        return {...state, createProjectsModalVisible: false, selectedProjectId: undefined}
    })
    builder.addCase(createProject.pending, (state) => {
        return {...state, fetchingCreateOrEditProject: true}
    })
    builder.addCase(createProject.fulfilled, (state) => {
        return {...state, fetchingCreateOrEditProject: false, createProjectsModalVisible: false}
    })
    builder.addCase(createProject.rejected, (state) => {
        return {...state, fetchingCreateOrEditProject: false}
    })
    builder.addCase(editProject, (state, {payload}) => {
       return {...state, createProjectsModalVisible: true, selectedProjectId: payload}
    })
    builder.addCase(editProjectThunk.pending, (state) => {
        return {...state, fetchingCreateOrEditProject: true}
    })
    builder.addCase(editProjectThunk.fulfilled, (state) => {
        return {...state, fetchingCreateOrEditProject: false, createProjectsModalVisible: false, selectedProjectId: undefined}
    })
    builder.addCase(editProjectThunk.rejected, (state) => {
        return {...state, fetchingCreateOrEditProject: false, selectedProjectId: undefined}
    })
    builder.addCase(removeProject.pending, (state) => {
        return {...state, fetchingProjects: true}
    })
    builder.addCase(removeProject.fulfilled, (state) => {
        return {...state, fetchingProjects: false}
    })
    builder.addCase(removeProject.rejected, (state) => {
        return {...state, fetchingProjects: false}
    })
    builder.addCase(projectRemoved, (state, {payload}) => {
        const newProjects = state.projects.filter(p => p.id != payload)
        return {...state, projects: newProjects}
    })
})