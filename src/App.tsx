import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ToastContainer from './components/ToastContainer';
import GlobalStyle from './styles/global';

import { AuthProvider } from '../src/hooks/auth';
import { ToastProvider } from '../src/hooks/toast';
//AuthContext.Provider é um componente que colocamos por volta dos componentes que queremos que tenham o contexto de autenticação.

// Todos os componentes dentro do contexto, terão acessos as informações do contexto, até aqueles componentes dentro dos componentes.

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <ToastContainer/>

      <GlobalStyle />
    </>
  )
};

export default App;
