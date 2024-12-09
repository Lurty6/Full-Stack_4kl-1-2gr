import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)
  const [percPositive, setPercPositive] = useState(0)
  
  const StatisticsLine = (props) =>{
    return(
      <p>{props.text}: {props.value}</p>
    )
  }

  const Statistics  = (props) => {
    if (good+bad+neutral != 0)
    return(
      <div>
        <h1>statistics</h1>
        <StatisticsLine text="Good" value={good}/>
        <StatisticsLine text="Neutral" value={neutral}/>
        <StatisticsLine text="Bad" value={bad}/>
        <StatisticsLine text="Total" value={total}/>
        <StatisticsLine text="Average" value={score}/>
        <StatisticsLine text="Positive" value={percPositive + "%"}/>
      </div>
    )
    else return (
      <div>No feedback given yet</div>
    )
  }
  

  const updateStats = () =>{
    setTotal(good + neutral + bad + 1)
    setScore((good * 1 + bad * (-1))/(good + bad))
    setPercPositive(good/(good+neutral+bad)*100)
    
  }

  const handleGoodClick = () =>{
    setGood(good + 1)
    updateStats()
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
    updateStats()
  }
  const handleBadClick = () =>{
    setBad(bad + 1)
    updateStats()
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <Statistics/>
      {/* <h1>statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average: {score}</p>
      <p>Positive: {percPositive}</p> */}
    </div>
  )
}

export default App