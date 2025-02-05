import {IChangeCardStateArgs, IStateModel} from '../../store/project/types'

export interface ICardViewProps {
    card: ICardModel
    states: IStateModel[]
    selectedCardState: IStateModel
    
    fetchingCard: boolean
    onSaveClick: (changedCard: ICardModel) => Promise<unknown>
    onAddClick: (newCard: ICardModel) => void
    onRemoveClick: (cardId: number) => void
    onChangeState: (args: IChangeCardStateArgs) => void
}

export interface ICardModel {
    id: number
    name: string
    description: string
}

export interface IReadModeProps {
    card: ICardModel
    selectedCardState: IStateModel
    
    fetchingCard: boolean
    onEditClick: () => void
    onRemove: () => void
    onChangeState: (args: IChangeCardStateArgs) => void
    
    states: IStateModel[]
}

export interface IEditModeProps {
    card: ICardModel
    fetchingCard: boolean
    onCancelClick: () => void
    onRemove: () => void
    onSaveClick: (changedCard: ICardModel) => Promise<unknown>
    onAddClick: (newCard: ICardModel) => void
}
