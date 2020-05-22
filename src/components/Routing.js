import React from 'react'
import { Route, Switch } from "react-router-dom";
import LoginPage from '../pages/login/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddEmployees from '../pages/AddEmployees/AddEmployees';

export default function Routing() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/addemployee" exact  component={AddEmployees} />
                <Route path="/dashboard" exact component={Dashboard} />

                </Switch>
        </div>
    )
}
