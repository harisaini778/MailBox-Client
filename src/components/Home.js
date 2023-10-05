import React, { useState, useEffect } from "react";
import { Form, Navbar, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Stack, Badge, Dropdown, Offcanvas } from "react-bootstrap";
import { FaSearch, FaImages, FaFile, FaMoneyBill, FaTags, FaPlane } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Mail from "./Mail";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "./MessageContextProvider";
import "./Home.css";

const Home = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const ctx = useMessageContext();
  const { messages, deletedMessages, spamMessages, archieveMessages, sentMessages, savedDraftMessages, unreadMessages } = ctx;
  const inboxCount = messages.length;
  const starredCount = messages.filter((message) => message.starred).length;
  const deletedCount = deletedMessages.length;
  const spamCount = spamMessages.length;
  const archieveCount = archieveMessages.length;
  const sentCount = Object.values(sentMessages).length;
  const draftCount = Object.values(savedDraftMessages).length;
  const unreadCount = unreadMessages.length;

  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleComposeRender = () => {
    navigate("/ComposeMail");
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const handleMenuClick = (handler) => {
    toggleShow();
    handler();
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
                    {isSmaller && <Button onClick={toggleShow} variant="light"><BsList size={20} /></Button>}
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
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Some Title</Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Container>
                          <div className="d-grid">
                            <Button variant="primary" size="md" className="m-3" onClick={handleComposeRender}>Compose</Button>
                          </div>
                        </Container>
                        <Stack gap={4}>
                          {[
                            { label: "Inbox", handler: ctx.inboxMessagesDisplayHandler, count: inboxCount },
                            { label: "Unread", handler: ctx.unreadMessagesDisplayHandler, count: unreadCount },
                            { label: "Starred", handler: ctx.starMessagesDisplayHandler, count: starredCount },
                            { label: "Drafts", handler: ctx.draftMessagesDisplayHandler, count: draftCount },
                            { label: "Sent", handler: ctx.sentMessagesDisplayHandler, count: sentCount },
                            { label: "Archive", handler: ctx.acrhieveMessagesDisplayHandler, count: archieveCount },
                            { label: "Spam", handler: ctx.spamMessagesDisplayHandler, count: spamCount },
                            { label: "Deleted Items", handler: ctx.deletedMessagesDisplayHandler, count: deletedCount },
                          ].map((item, index) => (
                            <Stack direction="horizontal" className="menu-item" key={index}>
                              <div className="me-auto m-1" onClick={() => handleMenuClick(item.handler)}>{item.label}</div>
                              <Badge className="ms-auto m-1">{item.count}</Badge>
                            </Stack>
                          ))}
                        </Stack>
                        <div className="d-flex justify-content-center">
                          <Dropdown className="mt-2">
                            <Dropdown.Toggle variant="primary" id="dropdown-split-basic" className="m-2">
                              View more
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {[
                                { label: "Photos", icon: <FaImages /> },
                                { label: "Documents", icon: <FaFile /> },
                                { label: "Subscriptions", icon: <FaMoneyBill /> },
                                { label: "Deals", icon: <FaTags /> },
                                { label: "Travel", icon: <FaPlane /> },
                              ].map((item, index) => (
                                <Dropdown.Item key={index}>
                                  <Stack direction="horizontal">
                                    <div className="me-auto ">{item.icon}</div>
                                    <div className="ms-auto">{item.label}</div>
                                  </Stack>
                                </Dropdown.Item>
                              ))}
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
              <Col lg={2} x-lg={2} className="bg-light" style={{ minHeight: "100vh" }}>
                <div>
                  <Container>
                    <div className="d-grid">
                      <Button variant="primary" size="md" className="m-3" onClick={handleComposeRender}>Compose</Button>
                    </div>
                  </Container>
                  <Stack gap={4}>
                    {[
                      { label: "Inbox", handler: ctx.inboxMessagesDisplayHandler, count: inboxCount },
                      { label: "Unread", handler: ctx.unreadMessagesDisplayHandler, count: unreadCount },
                      { label: "Starred", handler: ctx.starMessagesDisplayHandler, count: starredCount },
                      { label: "Drafts", handler: ctx.draftMessagesDisplayHandler, count: draftCount },
                      { label: "Sent", handler: ctx.sentMessagesDisplayHandler, count: sentCount },
                      { label: "Archive", handler: ctx.acrhieveMessagesDisplayHandler, count: archieveCount },
                      { label: "Spam", handler: ctx.spamMessagesDisplayHandler, count: spamCount },
                      { label: "Deleted Items", handler: ctx.deletedMessagesDisplayHandler, count: deletedCount },
                    ].map((item, index) => (
                      <Stack direction="horizontal" className="menu-item" key={index}>
                        <div className="me-auto m-1" onClick={() => handleMenuClick(item.handler)}>{item.label}</div>
                        <Badge className="ms-auto m-1">{item.count}</Badge>
                      </Stack>
                    ))}
                  </Stack>
                  <div className="d-flex justify-content-center">
                    <Dropdown className="mt-2">
                      <Dropdown.Toggle variant="primary" id="dropdown-split-basic" className="m-2">
                        View more
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {[
                          { label: "Photos", icon: <FaImages /> },
                          { label: "Documents", icon: <FaFile /> },
                          { label: "Subscriptions", icon: <FaMoneyBill /> },
                          { label: "Deals", icon: <FaTags /> },
                          { label: "Travel", icon: <FaPlane /> },
                        ].map((item, index) => (
                          <Dropdown.Item key={index}>
                            <Stack direction="horizontal">
                              <div className="me-auto ">{item.icon}</div>
                              <div className="ms-auto">{item.label}</div>
                            </Stack>
                          </Dropdown.Item>
                        ))}
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
