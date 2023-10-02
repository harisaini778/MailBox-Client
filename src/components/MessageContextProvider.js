import React, { createContext, useContext, useState } from "react";
import messages from "./Messages";

const MessageContext = createContext();

export const useMessageContext = () => {
  return useContext(MessageContext);
};

export const MessageContextProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([...messages]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [spamMessages, setSpamMessages] = useState([]);

  const toggleStarredHandler = (id) => {
    setAllMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, starred: !message.starred } : message
      )
    );
  };

  const deletedMessagesHandler = (id) => {
    const deletedMessage = allMessages.find((message) => message.id === id);

    if (deletedMessage) {
      setAllMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
      setDeletedMessages((prevDeletedMessages) => [
        ...prevDeletedMessages,
        deletedMessage,
      ]);
    }
  };

  const markAsSpamHandler = (id) => {
    const spamMessage = allMessages.find((message) => message.id === id);

    if (spamMessage) {
      setAllMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
      setSpamMessages((prevSpamMessages) => [...prevSpamMessages, spamMessage]);
    }
  };

  const markAsReadHandler = (id) => {
    setAllMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, unread: false } : message
      )
    );
  };

  const markAsUnreadHandler = (id) => {
    setAllMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, unread: true } : message
      )
    );
  };

  const contextValue = {
    messages: allMessages,
    starredMessages,
    deletedMessages,
    spamMessages,
    markAsReadHandler,
    markAsUnreadHandler,
    markAsSpamHandler,
    deletedMessagesHandler,
    toggleStarredHandler,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
