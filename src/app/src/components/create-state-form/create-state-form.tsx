import React, {useEffect} from 'react'
import {ICreateStateFormProps, IFormProperties} from './types'
import {Form, Input, Modal} from 'antd'

const {Item} = Form

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
}

export const CreateStateForm = (props: ICreateStateFormProps): JSX.Element => {
    const [form] = Form.useForm()
    const {onCancel, fetching, onOk, editingState, onOkEdit} = props

    useEffect(() => {
        if (editingState) {
            form.setFieldsValue(editingState)
        }
    }, [form])
    
    const onModalOk = async () => {
        form.submit()
    }

    const onFinish = (values: IFormProperties) => {
        if (editingState) {
            onOkEdit({...values, stateId: editingState.id})
        }
        else {
            onOk(values.name)
        }
    }

    const title = editingState ? 'Edit State' : 'Create State'
    
    return <Modal visible={true} onCancel={onCancel} title={title} onOk={onModalOk} confirmLoading={fetching}>
        <Form {...layout} form={form} onFinish={onFinish}>
            <Item label="Name" name="name" rules={[{required: true}]}>
                <Input />
            </Item>
        </Form>
    </Modal>
}