import React from 'react'
import { Col, Row, Card } from 'antd'
import { Link } from 'react-router-dom'
import { LoginFormContainer } from '../../containers'

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

export const LoginPage = (): JSX.Element => (
    <Row>
        <Col {...layout}>
            <Card title="Sign in" extra={<Link to="/registration">New user?</Link>}>
                <LoginFormContainer />
            </Card>
        </Col>
    </Row>
)