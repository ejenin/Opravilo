import {RouteComponentProps} from 'react-router-dom'
import {IFullProjectModel} from '../../store/project/types'

interface RouteParams {
    id: string
}

export interface IProjectBoardPageProps extends RouteComponentProps<RouteParams> {
    fetchingProject: boolean
    fetchProject: (id: number) => void
    currentProject?: IFullProjectModel
    
    createEditStateVisible: boolean
    
    cardViewModalVisible: boolean
    onCloseCardViewModal: () => void
    
    fetchingChangeState: boolean
}