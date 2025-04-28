import {ICardModel} from '../../../store/project/types'

export interface IStateColumnProps {
    id: number
    name: string
    
    cards?: ICardModel[]
    
    onRemove: (id: number) => void
    onEdit: (id: number) => void

    onViewCardClick: (cardId: number) => void
    onAddCardClick: (stateId: number) => void
}

export interface IColumnHeaderProps {
    id: number
    name: string
    onRemove: (id: number) => void
    onEdit: (id: number) => void
}

export interface IColumnBodyProps {
    cards?: ICardModel[]

    onViewCardClick: (cardId: number) => void
    onAddCardClick: (stateId: number) => void
    stateId: number
}

export interface ICardPreviewProps {
    name: string
    id: number
    
    onViewCardClick: (cardId: number) => void
}

export interface IContextMenuProps {
    id: number
    onRemove: (id: number) => void
    onEdit: (id: number) => void
}

export interface IAddStateColumnProps {
    onClick: () => void
}

export interface IAddCardButtonProps {
    onClick: () => void
}