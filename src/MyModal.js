import React from "react";
import { Modal, Button, Form} from "react-bootstrap";
const Patient = require('./Patient.js')

function MyModal({patient,setPatient,addPatient,savePatient,editMode,setEditMode,show, setShow,
  showDeleteModal,setShowDeleteModal,deletePatient}) {

  return (
      <>
        <Button variant="success" onClick={() => {setShow(true); setPatient(new Patient("","","","","","","",""))}}>
          Create Patient
        </Button>
  
        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="custom-modal-styling-title"
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title id="custom-modal-styling-title">
              {editMode ? "Edit " : "Create "} Patient
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>            
            <Form onSubmit={editMode ? savePatient : addPatient}>
              <Modal.Header>
                <Modal.Title >
                  Pet
                </Modal.Title>
              </Modal.Header>
                <Form.Group >
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" 
                  onChange={(text) => setPatient({...patient, name: text.target.value })} 
                  defaultValue={patient.name} placeholder="Name..." required/>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Type</Form.Label>
                  <Form.Control onChange={(text) => setPatient({...patient, type: text.target.value })} 
                  value={patient.type} as="select" required>
                    <option></option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Bird</option>
                    <option>Horse</option>
                    <option>Cow</option>
                    <option>Fish</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Race</Form.Label>
                  <Form.Control type="text" onChange={(text) => setPatient({...patient, race: text.target.value })} 
                  defaultValue={patient.race} placeholder="Race..."  required/>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control type="date" onChange={(text) => setPatient({...patient, birthDate: text.target.value })} 
                  value={patient.birthDate} required/>
                </Form.Group>
              <Modal.Header>
                <Modal.Title >
                Owner
                </Modal.Title>
              </Modal.Header>
                <Form.Group >
                  <Form.Label>Full Name</Form.Label>  
                  <Form.Control type="text" 
                   onChange={(text) => setPatient({...patient, OwnerName: text.target.value })} 
                   defaultValue={patient.OwnerName}
                   placeholder="Full name..." required />
                </Form.Group>
                <Form.Group >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="number" min = "0" 
                  onChange={(text) => setPatient({...patient, phone: text.target.value })} 
                  defaultValue={patient.phone}
                  placeholder="Phone..." required/>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text"
                  onChange={(text) => setPatient({...patient, address: text.target.value })} 
                  defaultValue={patient.address} placeholder="Address..." required/>
                </Form.Group>
                <Form.Group >
                  <Form.Label>Email</Form.Label>
                  <Form.Control  type="email" 
                  onChange={(text) => setPatient({...patient, email: text.target.value })} 
                  defaultValue={patient.email}
                  placeholder="Email..." required/>
                </Form.Group>

                <Modal.Footer>
                  <Button type ="submit" variant={editMode ? "primary" : "success"} 
                  >
                    { editMode ? "Edit" : "Save"}
                  </Button>
                  <Button variant="secondary"  onClick={() => {setShow(false) ; setEditMode(false)}}
                  >
                    Exit
                  </Button>
                </Modal.Footer>
            </Form>
          </Modal.Body>
          
        </Modal>

        
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          dialogClassName="modal-90w"
          aria-labelledby="custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title variant="danger" >
              Delete Patient
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>            
              <Modal.Header>
                <h2>¿Are you sure to eliminate the patient ({patient.name}) ? </h2>
                  
              </Modal.Header>

                <Modal.Footer>
                  <Button variant = "danger"  onClick={() => deletePatient()}
                  >
                    Delete
                  </Button>
                  <Button variant="secondary"  onClick={() => setShowDeleteModal(false)}
                  >
                    Exit
                  </Button>
                </Modal.Footer>
          </Modal.Body>
          
        </Modal>
      </>
    );
  }

  export default MyModal;