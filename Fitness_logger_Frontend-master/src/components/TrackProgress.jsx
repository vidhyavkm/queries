import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import NavBar from './Navbar';
import { Container, Row, Dropdown, Col, Button } from 'react-bootstrap';
import { DatePicker } from '@gsebdev/react-simple-datepicker';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, PointElement, LineElement,Title, Legend } from 'chart.js';
import baseUrl from '../api/api';
import dayjs from 'dayjs';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function TrackProgress() {

    const [userWorkout, setUserWorkout] = useState([]);
    const [dropdownTitle, setDropdownTitle] = useState("Last 7 workouts");
    const [customRange, setCustomRange] = useState("false");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


    let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const token = jsonData["token"];

    const fetchUserWorkoutData = async (req, res) => {
        const response = await baseUrl.get("/userWorkout/lastSeven", { headers: { Authorization: `bearer ${token}` } })
        setUserWorkout(response.data)
    }

    const handleThirtyDays = async (e) => {
        const res = await baseUrl.get("/userWorkout/lastThirty", { headers: { Authorization: `bearer ${token}` } })
        setUserWorkout(res.data);
        setDropdownTitle("Last 30 workout");
    }
    
    useEffect(() => {
        fetchUserWorkoutData();
    }, [])
    
    const handleCustomRange = async (e) => {
        const res = await baseUrl.get(`/userWorkout/${dayjs(startDate).format("MM-DD-YYYY")}/${dayjs(endDate).format("MM-DD-YYYY")}`, { headers: { Authorization: `bearer ${token}` } })
        setUserWorkout(res.data);
        setCustomRange(false);
        setDropdownTitle(`${dayjs(startDate).format("DD-MM-YYYY")} - ${dayjs(endDate).format("DD-MM-YYYY")}`);
    }

  return (
    <div className='bg-white' >  
        <NavBar />
          <Container className='mt-5 justify-content-center text-center mb-5 body1' style={{ width: "90rem" }}>
              <Row>
                  <Dropdown className='float-end'>
                        <Dropdown.Toggle id="dropdown-basic"className='fw-bold' style={{backgroundColor:"#866abd",border:"#866abd"}}>
                            {dropdownTitle}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => (fetchUserWorkoutData(), setDropdownTitle("Last 7 Workouts"))}>Last 7 workouts</Dropdown.Item>
                            <Dropdown.Item onClick={handleThirtyDays}>Last 30 workouts</Dropdown.Item>
                            <Dropdown.Item onClick={() => (setCustomRange(true)) }>Select custom range</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
              <Container className='justify-content-center' style={{width:"50rem"}}>
                  <Row className='mt-5' >
                    <Line data={{
                        labels: userWorkout.map(workout=>dayjs(workout.day.slice(0,10)).format("DD-MM-YYYY")),
                        datasets: [{
                            data: userWorkout.map(workout => workout.totalDuration),
                            label: dropdownTitle,
                            fill: false,
                            borderColor: "#866abd",
                            tension: 0.2
                        }]
                    }} />
              </Row>
              </Container>
          </Container>
          <Footer />
    </div>
  )
}

export default TrackProgress