import {IProjectModel} from '../../store/home/types'

export interface IProjectsListProps {
    projects: IProjectModel[]
    
    editProject: (id: number) => void
    removeProject: (id: number) => void
    onCreateNewProjectClick: () => void
}