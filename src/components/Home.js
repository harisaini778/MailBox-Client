import React, { useState,useEffect } from "react";
import { Form, Navbar, Nav, Button, InputGroup, Row, Col, Container } from "react-bootstrap";
import { Stack,Badge,Dropdown,Offcanvas} from "react-bootstrap";
import { FaSearch, FaImages, FaFile, FaMoneyBill, FaTags, FaPlane} from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Mail from "./Mail";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "./MessageContextProvider";
import "./Home.css"


const Home = () => {
  
    const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow(!show);
    const navigate = useNavigate();
  
    const ctx = useMessageContext();
    const message = ctx.messages;
    const inboxCount = message.length;
    const starred = ctx.messages.filter((message) => message.starred);
    const starredCount = starred.length;
    const deleted = ctx.deletedMessages;
    const deletedCount = deleted.length;
    const spam = ctx.spamMessages;
    const spamCount = spam.length;
    const archieve = ctx.archieveMessages;
    const archieveCount = archieve.length;
    const sent = Object.values(ctx.sentMessages);
    const sentCount = sent.length;
    const draft = Object.values(ctx.savedDraftMessages);
    const draftCount = draft.length;
    const unread = ctx.unreadMessages;
    const unreadCount = unread.length;

    const inboxDisplayHandler = () => {
        ctx.inboxMessagesDisplayHandler();
    }

    const unreadDisplayHandler = () => {
        ctx.unreadMessagesDisplayHandler();
    }

    const starDisplayHandler = () => {
        ctx.starMessagesDisplayHandler();
    }

    const draftDisplayHandler = () => {
        ctx.draftMessagesDisplayHandler();
    }

    const sentDisplayHandler = () => {
        ctx.sentMessagesDisplayHandler();
    }

    const archieveDisplayHandler = () => {
        ctx.acrhieveMessagesDisplayHandler();
    }

    const spamDisplayHandler = () => {
        ctx.spamMessagesDisplayHandler();
    }

    const deleteDisplayHandler = () => {
        ctx.deletedMessagesDisplayHandler();
    }

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
    }
   

    return (<div style={{minHeight:"100vh",overflowX:"hidden"}}>
        <Navbar variant="dark" className="bg-primary" expand="lg">
            <Container>
                
                <Navbar.Brand>
                    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet"/>
                    <h1 style={{fontFamily:"Dancing Script,cursive",fontSize:isSmaller ? "3.0rem":"3.3rem"}}>Hemrix Mail!</h1>    
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                <div>
                <Form inline>
                  <InputGroup>
                    <Form.Control
                      placeholder='Find messages, documents, photos or people'
                      type="search"
                      style={{width:isSmaller? "70vw" : "40vw"}}
                    />
                    <InputGroup.Text className="justify-content-center" style={{width:isSmaller? "auto" : "5vw"}}> 
                      {isSmaller && <Button onClick={toggleShow} variant="light">
                        <BsList size={20} />
                      </Button>}
                        <FaSearch  size={isSmaller ?  20 : 26} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
                    </div>                 
          </Navbar.Collapse>


                </Container>
        </Navbar>
        <div>
            <Container fluid>
                {isSmaller ? <Row>
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
                                                <div className="me-auto m-1" onClick={inboxDisplayHandler}
                                                >Inbox</div>
                                                <Badge className="ms-auto m-1">{inboxCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal"  className="menu-item">
                                                <div className="me-auto m-1" onClick={unreadDisplayHandler} >Unread</div>
                                                <Badge className="ms-auto m-1">{unreadCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal" className="menu-item">
                                                <div className="me-auto m-1"
                                                onClick={starDisplayHandler}>Starred</div>
                                                <Badge className="ms-auto m-1">{starredCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal" className="menu-item">
                                                <div className="me-auto m-1" onClick={draftDisplayHandler}>Drafts</div>
                                                <Badge className="ms-auto m-1">{draftCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal" className="menu-item">
                                                <div className="me-auto m-1" onClick={sentDisplayHandler}>Sent</div>
                                                <Badge className="ms-auto m-1">{sentCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal" className="menu-item">
                                                <div className="me-auto m-1" onClick={archieveDisplayHandler}>Archieve</div>
                                                <Badge className="ms-auto m-1">{archieveCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal" className="menu-item">
                                                <div className="me-auto m-1"  onClick={spamDisplayHandler}>Spam</div>
                                                <Badge className="ms-auto m-1">{spamCount}</Badge>
                                            </Stack>
                                            <Stack direction="horizontal" className="menu-item">
                                                <div className="me-auto m-1" onClick={deleteDisplayHandler}>Deleted Items</div>
                                                <Badge className="ms-auto m-1">{deletedCount}</Badge>
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
                                                    <Dropdown.Item>
                                                        <Stack direction="horizontal">
                                                            <div className="me-auto ">
                                                                <FaMoneyBill />
                                                            </div>
                                                            <div className="ms-auto">Subscriptions</div>
                                                        </Stack>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Stack direction="horizontal">
                                                            <div className="me-auto ">
                                                                <FaTags />
                                                            </div>
                                                            <div className="ms-auto">Deals</div>
                                                        </Stack>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Stack direction="horizontal">
                                                            <div className="me-auto ">
                                                                <FaPlane />
                                                            </div>
                                                            <div className="ms-auto">Travel</div>
                                                        </Stack>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                        </Stack>   
                    </Col>
                    <Col className="justify-content-center">
                  <Mail/>
                    </Col>

                </Row> :
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
                                        <div className="me-auto m-1" onClick={inboxDisplayHandler}
                                        >
                                            Inbox</div>
                                        <Badge className="ms-auto m-1">{inboxCount }</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1" onClick={unreadDisplayHandler}  >Unread</div>
                                        <Badge className="ms-auto m-1">{unreadCount}</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1" onClick={starDisplayHandler}
                                        >Starred</div>
                                        <Badge className="ms-auto m-1">{starredCount}</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1" onClick={draftDisplayHandler}>Drafts</div>
                                        <Badge className="ms-auto m-1">{draftCount}</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1" onClick={sentDisplayHandler}>Sent</div>
                                        <Badge className="ms-auto m-1">{sentCount}</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1"  onClick={archieveDisplayHandler}>Archieve</div>
                                        <Badge className="ms-auto m-1">{archieveCount}</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1" onClick={spamDisplayHandler}>Spam</div>
                                        <Badge className="ms-auto m-1">{spamCount}</Badge>
                                    </Stack>
                                    <Stack direction="horizontal" className="menu-item">
                                        <div className="me-auto m-1" onClick={deleteDisplayHandler}>Deleted Items</div>
                                        <Badge className="ms-auto m-1">{deletedCount}</Badge>
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
                                            <Dropdown.Item>
                                                <Stack direction="horizontal">
                                                    <div className="me-auto ">
                                                        <FaMoneyBill />
                                                    </div>
                                                    <div className="ms-auto">Subscriptions</div>
                                                </Stack>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Stack direction="horizontal">
                                                    <div className="me-auto ">
                                                        <FaTags />
                                                    </div>
                                                    <div className="ms-auto">Deals</div>
                                                </Stack>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <Stack direction="horizontal">
                                                    <div className="me-auto ">
                                                        <FaPlane />
                                                    </div>
                                                    <div className="ms-auto">Travel</div>
                                                </Stack>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </Col>
                        <Col lg={10} x-lg={10}>
                            <Mail />
                        </Col>
                    </Row>}
            </Container>
        </div>
    </div>)
}
export default Home;