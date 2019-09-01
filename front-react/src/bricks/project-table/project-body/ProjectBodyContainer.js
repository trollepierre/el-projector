import React, { useReducer } from 'react';
import ProjectBodyModule from './ProjectBodyModule';
import { actions, initialState, reducer, tasksSelector } from './store';

const BasketContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchTasks = () => actions.fetchTasks()(dispatch);

  return <ProjectBodyModule count={tasksSelector(state)} fetchTasks={fetchTasks} />;
};

export default BasketContainer;
