import {Button, Form, Input, Alert, Spin} from 'antd'
import * as React from 'react'
import {Redirect} from 'react-router-dom'
import {IFormProperties, IRegistrationFormProps} from './types'

const Item = Form.Item

export const RegistrationForm = (props: IRegistrationFormProps): JSX.Element => {
    const [form] = Form.useForm()

    if (props.loginSuccess) {
        return <Redirect to="/home"/>
    }
    
    const onFinish = (values: IFormProperties) => {
        props.onRegister(values.username, values.password, values.displayName)
    }

    const showError = props.errors?.length > 0

    return (<Form form={form} onFinish={onFinish}>
        <Item name="username" rules={[{required: true, message: 'Please input your username!'}]}>
            <Input placeholder="Username"/>
        </Item>
        <Item name="displayName" rules={[{required: true, message: 'Please input your display name!'}]}>
            <Input placeholder="Display Name"/>
        </Item>
        <Item name="password" rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password placeholder="Password"/>
        </Item>
        <Item name="confirm" dependencies={['password']} hasFeedback
              rules={[{required: true, message: 'Please input your password!'},
                  ({getFieldValue}) => ({
                      validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                              return Promise.resolve()
                          }
                          return Promise.reject(new Error('The two password that you entered do not match!'))
                      }
                  })]}>
            <Input.Password placeholder="Confirm Password"/>
        </Item>
        <Item>
            <Spin spinning={props.fetching}>
                <Button type="primary" htmlType="submit" block>
                    Register
                </Button>
            </Spin>
        </Item>
        {
            showError
                ? <Alert message={props.errors[0]} type="error" />
                : <></>
        }
    </Form>)
}