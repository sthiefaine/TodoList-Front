import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

/* === import Actions === */
import {
  setNewCheckBoxValue,
  deleteTask,
} from '../../redux/reducers/task';

function Tasks(){

  const dispatch = useDispatch()
  const tasks = useSelector(state => state.task);

  const handelSetNewCheckBox = (event) => {
    console.log('handelSetNewCheckBox');
    dispatch(setNewCheckBoxValue(event.target.id));
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
              onChange={handelSetNewCheckBox}
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
              onClick={() => dispatch(deleteTask(task.id))}
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
