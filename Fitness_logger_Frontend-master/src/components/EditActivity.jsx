import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import baseUrl from '../api/api'
import { Card, Col, Container, Form, InputGroup, Row, Button } from 'react-bootstrap';
import { DatePicker } from '@gsebdev/react-simple-datepicker';
import { useLocation, useNavigate } from 'react-router-dom';

function EditActivity() {

     const [allExercise, setAllExercise] = useState([]);
    
    const [inputList, setInputList] = useState([{  duration: "", exercise:"" }]);
    const [date, setDate] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state

    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const token = jsonData["token"];

    const fetchExerciseData = async () => {
        const res = await baseUrl.get("/exercises");
        setAllExercise(res.data);  
    }

    const fetchUserWorkoutData = async () => {
        const res = await baseUrl.get(`/userWorkout/${id}`, {headers: {Authorization: `bearer ${token}`}});
        setInputList(res.data.exercises);  
        setDate(res.data.day);
    }

    useEffect( () => {
        fetchExerciseData();
        fetchUserWorkoutData();
    }, [setInputList])
    
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { duration: "",  exercise: "" }]);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const workoutData = {
            exercises:inputList
        }
        await baseUrl.put(`/userWorkout/${id}`, workoutData, { headers: {Authorization: `bearer ${token}`}})
        alert("Workout details updated successfully");
        navigate("/fitness-summary")
    }

  return (
     <div className='d-flex flex-column bg'>  
          <NavBar />
          <Container className=' mt-5 justify-content-center text-center vh-100' style={{width:"90rem"}}>
              <Row>
                  <h4 className='fw-bold text-white'>Record Activity</h4>
              </Row>
              <Row className='justify-content-center mt-4'>
                  <Card style={{ width: "50rem" }} className='rounded-5'>
                      <Card.Header className='fs-4 text-white fw-bold mt-4 rounded-5' style={{backgroundColor:"#270c42"}}>Edit Activity</Card.Header>
                      <Card.Body className='justify-content-center'>
                          <Form onSubmit={handleSubmit}>
                              <Row className='mt-1'>
                                  <Col xs={5}>
                                  </Col>
                                  <Col xs={4}>
                                      <InputGroup>
                                          <InputGroup.Text>
                                              {date.slice(0,10)}
                                          </InputGroup.Text>
                                      </InputGroup>
                                  </Col>
                                  <Col xs={4}>
                                  </Col>
                              </Row>
                              {
                                  inputList.map((x, i) => {
                                    return (
                                    <Row className="mt-4" key={i}>
                                        <Col xs={4}>
                                            <Form.Control required as='select' type='select' name='exercise' placeholder='select exercise' value={x.exercise} onChange={e => handleInputChange(e, i)} >
                                            <option>Select Exercise 🔽</option>
                                            {
                                              allExercise.map((exe) => (
                                                  <option key={exe._id} value={exe.exeName.toUpperCase()}>{exe.exeName}</option>
                                              ))
                                            }
                                        </Form.Control>
                                        </Col>
                                        <Col xs={4}>
                                            <Form.Control
                                            name="duration"
                                            placeholder="Enter duration"
                                            value={x.duration}
                                            onChange={e => handleInputChange(e, i)}
                                            />
                                        </Col>
                                        <Col xs={2}>
                                        {inputList.length !== 1 && <Button
                                            onClick={() => handleRemoveClick(i)} className='fw-bold' style={{ backgroundColor: "#270c42", border: "#866abd" }}>Remove</Button>}
                                        
                                        </Col>
                                        <Col xs={2}>
                                            {inputList.length - 1 === i && <Button onClick={handleAddClick} className='fw-bold' style={{ backgroundColor: "#270c42", border: "#866abd" }}>Add More</Button>}
                                        </Col>
                                    </Row>
                                    );
                                })}

                              <Row className='mt-4 fw-bold'>
                                  <Col>
                                        <Button type='submit' className='fw-bold' style={{ backgroundColor: "#270c42", border: "#866abd" }}>Submit</Button>
                                  </Col>  
                              </Row>
                          </Form>
                      </Card.Body>
                  </Card>
              </Row>
          </Container>
        <Footer /> 
      </div>
  )
}

export default EditActivity