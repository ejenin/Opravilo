import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {AnonymousRouteProps} from './types'
import AuthManager from '../../auth/AuthManager'

export const AnonymousRoute = (props: AnonymousRouteProps): JSX.Element => {
  const authenticated = AuthManager.authenticated()
  
  if (authenticated) {
      return <Redirect to={props.redirectPath} />
  }
  
  return <Route {...props} />
}