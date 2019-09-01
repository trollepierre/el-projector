import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './AppContext';

import LoginPage from '../pages/LoginPage';
import { Header } from '../bricks';
import ProjectPage from '../pages/ProjectPage/ProjectPage';

const AppContainer = () => {
  const { isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return (<LoginPage/>);
  }

  return (
    <div className="App">
      <Header/>
      <ProjectPage/>
    </div>
  );
};

const AppModule = () => {
  return (
    <AppProvider>
      <AppContainer/>
    </AppProvider>
  );
};

export default AppModule;
