import React, { useEffect, useReducer } from 'react';
import ProjectBodyModule from './ProjectBodyModule';
import { actions, initialState, reducer, tasksSelector } from './store';
import { useAppContext } from '../../../app/AppContext';

const ProjectBodyContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loginSilently } = useAppContext()

  useEffect(() => {
    actions.fetchTasks(loginSilently)(dispatch)
  }, [loginSilently]);

  return <ProjectBodyModule tasks={tasksSelector(state)} />;
};

export default ProjectBodyContainer;
