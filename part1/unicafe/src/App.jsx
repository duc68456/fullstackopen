import { useState } from 'react'

const Button = (props) => <button onClick  = {props.onClick}>{props.text}</button>

const StatisticLine = (props) => {
  return (
  <>
    <td>{props.text}</td>
    <td>{props.number}</td>
  </>
  )
}

const Statistics = (props) => {
  return (
  <table>
    <tbody>
      <tr><StatisticLine text = "good" number = {props.good} /></tr>
      <tr><StatisticLine text = "neutral" number = {props.neutral} /></tr>
      <tr><StatisticLine text = "bad" number = {props.bad} /></tr>

      <tr><StatisticLine text = "all" number = {props.total} /></tr>
      <tr><StatisticLine text = "average" number = {props.average} /></tr>
      <tr><StatisticLine text = "positive" number = {`${props.positive} %`} /></tr>
    </tbody>
  </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  let total = good + neutral + bad
  let average = total === 0 ? 0 : (good - bad) / total
  let positive = total === 0 ? 0 : 100 * good / total
  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick = {handleClickGood} text = "good"/>
      <Button onClick = {handleClickNeutral} text = "neutral"/>
      <Button onClick = {handleClickBad} text = "bad"/>

      <h1>Statistics</h1>

      <Statistics good = {good} neutral = {neutral} bad = {bad} total = {total} average = {average} positive = {positive}/>
    </div>
  )
}

export default App