import React, { useState } from 'react';
import { Form, Container, Row, Col, InputGroup, Dropdown,Button } from 'react-bootstrap';
import { MdDelete, MdDrafts, MdSend, MdArrowBack } from 'react-icons/md';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

// funtion for generating the unique id

// function generatingUniqueId() {
//   return uuidv4();
// }

function ComposeMail() {

  const [to, setTo] = useState('');
  const [ccBccOption, setCCBCCOption] = useState('cc'); // Default to CC
  const [ccBccValue, setCcBccValue] = useState("");
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState("");

    const emailId = localStorage.getItem("email");


  //const userId = "123"

    const extractUserName = () => {
        if (emailId.includes("@")) {
            const parts = emailId.split("@");
            const userName = parts[0];
            setUserName(userName);
            localStorage.setItem("userName", userName);
        } else {
            setUserName("Invalid Email")
        }
    }

    const handleSendClick = () => {

     extractUserName();
        
    console.log('Sending email with message:', message);

      fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/store/${userName}.json`,
          {
              method: "POST",
              headers: {
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                  to,
                  ccBccOption,
                  ccBccValue,
                  subject,
                  message,
              })
          }).then(
              (response) => {
                  return response.json();
              }
      ).then(
          (data) => {
              if (data.hasOwnProperty("error")) {
                  console.log("error : ", data.error.message);
                  alert(data.error.message);
                  setTo("");
                setCCBCCOption("");
                setCcBccValue("");
                  setSubject("");
                  setMessage("");
              } else {
                  alert("Your mail has been sent successfully!");
                  setTo("");
                  setCCBCCOption("");
                setCcBccValue("");
                  setSubject("");
                  setMessage("");
                console.log("email data sent to firebase : ", data);
                localStorage.setItem("dataId", data.name);
                  // localStorage.removeItem("email");
                  // localStorage.removeItem("token");
              }
            }
      ).catch(
          (error) => {
              console.log("error: ", error);
              }
          )
  };

  const dataId = localStorage.getItem("dataId");
  
const handleDeleteClick = (dataId) => {
  console.log('Deleting email with ID:', dataId);

  // Call the deleteEmail function with the emailIdToDelete parameter
  deleteEmail(dataId);
};

const deleteEmail = (dataId) => {
  fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/store/${userName}/${dataId}.json`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log('Email deleted successfully');
        alert('Email deleted successfully');
        return response.json(); // Return the response data here
      } else {
        console.error('Failed to delete email');
        alert('Failed to delete email');
        throw new Error('Failed to delete email'); // Throw an error to trigger the 'catch' block
      }
    })
    .then((data) => {
      // Handle the response data (if needed)
      console.log("data deleted : ", data);
    })
    .catch((error) => {
      console.error('Error deleting email:', error);
      alert('An error occurred while deleting the email. Please try again later.');
    });
};



  const handleSaveDraftClick = () => {
    console.log('Saving email as draft');
  };

  return (
    <Container className="mt-3">
      <Row className="mb-2">
        <Col>
          <Button variant="light" className="d-flex align-items-center">
            <MdArrowBack /> Back to Inbox
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form id={dataId}>
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
                  onChange={(e)=>setCcBccValue(e.target.value)}
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
 <Button variant="light" onClick={() => handleDeleteClick(dataId)}>
  <MdDelete /> Delete
</Button>
            <Button variant="light">
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
