import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../api/api";
import { useState } from "react";

function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password
    }
    
    try {

      const response = await baseUrl.post("/user/signin", credentials);

      const user = response.data;
      window.sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      // setLoggedInUser(user.name);
      setEmail("");
      setPassword("");
      navigate("/home");

    } catch (error) {
      alert(`Check your email and password ${error} `);
    }
  }

  return (
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h1 className="fw-bold  text-uppercase text-center" style={{color:"#6f4db0"}}><img src={logo} style={{width:"40px", marginTop:"-9px"}}></img> Fitness Logger</h1>
                  <p className="mb-4 fs-4 fw-bold text-center" style={{color:"#6f4db0"}}>SIGN IN HERE..!</p>
                  <div className="mb-3">
                    <Form onSubmit={handleSignin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <Link className="fw-bold" to='/forgot-password' style={{color:"#866abd"}}>
                            Forgot password?
                          </Link>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button type="submit" className="fs-5 fw-bold" style={{backgroundColor:"#866abd"}}>
                          Signin
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <Link to='/signup' className="fw-bold" style={{color:"#866abd"}}>
                          Sign Up
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default Signin;