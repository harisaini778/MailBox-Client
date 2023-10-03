// SentMessages.js

import React from 'react';
import { Container } from 'react-bootstrap';
import { useMessageContext } from './MessageContextProvider';

const SentMessages = () => {
  const ctx = useMessageContext();
  const messages = Object.values(ctx.sentMessages);

  return (
    <Container>
      <h1>Sent Messages</h1>
      {/* Render your list of sent messages here */}
      <ul>
        {messages.map((data, index) => (
          <li key={index}>
            {/* Render individual message content here */}
            <p>Subject: {data.subject}</p>
            <p>To: {data.to}</p>
            <p>Message: {data.message}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default SentMessages;
