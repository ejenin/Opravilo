import {Button, Form, Input, Space} from 'antd'
import React, {useEffect} from 'react'
import {ICardModel, IEditModeProps} from './types'
import {CheckOutlined, CloseOutlined, DeleteOutlined} from '@ant-design/icons'

export const EditMode = (props: IEditModeProps): JSX.Element => {
    const [form] = Form.useForm()
    const {card, onCancelClick, fetchingCard, onSaveClick, onAddClick, onRemove} = props

    const {Item} = Form
    const {TextArea} = Input

    useEffect(() => {
        form.setFieldsValue(card)
    }, [form])

    const onSaveButtonClick = () => {
        form.submit()
    }

    const onFinish = (values: ICardModel) => {
        const newCard = card != undefined ? {...values, id: card.id} : {...values}

        if (card) {
            onSaveClick(newCard)
                .then(() => {
                    onCancelClick()
                })
        } else {
            onAddClick(newCard)
        }
    }

    return <div className="card-view">
        <Form form={form} onFinish={onFinish}>
            <header>
                <Item name="name" rules={[{required: true}]}>
                    <TextArea placeholder="Project Title" />
                </Item>
            </header>
            <div className="body-wrapper">
                <div className="description-etc">
                    <Space direction="vertical">
                        <span><h4 className="header">Description</h4></span>
                        <Item name="description" rules={[{required: true}]}>
                            <TextArea />
                        </Item>
                    </Space>
                </div>
                <div className="buttons-panel">
                    <Space direction="vertical" className="wrapper" size={0}>
                        <h4 className="header">Actions</h4>
                        <Button icon={<CheckOutlined />} type="text" block className="button" onClick={onSaveButtonClick} loading={fetchingCard}>Save</Button>
                        { card && <Button icon={<CloseOutlined />} type="text" block className="button" onClick={onCancelClick} loading={fetchingCard}>Cancel</Button>}
                        { card && <Button icon={<DeleteOutlined />} type="text" block danger className="button" onClick={onRemove} loading={fetchingCard}>Remove</Button> }
                    </Space>
                </div>
            </div>
        </Form>
    </div>
}