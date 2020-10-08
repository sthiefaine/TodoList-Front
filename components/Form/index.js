import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

/* === import Actions === */
import {
  saveNewTask,
} from '../../redux/reducers/task';

function Form(){
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.task);

  const [newTaskValue, setNewTaskValue] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if(newTaskValue.trim().length > 1){
      console.log('handleOnSubmit');
      console.log(newTaskValue);
      dispatch(saveNewTask(newTaskValue.trim()));
      setNewTaskValue('');
    }
  };



  const handleOnChange = (event) => {
    setNewTaskValue(event.target.value);
  };

  return (

    <form
      className="form"
      onSubmit={handleOnSubmit}
    >
      <input
        type="text"
        className="form__input"
        placeholder="Nouvelle tâche"
        value={newTaskValue}
        onChange={handleOnChange}
      />
    </form>

  );
};

export default Form;
