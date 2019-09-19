import React from 'react';
import { AppProvider, useAppContext } from './AppContext';

import { LoginPage, ProjectPage } from '../pages';
import { Header } from '../bricks';

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
