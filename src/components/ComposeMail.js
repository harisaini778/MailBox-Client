import React, { useState,useEffect } from 'react';
import { Form, Container, Row, Col, InputGroup, Dropdown,Button } from 'react-bootstrap';
import { MdDelete, MdDrafts, MdSend, MdArrowBack } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
//import { v4 as uuidv4 } from "uuid";

// Define custom modules for the Quill toolbar
const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ 'header': '1' }, { 'header': '2' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    [{ 'align': [] }],
    ['clean'],
  ],
};

// Define custom formats for the Quill editor
const formats = [
  'font',
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
  'align',
];


function ComposeMail() {

  const [to, setTo] = useState('');
  const [ccBccOption, setCCBCCOption] = useState('cc'); // Default to CC
  const [ccBccValue, setCcBccValue] = useState("");
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const emailId = localStorage.getItem("email");
    const parts = emailId.split("@");
    const Name = parts[0];
    setUserName(Name);
    localStorage.setItem("userName", Name); // Update local storage with the correct username
  }, []);

  
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     return (
  //       setCurrentDateTime( currentDateTime => currentDateTime || new Date())
  //     );
  //   }, 1000)

  //   return (
  //     clearInterval(intervalId)
  //   );
    
  
  //}, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const isoDateTime = currentDateTime ? currentDateTime.toISOString() : null;

  const handleHomeRender = () => {
    navigate("/Home");
  }

  const uniqueId = Math.floor(Math.random() * 100 + 1);

  const handleSendClick = () => {
    // Generate a unique key for the new email
    const emailKey = `email_${userName}_${uniqueId}`;

    const emailData = {
      to,
      ccBccOption,
      ccBccValue,
      subject,
      message,
      id: uniqueId,
      date: isoDateTime,
    };

    // Save the email data in Firebase with the unique key
    fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/emails/${userName}/${emailKey}.json`, {
      method: 'PUT', // Use PUT to ensure the same key is overwritten
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty('error')) {
          console.log('Error:', data.error.message);
          alert(data.error.message);
        } else {
          alert('Your mail has been sent successfully!');
          clearFormFields();
          console.log('Email data sent to Firebase:', data);
        }
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email. Please try again later.');
      });
  };

  const clearFormFields = () => {
    setTo('');
    setCCBCCOption('cc');
    setCcBccValue('');
    setSubject('');
    setMessage('');
  };
    
  const handleDraftClick = () => {
    // Generate a unique key for the draft email
    const draftKey = `draft_${userName}_${uniqueId}`;

    const draftData = {
      to,
      ccBccOption,
      ccBccValue,
      subject,
      message,
      id: uniqueId,
      date: isoDateTime,
    };

    // Save the draft email data in Firebase with the unique key
    fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/drafts/${userName}/${draftKey}.json`, {
      method: 'PUT', // Use PUT to ensure the same key is overwritten
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(draftData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty('error')) {
          console.log('Error:', data.error.message);
          alert(data.error.message);
        } else {
          alert('Your mail has been saved as a draft successfully!');
          clearFormFields();
          console.log('Draft data sent to Firebase:', data);
        }
      })
      .catch((error) => {
        console.error('Error saving draft:', error);
        alert('An error occurred while saving the draft. Please try again later.');
      });
    
    const clearFormFields = () => {
      setTo('');
      setCCBCCOption('cc');
      setCcBccValue('');
      setSubject('');
      setMessage('');
    };
  }

    return (
      <Container className="mt-3">
        <Row className="mb-2">
          <Col>
            <Button variant="light" className="d-flex align-items-center" onClick={handleHomeRender}
            >
              <MdArrowBack /> Back to Inbox
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form >
              <Form.Group controlId="to">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Recipient email"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="ccBcc">
                <Form.Label>CC/BCC</Form.Label>
                <InputGroup>
                  <Dropdown onSelect={(eventKey) => setCCBCCOption(eventKey)}>
                    <Dropdown.Toggle variant="light">
                      {ccBccOption === 'cc' ? 'CC' : 'BCC'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="cc">CC</Dropdown.Item>
                      <Dropdown.Item eventKey="bcc">BCC</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Form.Control
                    type="email"
                    placeholder={`${ccBccOption === 'cc' ? 'CC' : 'BCC'} email`}
                    value={ccBccValue}
                    onChange={(e) => setCcBccValue(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactQuill
              theme="snow"
              value={message}
              onChange={setMessage}
              modules={modules}
              formats={formats}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between">
            <InputGroup>
              <Button variant="light">
                <MdDelete /> Delete
              </Button>
              <Button variant="light" onClick={handleDraftClick}>
                <MdDrafts /> Save as Draft
              </Button>
              <Button variant="primary" onClick={handleSendClick}>
                <MdSend /> Send
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }

export default ComposeMail;