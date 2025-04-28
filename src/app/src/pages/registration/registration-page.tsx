import React from 'react'
import {Card, Col, Row} from 'antd'
import { Link } from 'react-router-dom'
import { RegistrationFormContainer } from '../../containers'

const layout = {
    lg: {
        span: 6,
        offset: 9
    },
    md: {
        span: 8,
        offset: 8
    },
    sm: {
        span: 24,
    },
    xs: {
        span: 24
    }
}

export const RegistrationPage = (): JSX.Element => (
    <Row>
        <Col {...layout}>
            <Card title="Sign up" extra={<Link to="/">Back</Link>}>
                <RegistrationFormContainer />
            </Card>
        </Col>
    </Row>
)