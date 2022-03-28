import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';
//AuthContext.Provider é um componente que colocamos por volta dos componentes que queremos que tenham o contexto de autenticação.

// Todos os componentes dentro do contexto, terão acessos as informações do contexto, até aqueles componentes dentro dos componentes.

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
};

export default App;
