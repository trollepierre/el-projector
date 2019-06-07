import React from 'react';
import ProjectForm from '../../bricks/project-form/ProjectForm'
import ProjectTable from '../../bricks/project-table/ProjectTable'

function ProjectPage() {
  return (
    <div className="page">
      <ProjectForm/>
      <ProjectTable/>
    </div>
  );
}

export default ProjectPage;
