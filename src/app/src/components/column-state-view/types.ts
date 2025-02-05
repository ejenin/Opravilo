import {IFullStateModel} from '../../store/project/types'

export interface IColumnStateViewProps {
    states: IFullStateModel[]
    
    onRemove: (id: number) => void
    onAddStateClick: () => void
    onEditStateClick: (stateId: number) => void

    onViewCardClick: (cardId: number) => void
    onAddCardClick: (stateId: number) => void
    
    onChangeState: (cardId: number, newStateId: number) => void
}