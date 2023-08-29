import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import { Button, Card, Col, Container, Form, FormControl, Row } from 'react-bootstrap';
import user from '../assets/user.png'
import { PencilFill } from 'react-bootstrap-icons';
import baseUrl from '../api/api';

function Profile() {

    const [toggle, setToggle] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const token = jsonData["token"];

    const fetchUserData = async () => {
        const res = await baseUrl.get("/user/profile", {headers: {Authorization: `bearer ${token}`}});
        setName(res.data.name);
        setEmail(res.data.email);
        setWeight(res.data.weight);
        setHeight(res.data.height);
    }

    let BMI = (weight / Math.pow((165 / 100), 2).toFixed(2)).toFixed(2);

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleProfileUpdate = async () => {
        const profileData = {
            height,
            weight
        }

        await baseUrl.put("/user/profile", profileData, { headers: { Authorization: `bearer ${token}` } });
        alert("User profile updated");
        setToggle(true);
        window.location.reload();
    }

  return (
    <div className='d-flex flex-column'>  
          <NavBar />
          <Container className='mt-5 justify-content-center text-center vh-100' style={{width:"35rem"}}>
              {/* <Row>
                  <h4 className='text-white fw-bold'>User Profile</h4>
              </Row> */}
              <Row className='justify-content-center mt-4'>
                  <Card style={{width:"50rem"}} className='rounded-5'>
                      <Card.Header className='fs-5 rounded-5 mt-2 text-white fw-bold' style={{backgroundColor:"#270c42"}}>User Profile</Card.Header>
                      {/* <Card.Img src={user} style={{width:"50px"}} className='text-center'></Card.Img> */}
                      <Card.Body>
                          <Card.Img src={user} style={{ width: "8rem" }}></Card.Img>
                          <h5 className='mt-2'>{name} <PencilFill style={{ marginTop: "-4px" }} onClick={()=> setToggle(false)}></PencilFill></h5>
                          <p>{email}</p>
                          {
                              toggle === true ?
                                <Row className='mt-4'>
                                    <Col xs={4}>
                                        <h5>Weight : {weight}kg</h5>
                                    </Col>
                                    <Col xs={4}>
                                        <h5>Height : {height}cm</h5>
                                    </Col>
                                    <Col xs={4}>
                                        <h5>BMI : {BMI}</h5>
                                    </Col>
                                </Row>
                                :
                                <Form onSubmit={handleProfileUpdate}>
                                    <Row className='mt-4'>
                                        <Col xs={6}>
                                            <FormControl placeholder='Enter your weight (in kg)' value={weight} onChange={(e)=>setWeight(e.target.value)}></FormControl>
                                        </Col>
                                        <Col xs={6}>
                                            <FormControl placeholder='Enter your height (in cm)' value={height} onChange={(e)=>setHeight(e.target.value)}></FormControl>
                                        </Col>
                                    </Row>
                                    <Row className='mt-4'>
                                        <Col>
                                            <Button type='submit'>Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                          }
                      </Card.Body>
                  </Card>
                  <Card className='rounded-5 mt-3'>
                      <Card.Header className='fs-4 rounded-5 mt-2 text-white fw-bold' style={{backgroundColor:"#270c42"}}>BMI Categories</Card.Header>
                      <Card.Body>
                          <p className='fw-bold'> Underweight = <span className='fs-6'>lessthan</span>18.5</p>
                          <p className='fw-bold'> Normalweight = <span className='fs-6'></span>18.5 - 24.9</p>
                          <p className='fw-bold'> Overweight = <span className='fs-6'></span>25 - 29.9</p>
                          <p className='fw-bold'> Obesity = <span className='fs-6'></span>30 & above</p>
                      </Card.Body>
                  </Card>
              </Row>
          </Container>
        <Footer /> 
      </div>
  )
}

export default Profile