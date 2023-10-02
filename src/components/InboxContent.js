import React, { useState } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import messages from "./Messages";

const InboxContent = () => {
  const [message, setMessage] = useState([...messages]);


    const toggleStarred = (id) => {
        setMessage((prevMessages) =>
            prevMessages.map((message) =>
                message.id === id ? { ...message, starred: !message.starred } : message
            )
        );
    }
   
 

  return (
    <Container>
      <ListGroup>
        {message.map((message) => (
          <ListGroup.Item key={message.id} className={message.unread ? 'unread' : ''}>
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={1} onClick={() => toggleStarred(message.id)}>
                {message.starred ? <FaStar /> : <FaRegStar />}
              </Col>
              <Col xs={3}>
                {message.sender}
              </Col>
              <Col xs={4}>
                {message.subject}
              </Col>
              <Col xs={2}>
                {new Date(message.date).toLocaleTimeString()}
              </Col>
              <Col xs={1}>
                {message.labels.map((label) => (
                  <span key={label} className="label">{label}</span>
                ))}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

    export default InboxContent;
