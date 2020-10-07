
import Form from '../containers/Form';
import Title from '../containers/Title';
import Tasks from '../containers/Tasks';

function Home() {
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
