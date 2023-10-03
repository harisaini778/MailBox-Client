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
  const [archieveMessages, setArchieveMessages] = useState([]);

    const [starredIsClicked, setStarredIsClicked] = useState(false);
    const [deletedIsClicked, setDeletedIsClicked] = useState(false);
    const [spamIsClicked, setSpamIsClicked] = useState(false);
    const [inboxIsClicked, setInboxIsClicked] = useState(true);
  const [archieveIsClicked, setArchieveIsClicked] = useState(false);

  const acrhieveMessagesDisplayHandler = () => {
    setArchieveIsClicked((prevState) => !prevState);
    setSpamIsClicked(false);
    setDeletedIsClicked(false);
    setInboxIsClicked(false);
    setStarredIsClicked(false);
  }
  
      const starMessagesDisplayHandler = () => {
          setStarredIsClicked((prevState) => !prevState); 
        setInboxIsClicked(false);
        setDeletedIsClicked(false);
  };

  const deletedMessagesDisplayHandler = () => {
    setDeletedIsClicked((prevState) => !prevState);
    setInboxIsClicked(false);
    setStarredIsClicked(false);// Use 'prevState' here
  };

  const spamMessagesDisplayHandler = () => {
    setSpamIsClicked((prevState) => !prevState);
    setDeletedIsClicked(false);
    setInboxIsClicked(false);
    setStarredIsClicked(false);
    
  };

  const inboxMessagesDisplayHandler = () => {
      setInboxIsClicked((prevState) => !prevState); 
    setStarredIsClicked(false);
     setDeletedIsClicked(false);
  };


const archieveMessagesHandler = (id) => {
  const archieves = allMessages.find((message) => message.id === id);

  if (archieves) {
    setArchieveMessages((prevArchieveMessages) => [
      ...prevArchieveMessages,
      archieves, 
    ]);

    setAllMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter((message) => message.id !== id);
      return updatedMessages;
    });
  }
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
    archieveMessages,
    spamMessages,
      starredIsClicked,
      deletedIsClicked,
      spamIsClicked,
    inboxIsClicked,
      archieveIsClicked,
      starMessagesDisplayHandler,
      deletedMessagesDisplayHandler,
      spamMessagesDisplayHandler,
    inboxMessagesDisplayHandler,
      acrhieveMessagesDisplayHandler,
    markAsReadHandler,
    markAsUnreadHandler,
    markAsSpamHandler,
    deletedMessagesHandler,
    toggleStarredHandler,
    archieveMessagesHandler,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
