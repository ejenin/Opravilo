import {createAction} from '@reduxjs/toolkit'

export const showCreateProjectModal = createAction('showCreateProjectModal')
export const hideCreateProjectModal = createAction('hideCreateProjectModal')
export const editProject = createAction<number>('editProject')
export const projectRemoved = createAction<number>('projectRemoved')