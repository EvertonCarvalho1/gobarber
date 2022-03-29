import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/apiClient';

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>; //quando transformamos o metodo em async, ele retorna um Promise<void>
    signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, user: JSON.parse(user) }
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        })

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');

        setData({} as AuthState);
    }, [])

    //children => tudo que este componente receber como filho, vamos repassar depois pra algum lugar dentro do componente
    return (
        <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
            {/* passamos o children pra que todos os filhos do AuthProvider sejam repassados como filhos do AuthContext.Provider */}
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context
}

export { AuthProvider, useAuth };

//Para cada contexto teremos um Hook




