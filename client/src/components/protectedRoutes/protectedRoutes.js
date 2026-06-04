import React from 'react'
import { Route, Redirect } from 'react-router-dom'

//Only renders the component if a login token is present, otherwise redirects to /login
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token')
    return(
        <Route {...rest} render={
            props => isAuthenticated
                ? <Component {...rest} {...props} />
                : <Redirect to="/login" />
        } />
    )
}

export default ProtectedRoute
