import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import PrivateRoute from './auth/PrivateRoute';
import Admin from './core/Admin';
import AdminRoute from './auth/AdminRoute';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';
import pageNotFound from './core/PageNotFound';
import Todos from './todos/Todos';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} /> 
                <Route path="/signin" exact component={Signin} /> 
                <Route path="/auth/activate/:token" exact component={Activate} /> 
                <PrivateRoute path="/private" component={Private} />
                <AdminRoute path="/admin" exact component={Admin} /> 
                <Route path="/auth/password/forgot" exact component={Forgot} /> 
                <Route path="/auth/password/reset/:token" exact component={Reset} /> 
                <PrivateRoute path="/todos" component={Todos} />
                <Route path="*" component={pageNotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;