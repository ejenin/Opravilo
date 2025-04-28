import {CreateStateForm, ICreateStateFormProps} from '../../components/create-state-form'
import {AppDispatch, AppState} from '../../store/store'
import {connect} from 'react-redux'
import {hideStateModal} from '../../store/project/actions'
import {addState, editState} from '../../store/project/thunks'
import {IEditStateArgs} from '../../store/project/types'
import {selectedStateSelector} from '../../store/selectors'

const mapStateToProps = (state: AppState) : Partial<ICreateStateFormProps> => ({
    fetching: state.project.fetchingCreateEditState,
    editingState: selectedStateSelector(state),
})

const mapDispatchToProps = (dispatch : AppDispatch) : Partial<ICreateStateFormProps> => ({
    onCancel: () => dispatch(hideStateModal()),
    onOk: (name) => dispatch(addState(name)),
    onOkEdit: (args: IEditStateArgs) => dispatch(editState(args)),
})

export const CreateStateFormContainer = connect(mapStateToProps, mapDispatchToProps)(CreateStateForm)