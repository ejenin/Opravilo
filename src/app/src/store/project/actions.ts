import {createAction} from '@reduxjs/toolkit'
import {IMoveCardArgs} from './types'

export const hideStateModal = createAction('hideStateModal')
export const showStateModal = createAction('showStateModal')
export const showEditStateModal = createAction<number>('showEditStateModal')
export const showCardViewModal = createAction<number>('showCardViewModal')
export const closeCardViewModal = createAction('closeCardViewModal')
export const addCardClick = createAction<number>('addCardClick')

export const moveCardToState = createAction<IMoveCardArgs>('moveCardToState')