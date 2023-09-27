import { Container, Modal, Button, Form,Stack, Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
const LogIn = () => {



    return(
        <div>
            <Container>
                <Row  className="justify-content-center">
                    <Col xl={4} lg={4} sm={12} xs={12} >
                <div className="modal show" style={{position:"initial",display:"block"}}>
                    <Modal.Dialog >
                                <Modal.Header style={{fontWeight: "bolder", fontSize: "2rem" }}
                                className="m-auto mb-3">
                            SignUp
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label style={{fontWeight:"bold",fontSize:"1.2rem"}}>
                                        Email Id  
                                    </Form.Label>
                                    <Form.Control type="email"/>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                <Form.Label style={{fontWeight:"bold",fontSize:"1.2rem"}}>
                                        Password 
                                    </Form.Label>
                                    <Form.Control type="password"/>
                                </Form.Group>
                                  <Form.Group as={Col} className="mb-3">
                                <Form.Label style={{fontWeight:"bold",fontSize:"1.2rem"}}>
                                        Confirm Password  
                                    </Form.Label>
                                    <Form.Control type="password"/>
                                </Form.Group>
                            </Form>
                            <Stack>
                                <div className="d-grid">
                                <Button className="mb-1" style={{fontWeight:"bold",fontSize:"1.1rem"}}>
                                    Sign up
                                </Button>
                                </div>
                                <div className="m-2">
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
                              </div>
                            </Stack>
                            <Container>
                                <div className="m-auto text-primary">Forget Password ?</div>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer className="m-auto m-2 text-primary">
                            Log into existing account.
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}
export default LogIn;