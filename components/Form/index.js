import { useState } from 'react'
import { useDispatch } from 'react-redux'

/* === import Actions === */
import {
  createTask,
} from '../../redux/slices/tasks';

function Form(){
  const dispatch = useDispatch()

  const [newTaskValue, setNewTaskValue] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if(newTaskValue.trim().length > 1){
      console.log('handleOnSubmit');
      dispatch(createTask(newTaskValue.trim()));
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
