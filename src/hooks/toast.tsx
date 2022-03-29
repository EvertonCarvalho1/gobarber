import React, { createContext, useContext, useCallback } from 'react'; 

interface ToastContextData {
    addToast(): void; 
    removeToast(): void;
}

//criando contexto
const ToastContext = createContext<ToastContextData>({} as ToastContextData);

//criando provider
const ToastProvider: React.FC = ({children}) => {
    const addToast = useCallback(() => {
        console.log('add toast')
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