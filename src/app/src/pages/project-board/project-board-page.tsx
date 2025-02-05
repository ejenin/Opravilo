import React, {useEffect} from 'react'
import {IProjectBoardPageProps} from './types'
import {Empty, Spin} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import {CreateStateFormContainer} from '../../containers/modal/create-state-form-container'
import {CardViewModal} from '../../components/card-view-modal'
import {ColumnStateViewContainer} from '../../containers/column-state-view-container'

import './project-board-page.scss'

export const ProjectBoardPage = withRouter((props: IProjectBoardPageProps): JSX.Element => {
    const {
        fetchingProject,
        currentProject,
        fetchProject,
        createEditStateVisible,
        cardViewModalVisible,
        onCloseCardViewModal,
        fetchingChangeState
    } = props
    const id = Number(props.match.params.id)

    useEffect(() => {
        fetchProject(id)
    }, [fetchProject])

    const toShow = currentProject
        ? (
            <>
                <Link to="/home">Back</Link>
                <Spin spinning={fetchingChangeState}><h1>{currentProject.name}</h1></Spin>
                <ColumnStateViewContainer />
            </>
        )
        : <Empty/>

    return <div className="project-board-page">
        <Spin spinning={fetchingProject}>{toShow}</Spin>
        {createEditStateVisible && <CreateStateFormContainer />}
        {cardViewModalVisible && <CardViewModal onClose={onCloseCardViewModal} />}
    </div>
})