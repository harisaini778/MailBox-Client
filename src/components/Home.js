import React from "react";
import { Form, Navbar, Nav, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Stack,Badge,Dropdown} from "react-bootstrap";
import { FaSearch,FaImages,FaFile,FaMoneyBill,FaTags,FaPlane } from "react-icons/fa";


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
                    <Col xs={5} sm={5} lg={2} x-lg={2}
                        className="bg-light" style={{minHeight: "100vh"}}>
                        <Container>
                            <div className="d-grid">
                            <Button variant="primary" size="md"
                            className="m-3">
                            Compose 
                        </Button>
                        </div>
                        </Container>
                        <Stack gap={4}>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Inbox</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Unread</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                             <Stack direction="horizontal">
                                <div className="me-auto m-1">Starred</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Drafts</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Sent</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Archieve</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Spam</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                            <Stack direction="horizontal">
                                <div className="me-auto m-1">Deleted Items</div>
                                <Badge className="ms-auto m-1">0</Badge>
                            </Stack>
                        </Stack>
                        <div className="d-flex justify-content-center">
                        <Dropdown className="mt-2">
                            <Dropdown.Toggle variant="primary" id="dropdown-split-basic" className="m-2">
                                     View more                     
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Stack direction="horizontal">
                                        <div className="me-auto ">
                                            <FaImages/>
                                        </div> 
                                        <div className="ms-auto">Photos</div>
                                    </Stack>
                                </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Stack direction="horizontal">
                                        <div className="me-auto ">
                                            <FaFile/>
                                        </div> 
                                        <div className="ms-auto">Documents</div>
                                    </Stack>
                                </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Stack direction="horizontal">
                                        <div className="me-auto ">
                                            <FaMoneyBill/>
                                        </div> 
                                        <div className="ms-auto">Subscriptions</div>
                                    </Stack>
                                </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Stack direction="horizontal">
                                        <div className="me-auto ">
                                            <FaTags/>
                                        </div> 
                                        <div className="ms-auto">Deals</div>
                                    </Stack>
                                </Dropdown.Item>
                                    <Dropdown.Item>
                                    <Stack direction="horizontal">
                                        <div className="me-auto ">
                                            <FaPlane/>
                                        </div> 
                                        <div className="ms-auto">Travel</div>
                                    </Stack>
                                </Dropdown.Item>
                                </Dropdown.Menu> 
                            </Dropdown> 
                            </div>
                    </Col>
                    <Col lg={10} xs={7} sm={7} x-lg={10}>
                        Inbox Mail
                    </Col>
                </Row>
            </Container>
        </div>
    </div>)
}
export default Home;