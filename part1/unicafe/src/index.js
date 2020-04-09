import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (name) => {
    if (name === 'good') {
      return () => setGood(good + 1);
    } else if (name === 'neutral') {
      return () => setNeutral(neutral + 1);
    }
    return () => setBad(bad + 1);
  };


  return (
    <div>
      <Title title="give feedback" />
      <Button name="good" handleClick={handleClick} />
      <Button name="neutral" handleClick={handleClick} />
      <Button name="bad" handleClick={handleClick} />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );

}


const Title = ({ title }) => (
  <h1>{title}</h1>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = good + neutral + bad / 3;
  const positive = (good) * 100 / (good + neutral + bad) || 0;

  if (all === 0) {
    return (
      <p>No feedback given</p>
    );
  } else {
    return (
      <table>
        <tbody>
          <Statistic name="good" value={good} />
          <Statistic name="neutral" value={neutral} />
          <Statistic name="bad" value={bad} />
          <Statistic name="all" value={all} />
          <Statistic name="average" value={average} />
          <Statistic name="positive" value={positive + '%'} />
        </tbody>
      </table>
    );
  }
}

const Statistic = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
}

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick(name)}>{name}</button>
)


ReactDOM.render(<App />,
  document.getElementById('root')
)