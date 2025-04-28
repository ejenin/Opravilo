import React from 'react'
import {Layout} from 'antd'
import {GithubLogo} from '../github-logo'
import './custom-footer.scss'

const { Footer } = Layout

export const CustomFooter = (): JSX.Element => (
    <Footer className="custom-footer">
        <div className="transparent-icon">
            <GithubLogo prompt="Project repository" url="https://github.com/ejenin/Opravilo" />
        </div>
    </Footer>
)