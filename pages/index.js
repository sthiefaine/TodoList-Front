import { useEffect } from 'react';
import { useDispatch} from 'react-redux';

import Form from '../components/Form';
import Title from '../components/Title';
import Tasks from '../components/Tasks';


/* === import Actions === */
import { loadTasks } from '../redux/slices/tasks'


function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  return (
    <>
      <header>
        <Form />
      </header>
       <main>
        <Title />

        <Tasks />
      </main> 
    </>
  )
}

export default Home;
