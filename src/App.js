import React, { useState, useEffect } from "react";
import { Button, Container} from "react-bootstrap";
import { isEmpty, size } from "lodash";
import { addDocument, getCollection, updateDocument, deleteDocument } from "./actions";

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setid] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      const result  = await getCollection("vetPatients")
      result.statusResponse && setTasks(result.data)
    })()
  }, [])

  const validForm = () => {
    let isValid = true
    setError(null)

    if(isEmpty(task)){
      setError("Debes agregar una tarea")
      isValid = false
    }
    return isValid
  }

  const addTask = async(e) => {
    e.preventDefault()
    
    if(!validForm())
    {
      return
    }    
    const result = await addDocument("vetPatients",{ name: task})
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setTasks([...tasks, {id: result.data.id, name: task}])

    setTask("")
  }

  const deleteTask = async(id) => {
    const result = await deleteDocument("vetPatients",id)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setTasks(tasks.filter(task => task.id !== id))
  }

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setid(theTask.id)
  }

  const saveTask = async(e) => {
    e.preventDefault()
    if(!validForm())
    {
      return
    }
    const result = await updateDocument("vetPatients", id, {name: task})

    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const editedTasks = tasks.map(taskItem => taskItem.id === id ? {id, name : task} : taskItem )
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setid("")
  }

  return (
    <Container>
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
        <h4 className="text-center">Lista de Tareas</h4>
          {
            size(tasks) > 0 ? (
            <ul className="list-group">
              { 
                tasks.map((task) => (
                  <li className="list-group-item">
                  <span className="lead">{task.name}</span>
                    <button 
                     className="btn btn-danger btn-sm float-right mx-2"
                     onClick = {() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-primary btn-sm float-right"
                      onClick = {() => editTask(task)}
                    >
                      Editar
                    </button>
                </li>
                ))
              }         
            </ul>
            ):(
             <li className="list-group-item">Aun no hay tareas</li>
            )
            
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">{editMode ? "Editar Tarea" : "Agregar tarea"}</h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            {
              error && <span className = "text-danger">{error}</span>
            }
            <input 
            type="text" className="form-control mb-2" placeholder="Ingrese el nombre de la tarea"
            onChange={(text) => setTask(text.target.value)}
            value={task}
            />
          <button 
            className={editMode ? "btn btn-warning btn-block" : "btn btn-success btn-block"}
            type="submit"
          >
            { editMode ? "Guardar" : "Agregar"}
          </button>
          </form>
        </div>
      </div>
    </Container>

    
  );
}

export default App;
