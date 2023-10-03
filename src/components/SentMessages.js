// SentMessages.js

import React from 'react';
import { Container,ListGroup,Row,Col,Stack } from 'react-bootstrap';
import { useMessageContext } from './MessageContextProvider';
import "./SentMessages.css";

const SentMessages = () => {
  const ctx = useMessageContext();
    const messages = Object.values(ctx.sentMessages);
    
function stripHtmlTags(html) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

  return (
    <Container className="mt-3">
      <ListGroup>
        {messages.map((message) => (
          <ListGroup.Item key={message.id} className={message.unread ? 'unread' : ''}>
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={3} style={{fontWeight:"bold"}} className='truncate-text-sent'>
               To : {message.to}
              </Col>
                    <Col xs={4}>
                        <Stack direction='horizontal' gap="1">
                            <span>{message.ccBccOption} : </span>
                            <span>{message.ccBccValue}</span>
                        </Stack>        
              </Col>
              <Col xs={2} style={{fontWeight:"bold"}} className='truncate-text-sent'>
               {message.subject}
              </Col>
              <Col xs={1} className='truncate-text-sent'>
               {stripHtmlTags(message.message)};
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SentMessages;
