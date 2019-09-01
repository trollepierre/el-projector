import React from 'react';
import { Provider } from 'react-redux';
import ProjectPage from '../pages/ProjectPage/ProjectPage';
import { default as createStore } from '../store/createStore';
import { default as reducer } from '../bricks/project-table/project-body/store';
import LoginPage from '../pages/LoginPage';
import { auth } from '../services';

const store = createStore(reducer)

const App = () => {
  if(!auth.isAuthenticated()) return (<LoginPage/>)

  return (
    <div className="App">
      <Provider store={store}>
        <ProjectPage/>
      </Provider>
    </div>
  );
};

export default App;
