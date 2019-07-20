import React from 'react';
import Button from '../../../components/button/Button';
import {
  sortByBirthday,
  sortByFirstName,
  sortByLastDate,
  sortByLastName,
  sortByNext,
  sortByOrigin,
  sortByPoints,
} from '../services/tasks-sorter';
// eslint-disable-next-line no-unused-vars
import styles from './ProjectHeader.css';

const ProjectHeader = () => (
  <thead className="project-header">
  <tr>
    <th className="id">
      <Button
        background-color="cyan"
        color="black'"
        text="id"
        onClick={sortByNext}
      />
    </th>
    <th className="name">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="Name"
        onClick={sortByFirstName}
      />
    </th>
    <th className="description">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="description"
        onClick={sortByLastName}
      />
    </th>
    <th className="points">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="Points"
        onClick={sortByPoints}
      />
    </th>
    <th className="created-date">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="created Date"
        onClick={sortByPoints}
      />
    </th>
    <th className="last-date">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="LastDate"
        onClick={sortByLastDate}
      />
    </th>
    <th className="impact">
      Impact
    </th>
    <th className="birth-date">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="BirthDate"
        onClick={sortByBirthday}
      />
    </th>
    <th className="origin">
      <Button
        background-color="'cyan'"
        color="'black'"
        text="Origin"
        onClick={sortByOrigin}
      />
    </th>
    <th className="action">
      Action
    </th>
  </tr>
  </thead>
);

export default ProjectHeader;
