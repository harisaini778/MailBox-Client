import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row, Col, Stack } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchSentMessages } from '../store/dataStore'; 
import { toggleMessageDetail } from '../store/dataStore';
import SentboxMessagesDetails from './SentboxMessagesDetail';

const SentMessages = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);
  const sentMessages = useSelector((state) => state.dataStore.sentMessages); 
  const sent = Object.values(sentMessages);
  const dispatch = useDispatch(); 

    const handleListItemClick = (messageId) => {
    setSelectedMessageId(messageId);
    dispatch(toggleMessageDetail());
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    dispatch(fetchSentMessages(userName));
  }, [dispatch]);

  function stripHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  return (
    <Container className="mt-3">
      
       {selectedMessageId && isMessageDetailOpen && (
        <SentboxMessagesDetails messageId={selectedMessageId} sent={sent} />
      )}
      {!isMessageDetailOpen && <ListGroup>
        {sent.map((message) => (
    <ListGroup.Item
    key={message.id}
  className={message.unread ? "unread list-item" : "list-item"}
  onClick={() => handleListItemClick(message.id)}
>
  <Row>
    <Col>
      <input type="checkbox" />
    </Col>
    <Col style={{ fontWeight: 'bold' }} className="truncate-text-sent">
      To: {message.to}
    </Col>
    {!isSmaller && (
      <Col>
        <Stack direction="horizontal" gap="1">
          <span>{message.ccBccOption} : </span>
          <span>{message.ccBccValue}</span>
        </Stack>
      </Col>
    )}
    <Col style={{ fontWeight: 'bold' }} className="truncate-text-sent">
      {message.subject}
    </Col>
    <Col className="truncate-text-sent">
      {stripHtmlTags(message.message)}
    </Col>
  </Row>
</ListGroup.Item>
        ))}
      </ListGroup>}
    </Container>
  );
};

export default SentMessages;
