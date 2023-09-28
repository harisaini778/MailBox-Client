import { useState,useRef } from "react";
import { Container, Modal, Button, Form,Stack, Spinner,Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import loginimg from "../assets/login.jpg";
const LogIn = () => {

    const [isLogIn, setIsLogIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isExisting, setIsExisting] = useState(false);
    
    const enteredEmail = useRef(null);
    const enteredPassword = useRef(null);

const submitFormHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

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
        } else {
          enteredEmail.current.value = "";
          enteredPassword.current.value = "";
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", email);
        //   navigate("/Home");
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

                <Row style={containerStyle}>
                    <Col xl={8} lg={8} sm={12} xs={12}>
                    <Image src={loginimg}
                            alt="Image alt text"
                           width={isSmaller ? "350px" : "600px" } 
                           height={isSmaller ? "350px" : "600px" } 
                    className="rounded"/>
                    </Col>
                    <Col xl={4} lg={4} sm={4} xs={12}>
                        <div className="modal show" style={{ position: "initial", display: "block" }}>
                            <Modal.Dialog>
                                <Modal.Header style={{ fontWeight: "bolder", fontSize: "2rem" }}
                                    className="m-auto mb-3">
                                    {isExisting || isLogIn ? <div>SignUp</div> : <div>LogIn</div>}
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={submitFormHandler}>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                                            >
                                                Email Id
                                            </Form.Label>
                                            <Form.Control type="email" ref={enteredEmail} />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                                            >
                                                Password
                                            </Form.Label>
                                            <Form.Control type="password" ref={enteredPassword} />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                                          >
                                                Confirm Password
                                            </Form.Label>
                                            <Form.Control type="password" />
                                        </Form.Group>
                                    </Form>
                                    <Stack>
                                        <div className="d-grid">
                                            <Button className="mb-1" style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                                            type="submit">
                                                {isLogIn || isExisting ? <div >SignUp</div> : <div >LogIn</div>}
                                            </Button>
                                        </div>
                                        <div className="m-2">
                                            {isLoading && <div>
                                            <Spinner animation="grow" variant="danger" />
                                            <Spinner animation="grow" variant="warning" />
                                            <Spinner animation="grow" variant="info" /></div>}
                                        </div>
                                    </Stack>
                                    <Container>
                                        <div className="m-auto text-primary">Forget Password ?</div>
                                    </Container>
                                </Modal.Body>
                                <Modal.Footer className="m-auto m-2 text-primary">
                                    { isExisting ? <div onClick={existingAccountHandler}
                                    className="border-bottom border-primary mb-2">Log into existing account.</div>
                                        : <div onClick={existingAccountHandler}
                                        className="border-bottom border-primary mb-2">New User ? Create a new account.</div>}
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