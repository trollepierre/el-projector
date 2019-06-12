/* istanbul ignore next */
import { fetchTasks, tasksSelector } from './store';
import { connect } from 'react-redux';
import { ProjectBodyModule } from './ProjectBodyModule';

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
)(ProjectBodyModule)
;

