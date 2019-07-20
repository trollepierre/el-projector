import React from 'react';
import ProjectHeader from './project-header/ProjectHeader';
import { default as ProjectBody} from './project-body';
// eslint-disable-next-line no-unused-vars
import styles from './ProjectTable.css'

const ProjectTable = () => (
  <table className="project-table">
    <ProjectHeader/>
    <ProjectBody/>
  </table>
);

export default ProjectTable;
