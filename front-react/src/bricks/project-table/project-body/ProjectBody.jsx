import React, { Component } from 'react';
import { TaskRaw } from './task-raw/TaskRaw';
import { connect } from 'react-redux';
import { fetchTasks, tasksSelector } from './store';
import PropTypes from 'prop-types';

export class ProjectBody extends Component {
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
    console.log(this.props);
    console.log(this.props.fetchTasks);

    this.props.fetchTasks();
  }

  render() {
    if (this.props.isLoading) return (<tbody>loading</tbody>)
    if (this.props.error) return <tbody>An error has occured</tbody>;
    if(!this.props.tasks) return (<tbody>oops not possible?</tbody>)

    return (
      <tbody className="project-body">
        {this.props.tasks.map(task => {
          return (
            <TaskRaw task={task} key={task.id}/>
          );
        })}
      </tbody>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return tasksSelector(state);
};

const mapDispatchToProps = {
  fetchTasks,
};

/* istanbul ignore next */
export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectBody)
;
