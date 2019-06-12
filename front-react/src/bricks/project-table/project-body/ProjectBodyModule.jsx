import React, { Component } from 'react';
import { TaskRaw } from './task-raw/TaskRaw';
import PropTypes from 'prop-types';


export class ProjectBodyModule extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.object,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.Number,
        image_src: PropTypes.string,
        title: PropTypes.string,
        price_currency: PropTypes.string,
        price: PropTypes.string,
      })
    ),
    fetchTasks: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    return (
      <tbody className="project-body">
      {(this.props.isLoading) ? (<tr><td>loading</td></tr>):null}
      {(this.props.error) ? <tr><td>An error has occured</td></tr>:null}
      {(!this.props.data) ? (<tr><td>oops not possible?</td></tr>):

        this.props.data.map(task => {
          return (
            <TaskRaw task={task} key={task.id}/>
          );
        })}
      </tbody>
    );
  }
}

export default ProjectBodyModule;
