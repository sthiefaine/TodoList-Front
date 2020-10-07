function Title({
  counterValue,
}){
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
