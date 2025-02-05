import {ColumnStateView, IColumnStateViewProps} from '../components/column-state-view'
import {AppDispatch, AppState} from '../store/store'
import {connect} from 'react-redux'
import {addCardClick, showCardViewModal, showEditStateModal, showStateModal} from '../store/project/actions'
import {changeState, removeState} from '../store/project/thunks'

const mapStateToProps = (state: AppState) : Partial<IColumnStateViewProps> => ({
    states: state.project.currentProject.states
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<IColumnStateViewProps> => ({
    onAddCardClick: (stateId) => dispatch(addCardClick(stateId)),
    onChangeState: (cardId, newStateId) => dispatch(changeState({cardId, newStateId})),
    onAddStateClick: () => dispatch(showStateModal()),
    onEditStateClick: (stateId) => dispatch(showEditStateModal(stateId)),
    onViewCardClick: (cardId) => dispatch(showCardViewModal(cardId)),
    onRemove: (stateId) => dispatch(removeState(stateId)),
})

export const ColumnStateViewContainer = connect(mapStateToProps, mapDispatchToProps)(ColumnStateView)