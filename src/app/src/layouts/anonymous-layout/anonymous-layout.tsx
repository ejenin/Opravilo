import {Layout} from 'antd'
import React from 'react'
import Logo from '../../assets/logo.svg'
import {CustomFooter} from '../../components/custom-footer'
import {ILayoutProps} from '../types'

import './anonymous-layout.scss'

const { Header, Content } = Layout

export const AnonymousLayout = (props: ILayoutProps): JSX.Element => (
    <Layout className="anonymous-layout">
        <Header>
            <a href="/home">
                <img src={Logo} alt="Logo" className="header-logo"/>
                <span className="header-text">OPRAVILO</span>
            </a>
        </Header>
        <Content className="content-body">
            {props.children}
        </Content>
        <CustomFooter />
    </Layout>
)