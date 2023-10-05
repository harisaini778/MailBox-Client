import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useMessageContext } from "./MessageContextProvider";


const UnreadMessages = () => {
  const ctx = useMessageContext();
  const archieve = ctx.unreadMessages;

  return (
    <Container className="mt-3">
      <ListGroup>
        {archieve.map((message) => (
          <ListGroup.Item key={message.id} className={message.unread ? 'unread' : ''}>
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
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

export default UnreadMessages;

