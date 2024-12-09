import { useState } from 'react'

const App = () => {
  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

  const [value, setValue] = useState(10)

  const setToValue = (newValue) =>{
    setValue(newValue)
  }

  return (
    <div>
      {value}


      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
      <Button handleClick={() => setToValue(value -1)} text="decrement"></Button>


    </div>
  )
}

export default App