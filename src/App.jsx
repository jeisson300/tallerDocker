import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
 
  const [form, setform] = useState({
    name: '',
    cedula: ''
  })

  const {name, cedula} = form;

  const handlechange = (e)=>
  {
    
    setform({ ...form , [e.target.name]: e.target.value})
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

  const handleToken = (e)=>
  {
    e.preventDefault();
    const url =`https://localhost:32768/generarToken`;
    let variable = {
      cedula, name
    }
    axios.post(url, variable).then((resp)=>
    {
      console.log(resp);
    })
  }

  
  return (
  <>
    <div><h1>Punto 3 del taller</h1> 
     <p>

      {/* <input type="text" placeholder='Ingrese un nombre' name = "name" value={name} onChange={handlechange} /> */}
      </p>
      <p>
      <button onClick={handleSendName}>ENVIAR NOMBRE AL SERVIDOR</button>
      
      <form onSubmit={handleToken}>
      <input type='text' placeholder='Nombre' name="name" value={name} onChange={handlechange}/>
      <input type='text' placeholder='cedula'  name="cedula" value={cedula}  onChange={handlechange} />

      <button type='submit'>Generar token</button>
      </form> 
    </p>

    </div>
  </>
  )
}

export default App
