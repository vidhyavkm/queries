import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';
import { PencilFill, PlusCircle, TrashFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../api/api';
import { DatePicker } from '@gsebdev/react-simple-datepicker';
import dayjs from 'dayjs';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function FitnessSummary() {

    const [userWorkout, setUserWorkout] = useState([]);
    const [dropdownTitle, setDropdownTitle] = useState("All Workouts");
    const [customRange, setCustomRange] = useState("false");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();

    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const token = jsonData["token"];
    
    const fetchUserWorkoutData = async () => {
        const res = await baseUrl.get("/userWorkout", {headers: {Authorization: `bearer ${token}`}})
        setUserWorkout(res.data);
    }

    useEffect(() => {
        fetchUserWorkoutData();
    }, []);

    const handleSevenDays = async (e) => {
        const res = await baseUrl.get("/userWorkout/lastSeven", { headers: { Authorization: `bearer ${token}` } })
        setUserWorkout(res.data);
        setDropdownTitle("Last 7 workout");
    }

    const handleThirtyDays = async (e) => {
        const res = await baseUrl.get("/userWorkout/lastThirty", { headers: { Authorization: `bearer ${token}` } })
        setUserWorkout(res.data);
        setDropdownTitle("Last 30 workout");
    }

    const handleCustomRange = async (e) => {
        const res = await baseUrl.get(`/userWorkout/${dayjs(startDate).format("MM-DD-YYYY")}/${dayjs(endDate).format("MM-DD-YYYY")}`, { headers: { Authorization: `bearer ${token}` } })
        setUserWorkout(res.data);
        setCustomRange(false);
        setDropdownTitle(`${dayjs(startDate).format("DD-MM-YYYY")} - ${dayjs(endDate).format("DD-MM-YYYY")}`);
    }

    const handleEdit = (id, event) => {
        event.preventDefault();
        navigate("/editActivity", {
            state: id
        }
        );
        console.log(id)
        
    }

    const handleDelete = async (id, event) => {
        event.preventDefault();

        await baseUrl.delete(`/userWorkout/${id}`, {headers: {Authorization: `bearer ${token}`}})
        alert("Workout deleted successfully");
        window.location.reload();
    }

  return (
    <div className='bg' >  
        <NavBar />
        <Container className='mt-5 justify-content-center text-center mb-5 body1' style={{width:"90rem"}}>
            <Row>
                <h4 className='text-white fw-bold'>Fitness Summary</h4>
            </Row>
            <Row>
                <Col>
                    <Link className='btn text-white float-start fw-bold' to='/recordActivity' style={{backgroundColor:"#866abd"}}><PlusCircle style={{marginTop:"-3px"}}/> Log Activity</Link>
                </Col>
                <Col>
                    <Dropdown className='float-end'>
                        <Dropdown.Toggle id="dropdown-basic"className='fw-bold' style={{backgroundColor:"#866abd",border:"#866abd"}}>
                            {dropdownTitle}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => (fetchUserWorkoutData(), setDropdownTitle("All Workouts"))}>All Workouts</Dropdown.Item>
                            <Dropdown.Item onClick={handleSevenDays}>Last 7 workouts</Dropdown.Item>
                            <Dropdown.Item onClick={handleThirtyDays}>Last 30 workouts</Dropdown.Item>
                            <Dropdown.Item onClick={() => (setCustomRange(true)) }>Select custom range</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            {
                customRange===true ? 
                <Row className='mt-3 justify-content-center'>
                    <Col xs={2}>
                        <DatePicker placeholder='Select start Date...'
                                    onChange={(e)=>setStartDate(e.target.value)}
                                    value={startDate} />
                    </Col>
                    <Col xs={2}>
                        <DatePicker placeholder='Select end Date...'
                                    onChange={(e)=>setEndDate(e.target.value)}
                                    value={endDate} />
                    </Col>
                        <Button className='fw-bold' onClick={handleCustomRange} style={{backgroundColor:"#866abd",border:"#866abd"}}
                        >Filter Result</Button>
                </Row> 
                : ""
            }
            <Row className='justify-content-center' lg={[3]}>
                    {
                      userWorkout.map((workout, index) => {
                          return(
                            <Card key={index} className='col-md-3 m-5 mb-2 rounded-5' >
                                  <Card.Header className='fw-bold float-start fs-3 text-white mt-2 rounded-5' style={{backgroundColor:"#270c42"}}>{dayjs(workout.day.slice(0,10)).format("DD-MM-YYYY")}
                                      <Button className='float-end m-1' style={{ backgroundColor: "#866abd", border: "#866abd" }} onClick={(event) => handleEdit(workout._id,event)}>
                                          <PencilFill />
                                      </Button>
                                      <Button className='float-end m-1' style={{ backgroundColor: "#866abd", border: "#866abd" }} onClick={(event) => handleDelete(workout._id,event)}>
                                          <TrashFill></TrashFill>
                                      </Button>
                                  </Card.Header>
                                  <Card.Body className='text-center'>
                                      <p className='fs-5 fw-bold'><span className=''>Total Duration : </span> {workout.totalDuration } minutes</p>
                                      <Doughnut data={{
                                          labels: workout.exercises.map(exe => exe.exercise),
                                          datasets: [
                                              {
                                                  data: workout.exercises.map(exe => exe.duration),
                                                  backgroundColor:[
                                                      '#ccb0e8',
                                                      "#855bb0",
                                                      '#786090',
                                                      '#E0B0FF',
                                                      '#C3B1E1',
                                                      '#CCCCFF',
                                                  ],
                                                  borderRadius: 10,
                                                  borderColor: 'black'
                                              }
                                          ]
                                      }}/>
                                  </Card.Body>
                            </Card>
                        )
                    })
                }
            </Row>
        </Container>
        <Footer /> 
    </div>
  )
}

export default FitnessSummary