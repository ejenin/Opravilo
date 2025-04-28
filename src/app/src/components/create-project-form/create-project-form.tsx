import React, {useEffect} from 'react'
import {Form, Input, Modal} from 'antd'
import {ICreateProjectFormProps, IFormProperties} from './types'

const {Item} = Form

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
}

export const CreateProjectForm = (props: ICreateProjectFormProps): JSX.Element => {
    const [form] = Form.useForm()
    const {onCancel, fetchingCreateProject, onOk, editingProject, onOkEdit} = props
    
    useEffect(() => {
        if (editingProject) {
            form.setFieldsValue(editingProject)   
        }
    }, [form])
    
    const onModalOk = async () => {
        form.submit()
    }
    
    const onFinish = (values: IFormProperties) => {
        if (editingProject) {
            onOkEdit({...values, id: editingProject.id})
        }
        else {
            onOk(values)   
        }
    }
    
    const title = editingProject ? 'Edit Project' : 'Create Project'
    
    return <Modal visible={true} onCancel={onCancel} title={title} onOk={onModalOk} confirmLoading={fetchingCreateProject}>
            <Form {...layout} form={form} onFinish={onFinish}>
                <Item label="Name" name="name" rules={[{required: true}]}>
                    <Input />
                </Item>
                <Item label="Description" name="description" rules={[{required: true}]}>
                    <Input.TextArea />
                </Item>
            </Form>
        </Modal>
}