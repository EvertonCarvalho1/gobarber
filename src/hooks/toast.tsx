import React, { createContext, useContext, useCallback, useState } from 'react'; 
import { uuid } from 'uuidv4';

interface ToastContextData {
    addToast(message: Omit<ToastMessage, 'id'>): void; 
    removeToast(): void;
}

interface ToastMessage {
    id: string;
    type?: 'sucess' | 'error' | 'info';
    title: string;
    description?: string;
}

//criando contexto
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

//criando provider
const ToastProvider: React.FC = ({children}) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);
    

    const addToast = useCallback(({title, type, description}: Omit<ToastMessage, 'id'>) => {
        const id = uuid();//cria um id unico

        const toast = {
            id,
            type,
            title,
            description
        };
    
        //com spred operator, copio tudo que já tem no array de messages para respeitar o conceito de imutabilidade, depois eu jogo objeto toast dentro do array com setMesssages
        //setMessages([...messages, toast])
        
        setMessages(oldMessages => [...oldMessages, toast]);
        //essa é outra forma de fazer, onde recebemos o estado antigo de messages no parametro da função e pegamos tudo do estado anterior com spread, e em seguida adicionamos os novos dados
    }, []);


    const removeToast = useCallback(() => {
    }, []);


    return(
        <ToastContext.Provider value={{addToast, removeToast}}>
            {children}
        </ToastContext.Provider>
    )
}

//hook de toast error
function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context
}

export { ToastProvider, useToast };