import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signup from '../ui/Signup';
import Links from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
    if(Meteor.userId()){
        history.replace('/links')
    }
}
const onEnterPrivatePage = () => {
    if(!Meteor.userId()){
        history.replace('/')
    }
}

export const onAuthChange = (isAuthenticated) => {
    const pathname = window.location.pathname;
    const isUnAuthenticatedPages = unauthenticatedPages.includes(pathname)
    const isAuthenticatedPages = authenticatedPages.includes(pathname)
    
        if(isAuthenticated && isUnAuthenticatedPages ){
            history.replace('/links')
        } else if (isAuthenticatedPages && !isAuthenticated) {
            history.replace('/')
        } 
}

export const routes = (
    <Router history={history}>
        <Switch>
            <Route path="/signup" onEnter={onEnterPublicPage}><Signup /></Route>
            <Route path="/links" component={Links} onEnter={onEnterPublicPage} />
            <Route path="/" exact component={Login} onEnter={onEnterPrivatePage} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)