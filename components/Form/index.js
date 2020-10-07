import { useState } from 'react'

function Form({
  saveNewTask,
}){

  const [newTaskValue, setNewTaskValue] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if(newTaskValue.length > 1){
      console.log('handleOnSubmit');
      console.log(event.target);
      saveNewTask(newTaskValue);
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
