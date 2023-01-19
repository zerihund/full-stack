import { useState } from "react";

const App = () => {
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

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  const [votes, setVotes] = useState({
    maxAnecdoteIndex: 0,
    maxVote: 0,
  });
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const makeVote = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  };
  for(let i = 0; i < points.length; i++) {
    if(votes.maxVote < points[i]) {
      const newVotes = {
        ...votes,
        maxAnecdoteIndex: i,
        maxVote: points[i]
      }
      setVotes(newVotes)
    } 
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p> has {points[selected]} votes</p>
      <div>
        <button onClick={makeVote}>Vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[votes.maxAnecdoteIndex]}</p>
      <p>has {votes.maxVote} votes</p>
    </div>
  );
};

export default App;
