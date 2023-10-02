import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useMessageContext } from "./MessageContextProvider";
import { FaRegStar } from "react-icons/fa";

const StarredMessages = () => {
  const ctx = useMessageContext();
  const starredMessages = ctx.messages.filter((message) => message.starred);

  return (
    <Container className="mt-3">
      <ListGroup>
        {starredMessages.map((message) => (
          <ListGroup.Item key={message.id} className={message.unread ? 'unread' : ''}>
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={1}>
                <FaRegStar style={{ color: "yellow" }} />
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

export default StarredMessages;
