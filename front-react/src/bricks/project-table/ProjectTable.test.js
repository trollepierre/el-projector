import React from 'react';
import ReactDOM from 'react-dom';
import ProjectTable from './ProjectTable';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
