import {AppDispatch, AppState} from '../store/store'
import {connect} from 'react-redux'
import {IProjectsListProps, ProjectsList} from '../components/projects-list'
import {editProject} from '../store/home/actions'
import {removeProject} from '../store/home/thunks'

const mapStateToProps = (state: AppState) : Partial<IProjectsListProps> => ({
    projects: state.home.projects
})

const mapDispatchToProps = (dispatch: AppDispatch) : Partial<IProjectsListProps> => ({
    editProject: (id) => dispatch(editProject(id)),
    removeProject: (id) => dispatch(removeProject(id))
})

export const ProjectsListContainer = connect(mapStateToProps, mapDispatchToProps)(ProjectsList)