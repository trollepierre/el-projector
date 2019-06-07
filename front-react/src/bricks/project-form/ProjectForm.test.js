import React from 'react';
import ReactDOM from 'react-dom';
import ProjectForm from './ProjectForm';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
