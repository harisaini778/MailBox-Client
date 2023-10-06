import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Navbar, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Stack, Badge, Dropdown, Offcanvas } from "react-bootstrap";
import { FaSearch, FaImages, FaFile, FaMoneyBill, FaTags, FaPlane } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Mail from "./Mail";
import { useNavigate } from "react-router-dom";
import { toggleInboxIsClicked } from "../store/dataStore";
import { toggleStarIsClicked } from "../store/dataStore";
import { toggleArchieveIsClicked } from "../store/dataStore";

const Home = () => {
  const dispatch = useDispatch();
  const inboxMessages = useSelector((state) => state.dataStore.inboxMessages);
  const starMessages = useSelector((state) => state.dataStore.starredMessages);
  const archieveMessages = useSelector((state) => state.dataStore.archiveMessages);

  

  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow(!show);
  const navigate = useNavigate();

  const handleComposeRender = () => {
    navigate("/ComposeMail");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleInbox = () => {
    dispatch(toggleInboxIsClicked()); 
  };

   const toggleStar = () => {
    dispatch(toggleStarIsClicked()); 
  };

   const toggleArchieve = () => {
    dispatch(toggleArchieveIsClicked()); 
  };

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar variant="dark" className="bg-primary" expand="lg">
        <Container>
          <Navbar.Brand>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
            <h1 style={{ fontFamily: "Dancing Script,cursive", fontSize: isSmaller ? "3.0rem" : "3.3rem" }}>Hemrix Mail!</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div>
              <Form inline>
                <InputGroup>
                  <Form.Control
                    placeholder='Find messages, documents, photos or people'
                    type="search"
                    style={{ width: isSmaller ? "70vw" : "40vw" }}
                  />
                  <InputGroup.Text className="justify-content-center" style={{ width: isSmaller ? "auto" : "5vw" }}>
                    {isSmaller && <Button onClick={toggleShow} variant="light">
                      <BsList size={20} />
                    </Button>}
                    <FaSearch size={isSmaller ? 20 : 26} />
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Container fluid>
          {isSmaller ? (
            <Row>
              <Col className="justify-content-center">
                <Stack>
                  <div>
                    <Offcanvas show={show} onHide={toggleShow}>
                      <Offcanvas.Header closeButton onClose={handleClose}>
                        <Offcanvas.Title>
                          Some Title
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Container>
                          <div className="d-grid">
                            <Button variant="primary" size="md"
                              className="m-3" onClick={handleComposeRender}>
                              Compose
                            </Button>
                          </div>
                        </Container>
                        <Stack gap={4}>
                          <Stack direction="horizontal" className="menu-item">
                            <div className="me-auto m-1" onClick={toggleInbox}>
                              Inbox
                            </div>
                            <Badge className="ms-auto m-1">{inboxMessages.length}</Badge>
                          </Stack>
                            <Stack direction="horizontal" className="menu-item">
                            <div className="me-auto m-1" onClick={toggleStar}>
                              Starred
                            </div>
                            <Badge className="ms-auto m-1">{starMessages.length}</Badge>
                          </Stack>
                           <Stack direction="horizontal" className="menu-item">
                            <div className="me-auto m-1" onClick={toggleArchieve}>
                              Archieve
                            </div>
                            <Badge className="ms-auto m-1">{archieveMessages.length}</Badge>
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
                                    <FaImages />
                                  </div>
                                  <div className="ms-auto">Photos</div>
                                </Stack>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Stack direction="horizontal">
                                  <div className="me-auto ">
                                    <FaFile />
                                  </div>
                                  <div className="ms-auto">Documents</div>
                                </Stack>
                              </Dropdown.Item>
                              {/* Add other dropdown items as needed */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                </Stack>
              </Col>
              <Col className="justify-content-center">
                <Mail />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={2} x-lg={2}
                className="bg-light" style={{ minHeight: "100vh" }}>
                <div>
                  <Container>
                    <div className="d-grid">
                      <Button variant="primary" size="md"
                        className="m-3" onClick={handleComposeRender}>
                        Compose
                      </Button>
                    </div>
                  </Container>
                  <Stack gap={4}>
                    <Stack direction="horizontal" className="menu-item">
                      <div className="me-auto m-1" onClick={toggleInbox}>
                        Inbox
                      </div>
                      <Badge className="ms-auto m-1">{inboxMessages.length}</Badge>
                    </Stack>
                            <Stack direction="horizontal" className="menu-item">
                            <div className="me-auto m-1" onClick={toggleStar}>
                              Starred
                            </div>
                            <Badge className="ms-auto m-1">{starMessages.length}</Badge>
                      </Stack>
                       <Stack direction="horizontal" className="menu-item">
                            <div className="me-auto m-1" onClick={toggleArchieve}>
                              Archieve
                            </div>
                            <Badge className="ms-auto m-1">{archieveMessages.length}</Badge>
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
                              <FaImages />
                            </div>
                            <div className="ms-auto">Photos</div>
                          </Stack>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Stack direction="horizontal">
                            <div className="me-auto ">
                              <FaFile />
                            </div>
                            <div className="ms-auto">Documents</div>
                          </Stack>
                        </Dropdown.Item>
                        {/* Add other dropdown items as needed */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Col>
              <Col lg={10} x-lg={10}>
                <Mail />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Home;
