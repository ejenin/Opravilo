import React from 'react'
import {Modal} from 'antd'
import { CardViewContainer } from '../../containers/card-view-container'
import {ICardViewModalProps} from './types'

import './card-view-modal.scss'

export const CardViewModal = (props: ICardViewModalProps): JSX.Element => {
    return <Modal visible={true} onCancel={props.onClose} footer={null} className="card-view-modal">
        <CardViewContainer />
    </Modal>
}