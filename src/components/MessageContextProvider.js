import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [savedDraftMessages, setSavedDraftMessages] = useState([]);
  const [unreadMessages, setUnReadMessages] = useState([]);
  const [starredIsClicked, setStarredIsClicked] = useState(false);
  const [deletedIsClicked, setDeletedIsClicked] = useState(false);
  const [spamIsClicked, setSpamIsClicked] = useState(false);
  const [inboxIsClicked, setInboxIsClicked] = useState(true);
  const [archieveIsClicked, setArchieveIsClicked] = useState(false);
  const [sentIsClicked, setSentIsClicked] = useState(false);
  const [draftIsClicked, setDraftIsClicked] = useState(false);
  const [isMessageDetailOpen, setIsMessageDetailOpen] = useState(false);
  const [unreadIsClicked, setUnreadIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/store/${userName}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('sent message data is: ', data);
        if (data) {
          setSentMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const fetchData = async () => {
      try {
        const response = await fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/draft/${userName}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('draft message data is: ', data);
        if (data) {
          setSavedDraftMessages(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const resetAllClickStates = () => {
    setInboxIsClicked(false);
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDeletedIsClicked(false);
    setDraftIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
    setSentIsClicked(false);
    setUnreadIsClicked(false);
  };

  const toggleDisplayHandler = (stateSetter) => {
    resetAllClickStates();
    stateSetter(true);
  };

  const toggleStarredHandler = (id) => {
    setAllMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((message) => {
        if (message.id === id) {
          const updatedMessage = { ...message, starred: !message.starred };
          if (updatedMessage.starred) {
            setStarredMessages((prevStarredMessages) => [...prevStarredMessages, updatedMessage]);
          } else {
            setStarredMessages((prevStarredMessages) => prevStarredMessages.filter((msg) => msg.id !== id));
          }
          return updatedMessage;
        }
        return message;
      });
      return updatedMessages;
    });
  };

  const deletedMessagesHandler = (id) => {
    setAllMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    setStarredMessages((prevStarredMessages) => prevStarredMessages.filter((msg) => msg.id !== id));
    const deletedMessage = allMessages.find((message) => message.id === id);
    if (deletedMessage) {
      setDeletedMessages((prevDeletedMessages) => [...prevDeletedMessages, deletedMessage]);
    }
  };

  const markAsSpamHandler = (id) => {
    const spamMessage = allMessages.find((message) => message.id === id);
    if (spamMessage) {
      setAllMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
      setSpamMessages((prevSpamMessages) => [...prevSpamMessages, spamMessage]);
    }
  };

  const markAsReadHandler = (id) => {
    setAllMessages((prevMessages) =>
      prevMessages.map((message) => (message.id === id ? { ...message, unread: true } : message))
    );
  };

  useEffect(() => {
    const unreadMessages = allMessages.filter((message) => !message.unread);
    setUnReadMessages(unreadMessages);
  }, [allMessages]);

  const messageDetailDisplayHandler = () => {
    setIsMessageDetailOpen((prevState) => !prevState);
  };

  const contextValue = {
    messages: allMessages,
    starredMessages,
    deletedMessages,
    archieveMessages,
    spamMessages,
    sentMessages,
    savedDraftMessages,
    unreadMessages,
    starredIsClicked,
    deletedIsClicked,
    spamIsClicked,
    inboxIsClicked,
    archieveIsClicked,
    sentIsClicked,
    draftIsClicked,
    isMessageDetailOpen,
    unreadIsClicked,
    setInboxIsClicked,
    unreadMessagesDisplayHandler: () => toggleDisplayHandler(setUnreadIsClicked),
    starMessagesDisplayHandler: () => toggleDisplayHandler(setStarredIsClicked),
    deletedMessagesDisplayHandler: () => toggleDisplayHandler(setDeletedIsClicked),
    spamMessagesDisplayHandler: () => toggleDisplayHandler(setSpamIsClicked),
    inboxMessagesDisplayHandler: () => toggleDisplayHandler(setInboxIsClicked),
    acrhieveMessagesDisplayHandler: () => toggleDisplayHandler(setArchieveIsClicked),
    sentMessagesDisplayHandler: () => toggleDisplayHandler(setSentIsClicked),
    draftMessagesDisplayHandler: () => toggleDisplayHandler(setDraftIsClicked),
    markAsReadHandler,
    markAsSpamHandler,
    deletedMessagesHandler,
    toggleStarredHandler,
    archieveMessagesHandler: (id) => {
      const archieves = allMessages.find((message) => message.id === id);
      if (archieves) {
        setArchieveMessages((prevArchieveMessages) => [...prevArchieveMessages, archieves]);
        setAllMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
      }
    },
    messageDetailDisplayHandler,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {isLoading ? <div>Loading...</div> : children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
