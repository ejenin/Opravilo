import React from 'react'
import {IColumnStateViewProps} from './types'
import {StateColumn} from './state-column'
import {AddStateButton} from './state-column/add-state-button'
import {Space} from 'antd'
import {DndContext, DragOverEvent} from '@dnd-kit/core'

import './column-state-view.scss'

export const ColumnStateView = (props: IColumnStateViewProps): JSX.Element => {

    const columns = props.states.map((s) => {
        return <StateColumn name={s.name} key={s.id} id={s.id} onRemove={props.onRemove} onEdit={props.onEditStateClick}
                            cards={s.cards} onViewCardClick={props.onViewCardClick} onAddCardClick={props.onAddCardClick}/>
    })
    
    const onDragEnd = (event: DragOverEvent) => {
        if (event && event.over) {
            const cardId = parseInt(event.active.id.split('-')[1])
            const newStateId = parseInt(event.over.id.split('-')[1])

            // check old state
            const isInNewState = props.states.filter(s => s.id == newStateId)[0].cards.some(c => c.id == cardId)
            
            if (!isInNewState) {
                props.onChangeState(cardId, newStateId)   
            } else {
                console.log('already is in new state!')
            }
        }
    }

    return <div className="column-state-view">
        <DndContext onDragEnd={onDragEnd}>
            <Space align="start">
                {columns}
                <AddStateButton onClick={props.onAddStateClick}/>
            </Space>
        </DndContext>
    </div>
}