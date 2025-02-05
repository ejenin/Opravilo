import {Layout, Menu, Space} from 'antd'
import Logo from '../../assets/logo.svg'
import React from 'react'
import {CustomFooter} from '../../components/custom-footer'
import { UserDropdownContainer } from '../../containers'
import {IUserLayoutProps} from '../types'
import {HomeOutlined, SettingOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

import './user-layout.scss'

const { Header, Content, Sider } = Layout

export const UserLayout = (props: IUserLayoutProps): JSX.Element => {
    const history = useHistory()
    const selectedKeys = [props.selectedMenu]
    
    return (
        <Layout className="user-layout">
            <Sider collapsible defaultCollapsed={true}>
                <div className="logo">
                    <a href="/home">
                        <Space>
                            <img src={Logo} alt="Logo" className="header-logo"/>
                            <span className="header-text">OPRAVILO</span>
                        </Space>
                    </a>
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
                    <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => history.push('/home')}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}  onClick={() => history.push('/settings')}>
                        Settings
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="inner-user-layout">
                <Header>
                    <div className="header-menu">
                        <UserDropdownContainer />
                    </div>
                </Header>
                <Content className="content-body">
                    {props.children}
                </Content>
                <CustomFooter />
            </Layout>
        </Layout>)
}