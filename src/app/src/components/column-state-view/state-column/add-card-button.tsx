import {Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import React from 'react'
import {IAddCardButtonProps} from './types'

export const AddCardButton = (props: IAddCardButtonProps): JSX.Element => {
    const {onClick} = props
    return <Button icon={<PlusOutlined/>} ghost className="add-card-button" type="dashed" onClick={onClick}>Add card</Button>
}