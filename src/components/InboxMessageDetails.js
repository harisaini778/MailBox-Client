import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import {
  markAsRead, 
  toggleMessageDetail,allMessages,
} from "../store/dataStore"; 
import "./InboxMessageDetail.css"; 

const InboxMessageDetails = ({ messageId }) => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 


  const message = useSelector((state) =>
    state.dataStore.allMessages.find((msg) => msg.id === messageId)
  );

  if (!message) {
    return null; 
  }

  const handleBackClick = () => {
   
    dispatch(toggleMessageDetail());
    dispatch(markAsRead(messageId));
    navigate("/Home"); 
  };

  const stripHtmlTags = (message) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = message;
    return newDiv.textContent || newDiv.innerText;
  };

  return (
    <div className="message-detail">
      <Container fluid>
        <Row>
          <Col>
            <Button
              variant="light"
              className="back-button"
              onClick={handleBackClick}
            >
              <FaArrowLeft />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <h5> Subject : {message.subject}</h5>
            <p className="message-sender">
              From: {message.from} -{" "}
              {new Date(message.date).toLocaleString()}
            </p>
            <div className="message-body">{message.body}</div>
          </Col>
        </Row>
        <Row>
          <Col>
                 <div className="message-message">{stripHtmlTags(message.message)}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InboxMessageDetails;
