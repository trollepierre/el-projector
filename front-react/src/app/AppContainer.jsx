import React from 'react';
import { AppProvider, useAppContext } from './AppContext';

import LoginPage from '../pages/LoginPage';
import { Header } from '../bricks';
import ProjectPage from '../pages/ProjectPage/ProjectPage';

export const AppModule = () => {
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

const AppContainer = () => (
  <AppProvider>
    <AppModule/>
  </AppProvider>
);

export default AppContainer;
