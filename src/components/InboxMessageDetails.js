import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useMessageContext } from "./MessageContextProvider";
import "./InboxMessageDetail.css"; // Import your custom CSS file for styling


const InboxMessageDetails = ({ messageId }) => {
  const ctx = useMessageContext();
    const message = ctx.messages.find((msg) => msg.id === messageId);

  if (!message) {
    return null; // Message not found, handle this case as needed
  }

  const handleBackClick = () => {
      ctx.closeMessageDetail();
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
