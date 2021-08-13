import React from 'react'
import { firebase } from './firebase'

function App() {

  const [tareas, setTares] = React.useState([]) 
  const [tarea, setTarea] = React.useState('')

  React.useEffect(() => {
    const obtenerData = async () => {
      try {

        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTares(arrayData)

      } catch (error) {
        console.log(error);
      }
    } 

    obtenerData()

  }, [])

  const agregar = async (e) => {
    e.preventDefault()

    if(!tarea.trim()){ //si el elemento esta vacio
      return
    }

    try {
      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(nuevaTarea)
      setTares([
        ...tareas,
        {...nuevaTarea, id: data.id}
      ])
      setTarea('')

    } catch (error) {
      console.log(error);
    }
  }

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(el => el.id !== id)
      setTares(arrayFiltrado)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="App">
      <h1>base fire</h1>
      { tareas.map(tarea => 
        <ul key={tarea.id}>
          <li >{tarea.name}
            <button onClick={()=> eliminar(tarea.id) }>x</button>
            <button>editar</button>
          </li>
          <span>{tarea.fecha}</span>
        </ul>  
      )}
      <div>
        <h3>Formulario</h3>
        <form onSubmit={agregar}>
          <input 
          placeholder='Ingrese Tarea:' 
          type="text" 
          onChange={e => setTarea(e.target.value)}
          value={tarea}
          />
          <button type='submit'>Agregar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
