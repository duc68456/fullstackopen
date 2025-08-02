import { useState } from 'react'

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(min + Math.random() * (max - min + 1));
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const n = anecdotes.length - 1

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(n + 1).fill(0))

  const handleClick = () => {
    const r = getRandomInt(0, n)
    setSelected(r)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected]++
    setVotes(copy)
  }

  console.log(votes)

  const maxVotes = Math.max(...votes)
  const maxIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>{`has ${votes[selected]} votes`}</div>
      <div>
        <button onClick = {handleVote}>vote</button>
        <button onClick = {handleClick}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxIndex]}
      <div>{`has ${maxVotes} votes`}</div>
    </div>
  )
}

export default App