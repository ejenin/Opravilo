import {IProjectState} from './types'
import {createReducer} from '@reduxjs/toolkit'
import {addState, changeState, createCard, editCard, editState, fetchProject, removeCard, removeState} from './thunks'
import {
    addCardClick,
    closeCardViewModal,
    hideStateModal, moveCardToState,
    showCardViewModal,
    showEditStateModal,
    showStateModal,
} from './actions'

const initialState: IProjectState = {
    fetchingCurrentProject: false,
    createEditStateModalVisible: false,
    fetchingCreateEditState: false,
    cardViewModalVisible: false,
    fetchingCard: false,
    fetchingChangeState: false
}

export const projectReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
        return {...state, fetchingCurrentProject: true}
    })
    builder.addCase(fetchProject.fulfilled, (state, {payload}) => {
        return {...state, fetchingCurrentProject: false, currentProject: payload}
    })
    builder.addCase(fetchProject.rejected, (state) => {
        return {...state, fetchingCurrentProject: false}
    })
    builder.addCase(removeState.pending, (state) => {
        return {...state, fetchingCurrentProject: true}
    })
    builder.addCase(removeState.fulfilled, (state) => {
        return {...state, fetchingCurrentProject: false}
    })
    builder.addCase(removeState.rejected, (state) => {
        return {...state, fetchingCurrentProject: false}
    })
    builder.addCase(hideStateModal, (state) => {
        return {...state, createEditStateModalVisible: false, selectedStateId: undefined}
    })
    builder.addCase(showStateModal, (state) => {
        return {...state, createEditStateModalVisible: true}
    })
    builder.addCase(addState.pending, (state) => {
        return {...state, fetchingCreateEditState: true}
    })
    builder.addCase(addState.fulfilled, (state) => {
        return {...state, fetchingCreateEditState: false, createEditStateModalVisible: false}
    })
    builder.addCase(addState.rejected, (state) => {
        return {...state, fetchingCreateEditState: false}
    })
    builder.addCase(editState.pending, (state) => {
        return {...state, fetchingCreateEditState: true}
    })
    builder.addCase(editState.fulfilled, (state, {payload}) => {
        const {states} = state.currentProject
        const newStates = states.map((s) => {
            if (s.id == payload.id) {
                return {...s, name: payload.name}
            }
            return s
        })
                
        return {...state, currentProject: {...state.currentProject, states: newStates},  fetchingCreateEditState: false, createEditStateModalVisible: false, selectedStateId: undefined}
    })
    builder.addCase(editState.rejected, (state) => {
        return {...state, fetchingCreateEditState: false, selectedStateId: undefined}
    })
    builder.addCase(showEditStateModal, (state, {payload}) => {
        return {...state, createEditStateModalVisible: true, selectedStateId: payload}
    })
    builder.addCase(showCardViewModal, (state, {payload}) => {
        return {...state, selectedCardId: payload, cardViewModalVisible: true}
    })
    builder.addCase(closeCardViewModal, (state) => {
        return {...state, selectedCardId: undefined, cardViewModalVisible: false}
    })
    builder.addCase(editCard.pending, (state) => {
        return {...state, fetchingCard: true}
    })
    builder.addCase(editCard.fulfilled, (state, {payload}) => {
        const id = payload.id
        let  {states} = state.currentProject

        states = [...states]

        const stateColumnIndex = states.findIndex(s => s.cards.some(c => c.id == id))
        const stateColumn = states[stateColumnIndex]
        const stateCards = [...stateColumn.cards]
        const index = stateCards.findIndex(s => s.id == id)
        stateCards.splice(index, 1, payload)
        states.splice(stateColumnIndex, 1,{...stateColumn, cards: stateCards})

        return {...state, currentProject: {...state.currentProject, states: [...states]}, fetchingCard: false}
    })
    builder.addCase(editCard.rejected, (state) => {
        return {...state, fetchingCard: false }
    })
    builder.addCase(addCardClick, (state, {payload}) => {
        return {...state, selectedCardId: undefined, cardViewModalVisible: true, selectedStateId: payload}
    })
    builder.addCase(createCard.pending, (state) => {
        return {...state, fetchingCard: true}
    })
    builder.addCase(createCard.fulfilled, (state, {payload}) => {
        let  {states} = state.currentProject
        states = [...states]
        const stateColumnIndex = states.findIndex(s => s.id == state.selectedStateId)
        const stateColumn = states[stateColumnIndex]
        const stateCards = [...stateColumn.cards]
        stateCards.push(payload)
        states.splice(stateColumnIndex, 1,{...stateColumn, cards: stateCards})

        return {...state, currentProject: {...state.currentProject, states: [...states]}, fetchingCard: false, cardViewModalVisible: false, selectedStateId: undefined}
    })
    builder.addCase(createCard.rejected, (state) => {
        return {...state, fetchingCard: false, cardViewModalVisible: false, selectedStateId: undefined }
    })
    builder.addCase(removeCard.pending, (state) => {
        return {...state, fetchingCard: true}
    })
    builder.addCase(removeCard.fulfilled, (state, {payload}) => {
        let {states} = state.currentProject

        states = [...states]

        const stateColumnIndex = states.findIndex(s => s.cards.some(c => c.id == payload))
        const stateColumn = states[stateColumnIndex]
        const stateCards = [...stateColumn.cards]
        const index = stateCards.findIndex(s => s.id == payload)
        stateCards.splice(index, 1)
        states.splice(stateColumnIndex, 1,{...stateColumn, cards: stateCards})

        return {...state, currentProject: {...state.currentProject, states: [...states]}, fetchingCard: false, cardViewModalVisible: false}
    })
    builder.addCase(removeCard.rejected, (state) => {
        return {...state, fetchingCard: false, cardViewModalVisible: false }
    })
    builder.addCase(changeState.pending, (state) => {
        return {...state, fetchingChangeState: true}
    })
    builder.addCase(changeState.fulfilled, (state) => {
        return {...state, fetchingChangeState: false}
    })
    builder.addCase(changeState.rejected, (state) => {
        return {...state, fetchingChangeState: false}
    })
    builder.addCase(moveCardToState, (state, {payload}) => {
        // 1) ищем карту
        let {states} = state.currentProject
        states = [...states]
        
        const stateColumnIndex = states.findIndex(s => s.cards.some(c => c.id == payload.cardId))
        const stateColumn = states[stateColumnIndex]
        const stateCards = [...stateColumn.cards]
        const index = stateCards.findIndex(s => s.id == payload.cardId)
        const card = stateCards[index]
        
        // 2) удаляем из текущего стейта
        stateCards.splice(index, 1)
        states.splice(stateColumnIndex, 1, {...stateColumn, cards: stateCards})
        
        // 3) добавляем в новый стейт
        const newStateColumnIndex = states.findIndex(s => s.id == payload.newStateId)
        const newStateColumn = states[newStateColumnIndex]
        const newStateCards = [...newStateColumn.cards]
        newStateCards.push(card)
        states.splice(newStateColumnIndex, 1, {...newStateColumn, cards: newStateCards})
        return {...state, currentProject: {...state.currentProject, states: [...states]}}
    })
})