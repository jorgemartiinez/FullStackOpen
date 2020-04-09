import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const App = ({ anecdotes }) => {
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const [largestNumber, setLargest] = useState(null); // initialized to null to don't show any anecdote the first time

  const nextHandler = () => {
    const randomNumber = Math.floor((Math.random() * anecdotes.length));
    setSelected(randomNumber);
  };

  const voteHandler = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    let maxNumIndex = copy.indexOf(Math.max(...copy));
    setLargest(maxNumIndex);
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <Button handler={voteHandler} name="vote" />
      <Button handler={nextHandler} name="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {
        (largestNumber == null) ?
        <p>We still don't have any votes!</p> :
        <p>{anecdotes[largestNumber]}</p>
      }
    </div>
  )
}

const Button = ({ handler, name }) => (
  <button onClick={handler}>{name}</button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)