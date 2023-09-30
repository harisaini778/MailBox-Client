import { useState,useRef } from "react";
import { Container, Modal, Button, Form,Stack, Spinner,Image, Alert } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import loginimg from "../assets/login.jpg";
import { FaLock } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const LogIn = () => {

    const [isLogIn, setIsLogIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [isExisting, setIsExisting] = useState(false);
  const [matchPassword, setMatchPassword] = useState(true);
  const navigate = useNavigate();
    
    const enteredEmail = useRef();
    const enteredPassword = useRef();
    const confirmPassword = useRef();
  

  console.log("form submitted 1"); 
  
const submitFormHandler = (e) => {
  e.preventDefault();
  console.log("form submitted 2");
    setIsLoading(true);
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
     
  if (!isLogIn) { 
    const confirmPasswordValue = confirmPassword.current.value;
    if (password !== confirmPasswordValue) {
      setMatchPassword(false);
      setIsLoading(false);
      return;
    } else {
      setMatchPassword(true);
    }
  }


    let url = isLogIn
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBj8h0OYKwQY8xN_uzWw2Crp801EclmMJg"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBj8h0OYKwQY8xN_uzWw2Crp801EclmMJg";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    })
      .then((response) => {
        setIsLoading(false);
        return response.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("error")) {
          alert(data.error.message);
          enteredEmail.current.value = "";
          enteredPassword.current.value = "";
          confirmPassword.current.value = "";
        } else {
          enteredEmail.current.value = "";
          enteredPassword.current.value = "";
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", email);
          //localStorage.setItem("id", data.localId);
          console.log("response is : ", data);
          navigate("/EmailVerify");
          if (isLogIn) {
            alert("Log in successful");
          } else {
            alert(
              "Your account is created successfully. Now you can log in using your credentials"
            );
          }
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("An error occurred. Please try again later.");
        enteredEmail.current.value = "";
        enteredPassword.current.value = "";
        confirmPassword.current.value = "";
      });
    };
    
    const existingAccountHandler = () => {
    setIsExisting((prevState) => !prevState);
    setIsLogIn((prevState) => !prevState);
    };
      
    const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

    const isSmaller = window.innerWidth <= 576;
    return (
        <div style={{overflowX:"hidden",minHeight:"100vh"}}>
            <Container>
          {!matchPassword && <Alert variant="danger" dismissible>
            <div>Your confirm password did not match!</div>
          </Alert>}
                <Row style={containerStyle}>
                    <Col xl={6} lg={6} sm={12} xs={12}>
                    <Image src={loginimg}
                            alt="Image alt text"
                           width={isSmaller ? "350px" : "600px" } 
                           height={isSmaller ? "350px" : "550px" } 
                    className="rounded"/>
                    </Col>
            <Col xl={6} lg={6} sm={12} xs={12}>
                        <div className="modal show" style={{ position: "initial", display: "block",width: isSmaller ? "auto" : "380px" }}>
                            <Modal.Dialog>
                                <Modal.Header style={{ fontWeight: "bolder" }}
                                    className="mx-auto mb-2">
                                    {isExisting || isLogIn ? <div><h1>LogIn<span className="m-2"><FaKey size={24}/></span></h1></div> : <div><h1>SignUp<span className="m-2"><FaLock size={24}/></span></h1></div>}
                                </Modal.Header>
                                <Modal.Body>
                                   <Form onSubmit={submitFormHandler}>
                                  <Form.Group as={Col} className="mb-2" style={{textAlign:"center",fontSize:"1.2rem"}}>
                                <Form.Label style={{ fontWeight: "bold" }}>
                               Email Id
                              </Form.Label>
                             <Form.Control type="email" ref={enteredEmail} />
                           </Form.Group>
                         <Form.Group as={Col} className="mb-2" style={{textAlign:"center",fontSize:"1.2rem"}}>
                                  <Form.Label style={{ fontWeight: "bold" }}>
                                Password
                            </Form.Label>
                            <Form.Control type="password" ref={enteredPassword} />
                          </Form.Group>
                      {!isLogIn && <Form.Group as={Col} className="mb-2" style={{textAlign:"center",fontSize:"1.2rem"}}>
                        <Form.Label style={{ fontWeight: "bold" }}>
                          Confirm Password
                        </Form.Label>
                        <Form.Control type="password" ref={confirmPassword} />
                      </Form.Group>}
                                    <Stack>
                                        <div className="d-grid">
                                           <Button
                                          className="mb-2"
                                         style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                                        type="submit"
                            onClick={() => console.log("Button clicked")} // Add this for debugging
                          >
                            {isLogIn || isExisting ? <div>LogIn</div> : <div>SignUp</div>}
                            </Button>
                                        </div>
                                        <div className="m-2 mx-auto">
                                            {isLoading && <div>
                                            <Spinner animation="grow" variant="danger" />
                                            <Spinner animation="grow" variant="warning" />
                                            <Spinner animation="grow" variant="info" /></div>}
                                        </div>
                                    </Stack>
                                  </Form>
                                    <Container>
                                        <div className="text-primary" style={{textAlign:"center",fontSize:"1.1rem"}} >Forget Password ?</div>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer className="m-auto m-2 text-primary">
                                    { isExisting ? <div onClick={existingAccountHandler}
                                    className="border-bottom border-primary mb-2">New User ? Create a new account.</div>
                                        : <div onClick={existingAccountHandler}
                                        className="border-bottom border-primary mb-2">Log into existing account.</div>}
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}
export default LogIn;