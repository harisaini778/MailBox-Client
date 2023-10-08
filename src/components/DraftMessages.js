import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Row, Col, Stack } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchDraftMessages } from '../store/dataStore'; 
import { toggleMessageDetail } from '../store/dataStore';
import DraftboxMessages  from './DraftBoxMessages';
import "./SentMessages.css";

const DraftMessages = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);
  const draftMessages = useSelector((state) => state.dataStore.draftMessages); 
  const draft = Object.values(draftMessages);
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
    dispatch(fetchDraftMessages(userName));
  }, [dispatch]);

  function stripHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  return (
    <Container className="mt-3">
      
       {selectedMessageId && isMessageDetailOpen && (
        <DraftboxMessages messageId={selectedMessageId} draft={draft} />
      )}
      {!isMessageDetailOpen && <ListGroup>
        {draft.map((message) => (
    <ListGroup.Item
    key={message.id}
  onClick={() => handleListItemClick(message.id)}
>
  <Row className=''>
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

export default DraftMessages;
