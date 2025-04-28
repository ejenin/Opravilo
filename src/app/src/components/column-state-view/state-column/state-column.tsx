import React from 'react'
import {ICardPreviewProps, IColumnBodyProps, IColumnHeaderProps, IContextMenuProps, IStateColumnProps} from './types'
import {Button, Dropdown, Menu, Modal, Space} from 'antd'
import {EllipsisOutlined, EditOutlined, DeleteOutlined, InfoCircleOutlined, HolderOutlined} from '@ant-design/icons'
import {AddCardButton} from './add-card-button'
import {useDroppable, useDraggable} from '@dnd-kit/core'

import './state-column.scss'

const menu = (props: IContextMenuProps) => {
    
    const onRemoveClick = () => {
        Modal.confirm({
            title: 'Remove state',
            content: 'Are you sure you want to remove this state?',
            icon: <DeleteOutlined />,
            onOk: () => {
                props.onRemove(props.id)
            }
        })
    }
    
    return <Menu>
        <Menu.Item key="1" icon={<EditOutlined/>} onClick={() => props.onEdit(props.id)}>
            Edit
        </Menu.Item>
        <Menu.Item key="2" icon={<DeleteOutlined/>} danger onClick={onRemoveClick}>
            Remove
        </Menu.Item>
    </Menu>
}

const ColumnHeader = (props: IColumnHeaderProps): JSX.Element => {
    return <header>
            <h2>{props.name}</h2>
            <Dropdown overlay={menu({id: props.id, onRemove: props.onRemove, onEdit: props.onEdit})}>
                <EllipsisOutlined className="dots" />
            </Dropdown>
        </header>
}

const CardPreview = (props: ICardPreviewProps): JSX.Element => {
    const {id, name, onViewCardClick} = props

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'draggable-' + id,
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 5px)`,
    } : undefined
    
    return <div className="card-preview" ref={setNodeRef} style={style}>
            <h3>{name}</h3>
            <div className="buttons">
                <Button icon={<InfoCircleOutlined />} type="text" onClick={() => onViewCardClick(id)}/>
                <Button icon={<HolderOutlined />} {...listeners} {...attributes} className="grabbable" type="text"/>
            </div>
        </div>
}

const ColumnBody = (props: IColumnBodyProps): JSX.Element => {
    const {cards, onViewCardClick, onAddCardClick, stateId} = props
    
    const cardsList = cards.map((c, i) => {
        return <CardPreview name={c.name} key={i} id={c.id} onViewCardClick={onViewCardClick}/>
    })
    
    const {setNodeRef} = useDroppable({
        id: 'droppable-' + stateId
    })
    
    return <div className="column-body" ref={setNodeRef}>
        <Space direction="vertical">
            {cardsList}
            <AddCardButton onClick={() => onAddCardClick(stateId)}/>
        </Space>
    </div>
}

export const StateColumn = (props: IStateColumnProps): JSX.Element => {
    const {name, id, onRemove, onEdit, cards, onViewCardClick, onAddCardClick} = props
    
    return <div className="state-column">
        <ColumnHeader id={id} name={name} onRemove={onRemove} onEdit={onEdit} />
        <ColumnBody cards={cards} onViewCardClick={onViewCardClick} onAddCardClick={onAddCardClick} stateId={id}/>
    </div>
}