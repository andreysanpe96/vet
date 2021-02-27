import React, { useState, useEffect } from "react";
import { Button, Container, Table} from "react-bootstrap";
import { size } from "lodash";
import { addDocument, getCollection, updateDocument, deleteDocument } from "./actions";
import MyModal from "./MyModal";
import Patient from "./Patient.js"

function App() {
  const [patient, setPatient] = useState(new Patient("","","","","","","",""))
  const [patients, setPatients] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setid] = useState("")
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    (async () => {
      const result  = await getCollection("vetPatients")
      result.statusResponse && setPatients(result.data)
    })()
  }, [])

  var thPetStyle = {
    background: "#75cfb8"
  };

  var thOwnerStyle = {
    background: "#bbdfc8"
  };

  const addPatient = async(e) => {
    e.preventDefault()

    const result = await addDocument("vetPatients",patient)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setPatients([...patients, {id: result.data.id, ...patient}])

    setPatient(new Patient("","","","","","","",""))
    setShow(false)
  }

  const deletePatient = async() => {
    const result = await deleteDocument("vetPatients",patient.id)
    if(!result.statusResponse){
      setError(result.error)
      return
    }
    setPatients(patients.filter(thePatient => thePatient.id !== patient.id))
    setShowDeleteModal(false)
  }

  const showDeleteConfirmation = async(patient) => {
    setPatient(patient)
    setShowDeleteModal(true)
  }

  const editPatient = (patient) => {
    setPatient(patient)
    setEditMode(true)
    setid(patient.id)
    setShow(true)
  }

  const savePatient = async(e) => {
    e.preventDefault()
    const result = await updateDocument("vetPatients", id, patient)

    if(!result.statusResponse){
      setError(result.error)
      return
    }
    const editedPatients = patients.map(thePatient => thePatient.id === id ? {...patient, id} : thePatient )
    setPatients(editedPatients)
    setShow(false)
    setEditMode(false)
    setPatient(new Patient("","","","","","","",""))
    setid("")
  }

  return (
    
    <Container responsive="true">
      {<MyModal patient = {patient} setPatient = {setPatient} addPatient={addPatient} 
      savePatient={savePatient} editMode={editMode} setEditMode={setEditMode} 
      show={show} setShow={setShow} showDeleteModal = {showDeleteModal} 
      setShowDeleteModal = {setShowDeleteModal} deletePatient={deletePatient}/>}
      <hr/>
      <div className="row">
        <div className="col">
        <h4 className="text-center">Patients</h4>
          

        <Table  striped bordered hover responsive="sm">
          <thead>
          <tr>
          <th colSpan="4" style = {thPetStyle} className="text-center">Pet</th>
          <th colSpan="4" style = {thOwnerStyle} className="text-center">Owner</th>
          </tr>
            <tr>
              <th style = {thPetStyle}>Name</th>
              <th style = {thPetStyle}>Type</th>
              <th style = {thPetStyle}>Race</th>
              <th style = {thPetStyle}>Date of birth</th>
              <th style = {thOwnerStyle}>Full name</th>
              <th style = {thOwnerStyle}>Phone</th>
              <th style = {thOwnerStyle}>address</th>
              <th style = {thOwnerStyle}>email</th>
              <th style = {{background:"#9fb8ad"}} className="text-center" >Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            size(patients) > 0 ? (
              patients.map((patient) => (
                  <tr>
                  <td>{patient.name}</td>
                  <td>{patient.type}</td>
                  <td>{patient.race}</td>
                  <td>{patient.birthDate}</td>
                  <td>{patient.OwnerName}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.address}</td>
                  <td>{patient.email}</td>
                  <td>
                  <Button variant="danger sm mx-3" onClick = {() => showDeleteConfirmation(patient)}>
                    Delete
                  </Button>
                  <Button variant="primary sm " onClick = {() => editPatient(patient)}>
                    Edit
                  </Button>
                   </td>
                </tr>
                ))
            ):(
              <tr >
                <td colSpan="4" >No patients.</td>
              </tr>
            )
          }
          </tbody>
        </Table>
        
        </div>
        
      </div>
      
      <hr/>
    </Container>

    
  );
}

export default App;
