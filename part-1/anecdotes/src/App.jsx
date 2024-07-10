import { useState } from "react";

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>{votes}</p>
    </>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

function App() {
  const [selected, setSelected] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  };

  const randomSelect = () => setSelected(Math.floor(Math.random() * anecdotes.length));

  const anecdoteMostVote = points.indexOf(Math.max(...points));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />

      <Button handleClick={randomSelect} text="Next Anecdote" />
      <Button handleClick={handleVote} text="vote" />

      <h2>Anecdote with most votes</h2>
      <Anecdote
        anecdote={anecdotes[anecdoteMostVote]}
        votes={points[anecdoteMostVote]}
      />
    </>
  );
}

export default App;
