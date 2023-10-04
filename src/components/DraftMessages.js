import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row, Col, Stack } from 'react-bootstrap';
import { useMessageContext } from './MessageContextProvider';
import './DraftMessages.css';

const DraftMessages = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);

  const ctx = useMessageContext();
  const messages = Object.values(ctx.savedDraftMessages);

  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
              <Col>
                <input type="checkbox" />
              </Col>
              <Col style={{ fontWeight: 'bold' }} className="truncate-text-draft">
                To: {message.to}
              </Col>
              {!isSmaller && (
                <Col>
                  <Stack direction="horizontal" gap="1">
                    <span>{message.ccBccOption} :</span>
                    <span>{message.ccBccValue}</span>
                  </Stack>
                </Col>
              )}
              <Col style={{ fontWeight: 'bold' }} className="truncate-text-draft">
                {message.subject}
              </Col>
              <Col className="truncate-text-draft">
                {stripHtmlTags(message.message)}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default DraftMessages;
