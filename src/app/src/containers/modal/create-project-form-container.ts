import {CreateProjectForm, ICreateProjectFormProps} from '../../components/create-project-form'
import {AppDispatch, AppState} from '../../store/store'
import {connect} from 'react-redux'
import {ICreateProjectArgs, IEditProjectArgs} from '../../store/home/types'
import {createProject, editProjectThunk} from '../../store/home/thunks'
import {hideCreateProjectModal} from '../../store/home/actions'
import {selectedProjectSelector} from '../../store/selectors'

const mapStateToProps = (state: AppState) : Partial<ICreateProjectFormProps> => ({
    fetchingCreateProject: state.home.fetchingCreateOrEditProject,
    editingProject: selectedProjectSelector(state)
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<ICreateProjectFormProps> => ({
    onOk: (args: ICreateProjectArgs) => dispatch(createProject(args)),
    onOkEdit: (args: IEditProjectArgs) => dispatch(editProjectThunk(args)),
    onCancel: () => dispatch(hideCreateProjectModal()),
})

export const CreateProjectFormContainer = connect(mapStateToProps, mapDispatchToProps)(CreateProjectForm)