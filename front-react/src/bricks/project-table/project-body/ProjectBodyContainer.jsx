import React, { useReducer } from 'react';
import ProjectBodyModule from './ProjectBodyModule';
import { actions, initialState, reducer, tasksSelector } from './store';

const ProjectBodyContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchTasks = loginSilently => actions.fetchTasks(loginSilently)(dispatch);

  return <ProjectBodyModule tasks={tasksSelector(state)} fetchTasks={fetchTasks} />;
};

export default ProjectBodyContainer;