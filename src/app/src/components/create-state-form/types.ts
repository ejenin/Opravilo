import {IEditStateArgs} from '../../store/project/types'

export interface ICreateStateFormProps {
    onCancel: () => void
    fetching: boolean
    
    onOk: (name: string) => void
    onOkEdit: (args: IEditStateArgs) => void
    
    editingState?: ISelectedState
}

export interface IFormProperties {
    name: string
}

export interface ISelectedState {
    id?: number
    name?: string
}