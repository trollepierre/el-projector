import React from 'react';
import ReactDOM from 'react-dom';
import ProjectPage from './ProjectPage';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
