import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import {
  tasksSelector,
  deleteTask,
  updateTask,
} from '../../redux/slices/tasks';

function Tasks(){

  const dispatch = useDispatch()
  const tasks = useSelector(tasksSelector);

  const handelSetNewCheckBox = (id, done) => {
    console.log('handelSetNewCheckBox');
    dispatch(updateTask(
      {id, 
        data: {
         done,
        }
      }
    ));
  };

  const tasksList = tasks.tasksData.map((task) => {
    const classTaskDone = task.done === true ? 'task task--done' : 'task';
    // const checkboxDone = task.done === true ? 'checked' : '';

    return (
        <li
          className={classTaskDone}
          key={task.id}
        >
          <div>
            <input
              id={task.id}
              className="task__input"
              type="checkbox"
              checked={task.done}
              onChange={() => handelSetNewCheckBox(task.id, !task.done)}
            />

            <label
              className="task__label"
              htmlFor={task.id}
            >
              {task.label}
            </label>
          </div>

          <div>
            <button 
              type="button"
              className="button__delete"
              onClick={() => dispatch(deleteTask({id: task.id}))}
            >
              DEL
            </button>

          </div>

        </li>
    );
  });

  return (

    <ul>
      {tasksList}
    </ul>

  );
};

export default Tasks;
