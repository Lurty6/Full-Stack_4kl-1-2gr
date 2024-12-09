const PrintTime = (props) =>{
  const datenow = new Date()
  return(
    <div>
      <strong>{datenow.toString()}</strong>
       {props.end}
      <br/>
    </div>
  )
}

const Footer = () =>{
  return(
    <footer>
      <hr />
      Page made by derfie
    </footer>
  )
}

const App = () => {
  console.log("hold up")


  return (
    
    <div>
      <p>Hello worlsssd</p>
      <i>yo wassup </i>
      <PrintTime end="one"/>
      <PrintTime end="two"/>
      <Footer/>
    </div>
  )
}

export default App