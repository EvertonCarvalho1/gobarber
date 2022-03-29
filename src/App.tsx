import React from 'react';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AppProvider from './hooks';

import GlobalStyle from './styles/global';

//foi criado o componente AppProvider, para englobar todos os contextos (auth e toast), assim deixando o App.tsx mais limpo
//O AppProvider vai em volta das paginas criadas, assim provendo informações de autenticação e de toast 



const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </>
  )
};

export default App;
