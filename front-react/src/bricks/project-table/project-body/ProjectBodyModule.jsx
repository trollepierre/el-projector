import React, { useEffect } from 'react';
import TaskRaw from './task-raw/TaskRaw';
import PropTypes from 'prop-types';

const MyModule = ({
    data,
    isLoading,
    error,
    fetchTasks,
  }) => {

  // useEffect( () => {fetchTasks()}, [fetchTasks]);
  //
  return (
  <tbody className="project-body">
    {(isLoading) ? (<tr><td>loading</td></tr>) : null}
    {error ? <tr><td>An error has occured</td></tr> : null}
    {(!data) ? (<tr><td>oops not possible?</td></tr>) :
      data.map(task => (<TaskRaw task={task} key={task.id}/>))}
    </tbody>
    );
 };

MyModule.displayName = 'MyModule';

MyModule.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      points: PropTypes.number,
      createdDate: PropTypes.string,
      endDate: PropTypes.string,
    })
  ),
  fetchTasks: PropTypes.func.isRequired,
};

MyModule.defaultProps = {
  isLoading: true,
  error: undefined,
  data: []
};

export default MyModule;
