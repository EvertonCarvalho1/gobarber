import React from 'react';
import AppProvider from './hooks';
import { BrowserRouter } from 'react-router-dom';//importante para agrupar as rotas 
import Routes from './routes';

import GlobalStyle from './styles/global';

//foi criado o componente AppProvider, para englobar todos os contextos (auth e toast), assim deixando o App.tsx mais limpo
//O AppProvider vai em volta das paginas criadas, assim provendo informações de autenticação e de toast 

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      
      <GlobalStyle />
    </BrowserRouter>
  )
};

export default App;
