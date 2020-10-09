import { useSelector } from 'react-redux'

import {
  tasksSelector,
} from '../../redux/slices/tasks';

function Title(){

  const tasks = useSelector(tasksSelector);
  const getTasksUnchecked = tasks.tasksData.filter(item => item.done === false);
  var counterValue = getTasksUnchecked.length

  let text = 'Aucune tâche en cours';

  if (counterValue === 1) {
    text = `${counterValue} tâche en cours`;
  }
  else if (counterValue > 1) {
    text = `${counterValue} tâches en cours`;
  }

  return (

    <h1
      className="counter"
    >
      {text}
    </h1>

  );
};

export default Title;
