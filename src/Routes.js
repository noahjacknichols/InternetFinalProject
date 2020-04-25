
import React, { Component, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import App from "./App";
// import signIn from "./signIn";
const App = lazy(() => import('./App'));
const signIn = lazy(() => import('./signIn'));

export default class Routes extends Component {
    
    render () {
        return(
            <Router>
                <Switch>
                <Route path="/" exact component = {App} />
                <Route path="/signIn" component = {signIn}/>
                </Switch>
            </Router>
        )
    
    }   
}

