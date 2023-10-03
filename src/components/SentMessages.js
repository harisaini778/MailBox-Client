// SentMessages.js

import React from 'react';
import { Container,ListGroup,Row,Col,Stack } from 'react-bootstrap';
import { useMessageContext } from './MessageContextProvider';

const SentMessages = () => {
  const ctx = useMessageContext();
  const messages = Object.values(ctx.sentMessages);

  return (
    <Container className="mt-3">
      <ListGroup>
        {messages.map((message) => (
          <ListGroup.Item key={message.id} className={message.unread ? 'unread' : ''}>
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={3}>
                {message.to}
              </Col>
                    <Col xs={4}>
                        <Stack direction='horizontal' gap="1">
                            <span>{message.ccBccOption} : </span>
                            <span>{message.ccBccValue}</span>
                        </Stack>        
              </Col>
              <Col xs={2}>
               {message.subject}
              </Col>
              <Col xs={1}>
                {message.message}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SentMessages;
