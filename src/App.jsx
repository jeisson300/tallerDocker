import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
 
  const [form, setform] = useState({
    name: ''
  })

  const handlechange = (e)=>
  {
    setform({name: e.target.value})
  }
  const handleSendName = (e)=>
  {
    e.preventDefault()

    const url = `http://localhost:32768/${import.meta.env.VITE_USUARIO}`;
    axios.get(url)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  }

  const handleToken = ()=>
  {
    // const url = `http://localhost:32768/${}`;
  }

  const {name} =  form
  return (
  <>
    <div><h1>Punto 3 del taller</h1>
    <form onSubmit={handleSendName}>
      <p>

      {/* <input type="text" placeholder='Ingrese un nombre' name = "name" value={name} onChange={handlechange} /> */}
      </p>
      <p>
      <button type='submit'>ENVIAR NOMBRE AL SERVIDOR</button>
      
      <button onclick='handleToken'>Token</button>
    </p>
    </form>
    </div>
  </>
  )
}

export default App
