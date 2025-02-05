import React from 'react'
import {Button, Empty} from 'antd'
import {IEmptyProjectsListProps} from './types'

export const EmptyProjectsList = ({onCreateNewClick}: IEmptyProjectsListProps): JSX.Element => {
    return <Empty
        description={
            <span>
        No projects found
      </span>
        }
    >
        <Button type="primary" onClick={onCreateNewClick}>Create Now</Button>
    </Empty>
}