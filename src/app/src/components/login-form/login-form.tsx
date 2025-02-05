import {Alert, Button, Divider, Form, Input, Spin} from 'antd'
import React from 'react'
import {VkLogo} from '../vk-logo'
import {Redirect} from 'react-router-dom'
import OauthPopup from 'react-oauth-popup'
import {FormProperties, ILoginFormProps} from './types'

import './login-form.scss'

const Item = Form.Item

export const LoginForm = (props: ILoginFormProps): JSX.Element => {
    const {errors} = props
    
    const onFinish = (values: FormProperties) => {
        props.onLogin(values.username, values.password)
    }
    
    if (props.loginSuccess) {
        return <Redirect to="/home"/>
    }
    
    const authUrl = 'https://oauth.vk.com/authorize?client_id=7841557&redirect_uri=https://localhost:5011/vk-login-callback'
        
    const onCode = (code: string) => {
        props.onVkLogin(code)
    }
    
    const showError = errors?.length > 0
    
    return (<Form onFinish={onFinish} className="login-form">
        <Item name="username" rules={[{required: true, message: 'Please input your username!'}]}>
            <Input placeholder="Username"/>
        </Item>
        <Item name="password" rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password placeholder="Password"/>
        </Item>
        <Spin spinning={props.fetching}>
            <Item>
                <Button type="primary" htmlType="submit" block>
                    Submit
                </Button>
            </Item>
        </Spin>
        {
            showError
                ? <Alert message={errors[0]} type="error" />
                : <></>
        }
        <Divider>OR</Divider>
        <OauthPopup url={authUrl} title="Vk auth" onCode={onCode} onClose={() => null} width={780} height={500}>
            <div className="social-icons">
                <VkLogo/>
            </div>
        </OauthPopup>
    </Form>)
}