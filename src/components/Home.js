import React from "react";
import { Form, Navbar, Nav, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Stack,Badge } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";


const Home = () => {


    return (<div>
        <Navbar variant="dark" className="bg-primary">
            <Container>
                <Navbar.Brand>
                    <h2>Hemrix Mail</h2>
                </Navbar.Brand>
                <div className="w-75">
            <Form inline>
                <InputGroup>
                    <Form.Control
                            placeholder="Find messages, documents, photos or people"
                            type="search"
                            
                            />
                    <InputGroup.Text className="p-2">
                        <FaSearch/>
                    </InputGroup.Text>
                </InputGroup>
                    </Form>
                    </div>
                </Container>
        </Navbar>
        <div>
            <Container fluid>
                <Row>
                    <Col xs={3} sm={3} lg={3} x-lg={3}
                        className="bg-light" >
                        <div className="d-grid">
                            <Button variant="primary" size="md"
                            className="m-3">
                            Compose 
                        </Button>
                        </div>
                        
                        <Stack gap={4}>
                            <Stack direction="horizontal">
                                <div className="me-auto">Inbox</div>
                                <Badge>0</Badge>
                            </Stack>
                            
                            <div>Unread</div>
                            <div>Starred</div>
                            <div>Drafts</div>
                            <div>Sent</div>
                            <div>Archieve</div>
                            <div>Spam</div>
                            <div>Deleted Items</div>
                        </Stack>
                    </Col>
                    <Col lg={9} xs={9} sm={9} x-lg={9}>
                        Inbox Mail
                    </Col>
                </Row>
            </Container>
        </div>
    </div>)
}
export default Home;