import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import {
  markAsRead, 
  toggleMessageDetail,
} from "../store/dataStore"; 
import "./InboxMessageDetail.css"; 
const InboxMessageDetails = ({ messageId }) => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 


  const message = useSelector((state) =>
    state.dataStore.inboxMessages.find((msg) => msg.id === messageId)
  );

  if (!message) {
    return null; 
  }

  const handleBackClick = () => {
   
    dispatch(toggleMessageDetail());
    dispatch(markAsRead(messageId));
    navigate("/Home"); 
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
            <h3>{message.subject}</h3>
            <p className="message-sender">
              From: {message.sender} -{" "}
              {new Date(message.date).toLocaleString()}
            </p>
            <div className="message-body">{message.body}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InboxMessageDetails;
