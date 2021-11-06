import {IHomeState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {createProject, editProjectThunk, fetchProject, fetchProjects} from "./thunks";
import {editProject, hideCreateProjectModal, showCreateProjectModal} from "./actions";

const initialState: IHomeState = {
    fetchingProjects: false,
    projects: [],
    createProjectsModalVisible: false,
    fetchingCreateOrEditProject: false,
    fetchingCurrentProject: false
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
        return {...state, createProjectsModalVisible: false, editingProject: undefined}
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
       const selectedProject = state.projects.filter(p => p.id == payload)[0];
       return {...state, createProjectsModalVisible: true, editingProject: selectedProject}
    });
    builder.addCase(editProjectThunk.pending, (state) => {
        return {...state, fetchingCreateOrEditProject: true}
    })
    builder.addCase(editProjectThunk.fulfilled, (state) => {
        return {...state, fetchingCreateOrEditProject: false, createProjectsModalVisible: false, editingProject: undefined}
    })
    builder.addCase(editProjectThunk.rejected, (state) => {
        return {...state, fetchingCreateOrEditProject: false, editingProject: undefined}
    })
    builder.addCase(fetchProject.pending, (state) => {
        return {...state, fetchingCurrentProject: true}
    })
    builder.addCase(fetchProject.fulfilled, (state, {payload}) => {
        return {...state, fetchingCurrentProject: false, currentProject: payload}
    })
    builder.addCase(fetchProject.rejected, (state) => {
        return {...state, fetchingCurrentProject: false}
    })
})