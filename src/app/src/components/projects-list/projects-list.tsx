import React from 'react'
import {IProjectsListProps} from './types'
import {Avatar, List, Modal, Typography} from 'antd'
import {Link} from 'react-router-dom'
import {DeleteOutlined} from '@ant-design/icons'

import './projects-list.scss'

const { Title } = Typography

export const ProjectsList = (props: IProjectsListProps): JSX.Element => {
    const {editProject, removeProject} = props
    
    const onRemoveClick = (projectId: number) => {
        Modal.confirm({
            title: 'Remove project',
            content: 'Are you sure you want to remove this project?',
            icon: <DeleteOutlined color='red'/>,
            onOk: () => removeProject(projectId)
        })
    }

    return <div className="projects-list">
        <Title level={4}>Projects list</Title>
        <List
            itemLayout="horizontal"
            dataSource={props.projects}
            bordered
            renderItem={item => (
                <List.Item
                    actions={[
                        <a onClick={() => onRemoveClick(item.id)} className="danger-link">remove</a>,
                        <a onClick={() => editProject(item.id)}>edit</a>,
                        <Link to={'/project/'+item.id}>view</Link>,
                    ]}>
                    <List.Item.Meta
                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
                        title={item.name}
                        description={item.description}/>
                </List.Item>
            )}
        />
    </div>
}