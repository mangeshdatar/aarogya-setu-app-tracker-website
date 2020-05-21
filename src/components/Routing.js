import React from 'react'
import { Route, Switch } from "react-router-dom";
import LoginPage from '../pages/login/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';

export default function Routing() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/dashboard" exact component={Dashboard} />
                </Switch>
        </div>
    )
}
