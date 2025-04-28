import React from 'react'
import {Button, Dropdown, Menu, Space} from 'antd'
import {DeleteOutlined, EditOutlined, SendOutlined} from '@ant-design/icons'
import {IReadModeProps} from './types'

export const ReadMode = (props: IReadModeProps): JSX.Element => {
    const {card, onEditClick, onRemove, fetchingCard, states, onChangeState, selectedCardState} = props
    
    const menu = (
        <Menu>
            {states.map((s, i) => {
                return <Menu.Item key={i} disabled={s.id == selectedCardState.id} onClick={() => onChangeState({cardId: card.id, newStateId: s.id})}>{s.name}</Menu.Item>
            })}
        </Menu>
    )

    return <div className="card-view">
        <header>
            <h2>{card.name}</h2>
            <span>in {selectedCardState.name}</span>
        </header>
        <div className="body-wrapper">
            <div className="description-etc">
                <Space direction="vertical">
                    <span><h4 className="header">Description</h4></span>
                    <span className="description-body">{card.description}</span>
                </Space>
            </div>
            <div className="buttons-panel">
                <Space direction="vertical" className="wrapper" size={0}>
                    <h4 className="header">Actions</h4>
                    <Dropdown overlay={menu}>
                        <Button icon={<SendOutlined />} type="text" block className="button">Move to</Button>
                    </Dropdown>
                    <Button icon={<EditOutlined />} type="text" block className="button" onClick={onEditClick} loading={fetchingCard}>Edit</Button>
                    <Button icon={<DeleteOutlined />} type="text" block danger className="button" onClick={onRemove} loading={fetchingCard}>Remove</Button>
                </Space>
            </div>
        </div>
    </div>
}