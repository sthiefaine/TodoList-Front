import React from 'react';
function Tasks({
  setNewCheckBoxValue,
  deleteTask,
  todolistData,
}){
  const handelSetNewCheckBox = (event) => {
    console.log('handelSetNewCheckBox');
    setNewCheckBoxValue(event.target.id);
  };

  const tasksList = todolistData.map((task) => {
    const classTaskDone = task.done === true ? 'task task--done' : 'task';
    // const checkboxDone = task.done === true ? 'checked' : '';

    return (
      <React.Fragment
        key={task.id}
      >
        <li
          className={classTaskDone}
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
              onClick={() => deleteTask(task.id)}
            >
              DEL
            </button>

          </div>

        </li>
      </React.Fragment>

    );
  });

  return (

    <ul>
      {tasksList}
    </ul>

  );
};


export default Tasks;
