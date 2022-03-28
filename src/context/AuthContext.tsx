import React, { createContext, useCallback, useState } from 'react'; 
import api from '../services/apiClient';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData{
    name: string;
    signIn(credentials: SignInCredentials): Promise<void> //quando transformamos o metodo em async, ele retorna um Promise<void>
};


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if(token && user){
            return {token, user: JSON.parse(user)} 
        }

        return {} as AuthState;
    });

    const signIn = useCallback( async ({ email, password }) => {
        const response = await api.post('sessions', {
            email, 
            password
        })

        const { token, user } = response.data; 

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({token, user});
    }, []);

    //children => tudo que este componente receber como filho, vamos repassar depois pra algum lugar dentro do componente
    return(
        <AuthContext.Provider value={{name: 'Everton', signIn}}>
            {/* passamos o children pra que todos os filhos do AuthProvider sejam repassados como filhos do AuthContext.Provider */}
            {children}
        </AuthContext.Provider>
    )
}



