import React from 'react';
import Button from '../../../../components/button/Button';
// eslint-disable-next-line no-unused-vars
import { eliminate, differ, remove } from '../../services/task-edit';
// eslint-disable-next-line no-unused-vars
import styles from './TaskRaw.css'

 const TaskRaw = ({ task }) => (
   <tr className="task-raw">
     <td className="id">
       {task.id}
     </td>
     <td className="name">
       {task.name}
     </td>
     <td className="description">
       {task.description}
     </td>
     <td className="points">
       {task.points}
     </td>
     <td className="optimal-date">
       {task.optimalDate}
     </td>
     <td className="priority">
       {task.priority}
     </td>
     <td className="benefit">
       {task.benefit}
     </td>
     <td className="needed-time">
       {task.neededTime}
     </td>
     {/*<td className="epic-id">*/}
     {/*  {task.epicId}*/}
     {/*</td>*/}
     {/*<td className="needed-material">*/}
     {/*  {task.neededMaterial}*/}
     {/*</td>*/}
     {/*<td className="sub-task-ids">*/}
     {/*  {task.subTaskIds.map(id => (<p key={id}>{id}</p>))}*/}
     {/*</td>*/}
     {/*<td className="master-task-id">*/}
     {/*  {task.masterTaskId}*/}
     {/*</td>*/}
     <td>
       <label htmlFor='done'>Done</label>
       <input type='checkbox' id='done'></input>
     </td>
     <td className="impact">
       <Button
         background-color="orange"
         color="white"
         text="later"
         onClick={differ}
       />
     </td>
     {/*<td>*/}
     {/*  <Button*/}
     {/*    background-color="red"*/}
     {/*    color="white"*/}
     {/*    text="not doing"*/}
     {/*    onClick={eliminate}*/}
     {/*  />*/}
     {/*</td>*/}
     {/*<td>*/}
     {/*  <Button*/}
     {/*    background-color="red"*/}
     {/*    color="white"*/}
     {/*    text="delete"*/}
     {/*    onClick={remove}*/}
     {/*  />*/}
     {/*</td>*/}
   </tr>
 );

export default TaskRaw;
