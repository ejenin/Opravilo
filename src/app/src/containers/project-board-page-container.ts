import {IProjectBoardPageProps, ProjectBoardPage} from '../pages/project-board'
import {AppDispatch, AppState} from '../store/store'
import {connect} from 'react-redux'
import {fetchProject} from '../store/project/thunks'
import {closeCardViewModal} from '../store/project/actions'

const mapStateToProps = (state: AppState) : Partial<IProjectBoardPageProps> => ({
    fetchingProject: state.project.fetchingCurrentProject,
    currentProject: state.project.currentProject,
    createEditStateVisible: state.project.createEditStateModalVisible,
    cardViewModalVisible: state.project.cardViewModalVisible,
    fetchingChangeState: state.project.fetchingChangeState
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<IProjectBoardPageProps> => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
    onCloseCardViewModal: () => dispatch(closeCardViewModal()),
})

export const ProjectBoardPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectBoardPage)