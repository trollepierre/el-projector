import React from 'react';
import { Provider } from 'react-redux';
import ProjectPage from '../pages/project-page/ProjectPage';
import { default as createStore } from '../store/createStore';
import { default as reducer } from '../bricks/project-table/project-body/store';

const store = createStore(reducer)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ProjectPage/>
      </Provider>
    </div>
  );
}

export default App;
