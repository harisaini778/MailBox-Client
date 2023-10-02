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
    
    const [starredIsClicked, setStarredIsClicked] = useState(false);
    const [deletedIsClicked, setDeletedIsClicked] = useState(false);
    const [spamIsClicked, setSpamIsClicked] = useState(false);
     const [inboxIsClicked, setInboxIsClicked] = useState(true);
    
      const starMessagesDisplayHandler = () => {
          setStarredIsClicked((prevState) => !prevState); 
          setInboxIsClicked(false);
  };

  const deletedMessagesDisplayHandler = () => {
    setDeletedIsClicked((prevState) => !prevState); // Use 'prevState' here
  };

  const spamMessagesDisplayHandler = () => {
    setSpamIsClicked((prevState) => !prevState); // Use 'prevState' here
  };

  const inboxMessagesDisplayHandler = () => {
      setInboxIsClicked((prevState) => !prevState); 
      setStarredIsClicked(false);
  };

const toggleStarredHandler = (id) => {
  setAllMessages((prevMessages) =>
    prevMessages.map((message) => {
      if (message.id === id) {
        const updatedMessage = { ...message, starred: !message.starred };

        if (updatedMessage.starred) {
          setStarredMessages((prevStarredMessages) => [
            ...prevStarredMessages,
            updatedMessage,
          ]);
        } else {
          setStarredMessages((prevStarredMessages) =>
            prevStarredMessages.filter((msg) => msg.id !== id)
          );
        }

        return updatedMessage;
      }
      return message;
    })
  );
};

const deletedMessagesHandler = (id) => {
  setAllMessages((prevMessages) =>
    prevMessages.filter((message) => message.id !== id)
  );

  // Remove the deleted message from starredMessages if it exists
  setStarredMessages((prevStarredMessages) =>
    prevStarredMessages.filter((msg) => msg.id !== id)
  );

  // Add the deleted message to deletedMessages if it exists
  const deletedMessage = allMessages.find((message) => message.id === id);
  if (deletedMessage) {
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
      starredIsClicked,
      deletedIsClicked,
      spamIsClicked,
      inboxIsClicked,
      starMessagesDisplayHandler,
      deletedMessagesDisplayHandler,
      spamMessagesDisplayHandler,
      inboxMessagesDisplayHandler,
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
