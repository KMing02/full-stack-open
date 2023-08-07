import { useState } from 'react'

const Anecdote = (props) => (
  <div>
    <p>{props.anecdote}</p>
    <p>has {props.votesCount} votes</p>
  </div>
  )

const Header = ({name}) => (
  <h2>
    {name}
  </h2>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Winner = ({anecdotes, points}) => {
  const highestVoteCount = Math.max(...points)
  const highestVoteIndex = points.indexOf(highestVoteCount)
  const highestVoteAnecdote = anecdotes[highestVoteIndex]
  if (highestVoteCount === 0) {
    return (
      <p>No votes yet</p>
    )
  }
  console.log(highestVoteIndex)
  return (
    <div>
      <p>winner {highestVoteAnecdote}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(arrayIndex)
  }

  console.log(points)

  return (
    <div>
      <Header name = 'Anecdote of the day'></Header>
      <Anecdote anecdote = {anecdotes[selected]} votesCount = {points[selected]}/>
      <Button handleClick = {handleVoteClick} text = 'vote'/>
      <Button handleClick = {handleAnecdoteClick} text = 'next anecdote'/>
      <Header name = 'Anecdote with most votes'></Header>
      <Winner anecdotes = {anecdotes} points = {points}></Winner>
    </div>
  )
}

export default App