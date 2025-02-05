import {AppDispatch, AppState} from '../store/store'
import {HomePage, IHomePageProps} from '../pages/home'
import {connect} from 'react-redux'
import {fetchProjects} from '../store/home/thunks'
import {showCreateProjectModal} from '../store/home/actions'

const mapStateToProps = (state: AppState) : Partial<IHomePageProps> => ({
    fetchingProjects: state.home.fetchingProjects,
    projectsEmpty: state.home.projects.length === 0,
    createProjectModalVisible: state.home.createProjectsModalVisible
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<IHomePageProps> => ({
    fetchProjects: () => dispatch(fetchProjects()),
    showCreateProjectModal: () => dispatch(showCreateProjectModal()),
})

export const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)