import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import AuthManager from '../../auth/AuthManager'

export const PrivateRoute = (props: RouteProps): JSX.Element => {
    const authenticated = AuthManager.authenticated()
    
    if (authenticated) {
        return <Route {...props}/>
    }
    
    return <Redirect to="/"/>
}