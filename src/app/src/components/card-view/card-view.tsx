import React, {useState} from 'react'
import {ICardViewProps} from './types'
import {Modal} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import {ReadMode} from './card-view-read'
import {EditMode} from './card-view-edit'

import './card-view.scss'

export const CardView = (props: ICardViewProps): JSX.Element => {
    const {card, fetchingCard, onSaveClick, onRemoveClick, onAddClick, states, onChangeState, selectedCardState} = props
    
    const noSelectedCard = card == undefined
    
    const [editMode, setEditMode] = useState(noSelectedCard)

    const onRemove = () => {
        Modal.confirm({
            title: 'Remove card',
            content: 'Are you sure you want to remove this card?',
            icon: <DeleteOutlined />,
            onOk: () => {
                onRemoveClick(card.id)
            }
        })
    }
    
    // todo: transpileOnly в этом компоненте починило какую-то супер блядскую ошибку с выбиванием вебпак вотча
    // todo: https://www.npmjs.com/package/react-textarea-autosize
    
    return editMode 
        ? <EditMode card={card} onCancelClick={() => setEditMode(false)} fetchingCard={fetchingCard} onSaveClick={onSaveClick} onRemove={onRemove} onAddClick={onAddClick}/> 
        : <ReadMode card={card} onEditClick={() => setEditMode(true)} fetchingCard={fetchingCard} onRemove={onRemove} states={states} onChangeState={onChangeState} selectedCardState={selectedCardState}/>
}