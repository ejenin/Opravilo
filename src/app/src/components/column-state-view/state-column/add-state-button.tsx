import React from 'react'
import {PlusOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import {IAddStateColumnProps} from './types'

export const AddStateButton = (props: IAddStateColumnProps): JSX.Element => {
    const {onClick} = props
    return <Button icon={<PlusOutlined/>} ghost className="add-state-button" type="dashed" onClick={onClick}>Add state</Button>
}