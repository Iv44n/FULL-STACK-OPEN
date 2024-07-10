import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const average = (good - bad) / (good + neutral + bad) || 0;
  const positive = (good / (good + neutral + bad)) * 100 || 0;

  if (good + neutral + bad === 0) return <p>No feedback given</p>

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good + neutral + bad}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App