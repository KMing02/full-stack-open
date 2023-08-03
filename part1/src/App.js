import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>no feedback given</div>
    )
  } else {
    return (
      <div>
    <div style={{fontSize: 30}}>Statistics</div>
    <div>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.good + props.neutral + props.bad}</div>
      <div>positive {props.good / (props.good + props.neutral + props.bad)}</div>
    </div>
  </div>
    )
  }

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div style={{fontSize: 30}}>give feedback</div>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/> 
    </div>
  )
}

export default App