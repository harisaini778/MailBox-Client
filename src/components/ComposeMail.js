//ComposeMail.js 

import React, { useRef, useEffect,useState } from 'react';
import { Form, Container, Row, Col, InputGroup, Dropdown,Button } from 'react-bootstrap';
import { MdDelete, MdDrafts, MdSend, MdArrowBack } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { fetchSentMessages, setToSent } from "../store/dataStore";
import { setId } from '../store/dataStore';
import { useSelector,useDispatch } from 'react-redux';
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

  const dispatch = useDispatch("");
  const toRef = useRef(null);
  const ccBccValueRef = useRef(null);
  const ccBccOption = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const emailId = localStorage.getItem("email");
    const parts = emailId.split("@");
    const Name = parts[0];
    setUserName(Name);
    localStorage.setItem("userName", Name); // Update local storage with the correct username
  }, []);



  const handleHomeRender = () => {
    clearFormFields();
    navigate("/Home");
    
  }

  const uniqueId = Math.floor(Math.random() * 100 + 1);

  const handleSendClick = () => {
    
    const to = toRef.current.value;
    const parts = to.split("@");
    const recipientName = parts[0];
    localStorage.setItem("recipientName", recipientName);
    const ccBccOption = "cc"; // Default to CC
    const ccBccValue = ccBccValueRef.current.value;
    const subject = subjectRef.current.value;
    const message = messageRef.current.value;
    const userName = localStorage.getItem("userName");
    const emailIdUser = localStorage.getItem("email");
    const isoDateTime = new Date().toISOString();
    
      //dispatch(setToSent(to));
     // dispatch(setId(uniqueId));
    

    const emailKey = `email_${recipientName}_${uniqueId}`;

    const emailData = {
      from : emailIdUser,
      to,
      ccBccOption,
      ccBccValue,
      subject,
      message,
      id: uniqueId,
      date: isoDateTime,
    };

    // Save the email data in Firebase with the unique key
    fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/emails/${recipientName}/${emailKey}.json`, {
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
          //alert('Your mail has been sent successfully!');
          //clearFormFields();
          console.log('Email data sent to Firebase:', data);
        }
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('An error occurred while sending the email. Please try again later.');
      });


      
    const sentKey = `email_${userName}_${uniqueId}`;
    
       fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/sent/${userName}/${sentKey}.json`, {
      method: 'PUT', 
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
    toRef.current.value = '';
    ccBccValueRef.current.value = '';
    subjectRef.current.value = '';
    messageRef.current.getEditor().setText('');
  };
    
  const handleDraftClick = () => {
  
     const to = toRef.current.value;
    const ccBccOption = "cc"; // Default to CC
    const ccBccValue = ccBccValueRef.current.value;
    const subject = subjectRef.current.value;
    const message = messageRef.current.value;
    //const userName = localStorage.getItem("userName");
    const isoDateTime = new Date().toISOString();
    const uniqueId = Math.floor(Math.random() * 100 + 1);


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
    toRef.current.value = '';
    ccBccValueRef.current.value = '';
    subjectRef.current.value = '';
    messageRef.current.getEditor().setText('');
    };
    
}

    return (
    <Container className="mt-3">
      <Row className="mb-2">
        <Col>
          <Button variant="light" className="d-flex align-items-center" onClick={handleHomeRender}>
            <MdArrowBack /> Back to Inbox
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="to">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="email"
                placeholder="Recipient email"
                ref={toRef}
              />
            </Form.Group>
            <Form.Group controlId="ccBcc">
              <Form.Label>CC/BCC</Form.Label>
              <InputGroup>
                <Dropdown onSelect={(eventKey) => { /* Handle CC/BCC change here */ }}>
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
                  placeholder={`${"CC"} email`}
                  ref={ccBccValueRef}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email subject"
                ref={subjectRef}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactQuill
            theme="snow"
            ref={messageRef}
            modules={modules}
            formats={formats}
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between">
          <InputGroup>
            <Button variant="light" onClick={handleHomeRender}>
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