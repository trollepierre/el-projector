import React from 'react';
import ReactDOM from 'react-dom';
import ProjectHeader from './ProjectHeader';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
