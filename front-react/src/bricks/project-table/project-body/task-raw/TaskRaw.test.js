import React from 'react';
import ReactDOM from 'react-dom';
import TaskRaw from './TaskRaw';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TaskRaw />, div);
  ReactDOM.unmountComponentAtNode(div);
});
