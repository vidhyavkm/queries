import React, { useState, useEffect } from 'react'
import NavBar from './Navbar'
import Footer from './Footer'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { PencilFill, PlusCircle, Trash3Fill } from 'react-bootstrap-icons'
import baseUrl from '../api/api'

function Exercises() {

    const [toggle, setToggle] = useState(true);
    const [allExercise, setAllExercise] = useState([]);

    const [exeName, setExeName] = useState("");
    const [exeType, setExeType] = useState("");
    const [des, setDes] = useState("");

    const fetchExerciseData = async () => {
        const res = await baseUrl.get("/exercises");
        setAllExercise(res.data);  
    }

    useEffect( () => {
        fetchExerciseData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const exeData = {
            exeName,
            exeType,
            des
        }
        await baseUrl.post("/exercises", exeData);
        alert("Exercise Updated Successfully");
        setExeName("");
        setExeType("");
        setDes("");
        setToggle(true);
        window.location.reload();
    }

    const handleDelete = async (id) => {
        await baseUrl.delete(`/exercises/${id}`);
        alert("Exercise deleted Successfully");
        window.location.reload();
    }

  return (
    <div className='bg'>  
          <NavBar />
          <Container className='mt-5 justify-content-center text-center' style={{width:"90rem"}}>
              <Row>
                  <h4 className='text-white fw-bold'>Exercise List</h4>
              </Row>
              
              {
                  toggle === true ? 
                <>
                <Row>
                  <Col>
                      <Button className='btn float-end fw-bold' onClick={() => setToggle(false)} style={{backgroundColor:"#866abd",border:"#866abd"}}><PlusCircle style={{marginTop:"-3px"}}/> Add Exercise</Button>
                  </Col>
                </Row>
                <Row className='m-4'>
                  <Table striped bordered className='table-striped fw-bold'>
                      <thead>
                          <tr className='fs-5'>
                              <th>#</th>
                              <th>Exercise Name</th>
                              <th>Exercise Type</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                            allExercise.map((exe,index) => (
                                <tr key={exe._id}>
                                    <td>{index+1}</td>
                                    <td>{exe.exeName.toUpperCase()}</td>
                                    <td>{exe.exeType}</td>
                                    <td><Trash3Fill onClick={()=>handleDelete(exe._id)}></Trash3Fill></td>
                                </tr>
                            ))
                          }
                      </tbody>
                  </Table>
              </Row>
                </>
              :
                <Row className='justify-content-center mt-4'>
                    <Card style={{width:"60rem"}}>
                        <Card.Header className='fs-4 text-white fw-bold mt-4' style={{backgroundColor:"#270c42"}}>Add Exercise</Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={7}>
                                        <Form.Group>
                                            <Form.Control type='text' placeholder='Enter Exercise Name' value={exeName} onChange={(e)=>setExeName(e.target.value)}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5}>
                                        <Form.Group>
                                            <Form.Control required type='text' placeholder='Enter the type of exercise' value={exeType} onChange={(e)=>setExeType(e.target.value)}></Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col>
                                        <Form.Control as="textarea" rows='5' placeholder='Description about the exercise' value={des} onChange={(e)=>setDes(e.target.value)}></Form.Control>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col>
                                        <Button type='submit' className='fw-bold' style={{ backgroundColor: "#270c42", border: "#866abd" }}>Submit</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
              }
          </Container>
        <Footer /> 
      </div>
  )
}

export default Exercises