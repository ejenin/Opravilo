import {IUserDropdownProps} from './types'
import {Avatar, Dropdown, Menu, Space, Spin} from 'antd'
import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

import './user-dropdown.scss'

export const UserDropdown = (props: IUserDropdownProps): JSX.Element => {
    const history = useHistory()
    const {displayName, fetchDisplayName, fetchingDisplayName} = props
    
    useEffect(() => {
        if (!displayName) {
            fetchDisplayName()
        }  
    }, [])
    
    const logout = async () => {
        props.onLogout()
        history.push('/')
    }
    
    const menu = <Menu>
            <Menu.Item onClick={logout} danger key="1">Logout</Menu.Item>
    </Menu>
    
    const letter = displayName ? displayName[0] : undefined
    
    return (
        <Spin spinning={fetchingDisplayName}>
            <div className="user-dropdown">
                <Dropdown overlay={menu}>
                    <Space align="center">
                        <Avatar>{letter}</Avatar>
                        <span>{displayName}</span>
                    </Space>
                </Dropdown>
            </div>
        </Spin>)
}