import * as React from "react";
import {FC} from "react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import AuthManager from "../../auth/AuthManager";


export const PrivateRoute: FC<RouteProps> = (props: RouteProps) => {
    const authenticated = AuthManager.authenticated();
    
    if (authenticated) {
        return <Route {...props}/>;
    }
    
    return <Redirect to="/"/>
};