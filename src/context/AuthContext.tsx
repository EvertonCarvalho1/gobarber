import React, { createContext, useCallback } from 'react'; 

interface AuthContextData{
    name: string;
    signIn(): void; //nada
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const signIn = useCallback(() => {
        console.log('login')
    }, []);

    //children => tudo que este componente receber como filho, vamos repassar depois pra algum lugar dentro do componente
    return(
        <AuthContext.Provider value={{name: 'Everton', signIn}}>
            {/* passamos o children pra que todos os filhos do AuthProvider sejam repassados como filhos do AuthContext.Provider */}
            {children}
        </AuthContext.Provider>
    )
}



