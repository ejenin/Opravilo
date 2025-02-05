import {ICreateProjectArgs, IEditProjectArgs} from '../../store/home/types'

export interface IFormProperties {
    name: string
    description: string
}

export interface ICreateProjectFormProps {
    onCancel: () => void
    onOk: (args: ICreateProjectArgs) => void
    onOkEdit: (args: IEditProjectArgs) => void
    fetchingCreateProject: boolean
    
    editingProject?: ISelectedProject
}

export interface ISelectedProject {
    id?: number
    name?: string
    description?: string
}