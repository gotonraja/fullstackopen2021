import React, { useState } from 'react'

const Statistic = (props) => {
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Total = (props) => {
  return (
    <tr>
      <td>All</td>
      <td>{props.values[0] + props.values[1] + props.values[2]}</td>
    </tr>
  )
} 

const Average = (props) => {
  const total = props.values[0] + props.values[1] + props.values[2]
  const average = (props.values[0]*1 + props.values[1]*0 + props.values[2]*-1)/total
  
  return (
    <tr>
      <td>Average</td>
      <td>{average}</td>
    </tr>
   )
}
const Positive = (props) => {
  const total = props.values[0] + props.values[1] + props.values[2]
  const positive = (props.values[0]/total)
  
  return (
    <tr>
      <td>Positive</td>
      <td>{positive}</td>
    </tr>
  )
}

const Statistics = (props) => 
{
  if (props.values[0] === 0 && props.values[1] === 0 && props.values[2] === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <table>
        <Statistic text="Good" value={props.values[0]}></Statistic>
        <Statistic text="Neutral" value={props.values[1]}></Statistic>
        <Statistic text="Bad" value={props.values[2]}></Statistic>
        <Total values={props.values}></Total>
        <Average values={props.values}></Average>
        <Positive values={props.values}></Positive>
        </table>
      </div>
    )
  }
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const values = [good, neutral, bad]

  return (
    <div>
      <h1> Give Feedback </h1>
      <Button 
        handleClick={increaseGood} 
        text='Good'>
      </Button>
      <Button 
        handleClick={increaseNeutral} 
        text='Neutral'>
      </Button>
      <Button 
        handleClick={increaseBad} 
        text='Bad'>
      </Button>
      <h1> Statistics </h1>
      <Statistics values={values}></Statistics>
    </div>
  )
}

export default App