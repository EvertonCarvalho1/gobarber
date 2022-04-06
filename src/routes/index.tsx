import React from "react";
import { Switch } from 'react-router-dom';
//Switch => garante que apenas uma rota seja mostrada
//Route => é cada rota da aplicação

import Route from "./Route";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";


const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={SignIn} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/dashboard' component={Dashboard} isPrivate/>
            <Route path='/forgotpassword' component={ForgotPassword}/>
        </Switch>
    )
};

export default Routes;

