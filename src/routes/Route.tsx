import React from "react";
import { RouteProps as ReactDOMRouterProps, Route as ReactDOMRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouterProps{
    isPrivate?: boolean; 
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({isPrivate = false, component: Component ,...rest}) => {
    //...rest = o spread operator está trazendo todas propriedades do Route, para o novo componente criado e estamos chamando essas props de rest.

    const { user } = useAuth();    

    return(
        <ReactDOMRoute {...rest} render={({location}) => {
            return isPrivate === !!user ? ( <Component/>) : (<Redirect to={{pathname: isPrivate ? '/' : '/dashboard', state: {from: location}}}/> )
        }}/> 
    )
}

export default Route;

//REGRAS
// => se a rota for privada e o usuário não está autenticado, mandamos ele para a tela de login
// => se a rota não for privada e o usuário está autenticado, mandamos ele para tela de Dashboard

//rota autenticada/ usuário autenticado
//true/true = ok
// true/false = redirect to login
//false/true = redirect to dashboard
//false/false = ok


