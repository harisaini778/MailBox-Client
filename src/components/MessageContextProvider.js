import React, { createContext, useContext, useState,useEffect } from "react";
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
  const [sentMessages, setSentMessages] = useState([]);




    const [starredIsClicked, setStarredIsClicked] = useState(false);
    const [deletedIsClicked, setDeletedIsClicked] = useState(false);
    const [spamIsClicked, setSpamIsClicked] = useState(false);
    const [inboxIsClicked, setInboxIsClicked] = useState(true);
  const [archieveIsClicked, setArchieveIsClicked] = useState(false);
    const [sentIsClicked, setSentIsClicked] = useState(false);



      useEffect(() => {
    // Fetch sent messages data here and set it in sentMessages state
    const userName = localStorage.getItem('userName');
    fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/store/${userName}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('sent message data is: ', data);
        if (data) {
          setSentMessages(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


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

    const sentMessagesDisplayHandler = () => {
      setSentIsClicked((prevState) => !prevState); 
    setStarredIsClicked(false);
      setDeletedIsClicked(false);
      setInboxIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
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
        message.id === id ? { ...message, unread: true } : message
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
    sentMessages,
      starredIsClicked,
      deletedIsClicked,
      spamIsClicked,
    inboxIsClicked,
    archieveIsClicked,
      sentIsClicked,
      starMessagesDisplayHandler,
      deletedMessagesDisplayHandler,
      spamMessagesDisplayHandler,
    inboxMessagesDisplayHandler,
    acrhieveMessagesDisplayHandler,
      sentMessagesDisplayHandler,
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
