import React from 'react';
import ReactDOM from 'react-dom';
import ProjectBody from './ProjectBody';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectBody />, div);
  ReactDOM.unmountComponentAtNode(div);
});
