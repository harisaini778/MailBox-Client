import React, { createContext, useContext, useState,useEffect,useMemo } from "react";
//import messages from "./Messages";

const MessageContext = createContext();

export const useMessageContext = () => {
  return useContext(MessageContext);
};

export const MessageContextProvider = ({ children }) => {


  const [allMessages, setAllMessages] = useState([
  {
    id: 1,
    sender: 'John Doe',
    subject: 'Hello',
    body: 'Hi there, how are you?',
    date: '2023-10-01T10:30:00Z',
    starred: false,
    unread: false,
    labels: ['Work'],
  },
  {
    id: 2,
    sender: 'Jane Smith',
    subject: 'Meeting Tomorrow',
    body: 'Don\'t forget our meeting at 10 AM.',
    date: '2023-09-30T15:45:00Z',
    starred: false,
    unread: false,
    labels: ['Work'],
  },
  {
    id: 3,
    sender: 'Alice Johnson',
    subject: 'Vacation Photos',
    body: 'Check out the photos from our vacation!',
    date: '2023-09-29T08:15:00Z',
    starred: false,
    unread: false,
    labels: ['Personal'],
  },
  // Add more messages here
  {
    id: 4,
    sender: 'Bob Brown',
    subject: 'Project Update',
    body: 'The project is progressing well. Here is the latest update.',
    date: '2023-09-28T16:20:00Z',
    starred: false,
    unread: false,
    labels: ['Work'],
  },
  {
    id: 5,
    sender: 'Eva White',
    subject: 'Weekend Plans',
    body: 'Let\'s catch up this weekend. What time works for you?',
    date: '2023-09-28T09:45:00Z',
    starred: false,
    unread: false,
    labels: ['Personal'],
  },
  {
    id: 6,
    sender: 'David Lee',
    subject: 'Important Announcement',
    body: 'Please read this important announcement carefully.',
    date: '2023-09-27T14:30:00Z',
    starred: false,
    unread: false,
    labels: ['Important'],
  },
  {
    id: 7,
    sender: 'Sarah Adams',
    subject: 'Re: Reunion Party',
    body: 'I can\'t wait for the reunion party. It\'s going to be so much fun!',
    date: '2023-09-26T18:55:00Z',
    starred: false,
    unread: false,
    labels: ['Personal'],
  },
  {
    id: 8,
    sender: 'Michael Johnson',
    subject: 'Monthly Report',
    body: 'Attached is the monthly report for your review.',
    date: '2023-09-26T11:10:00Z',
    starred: false,
    unread: false,
    labels: ['Work'],
  },
  {
    id: 9,
    sender: 'Emily Davis',
    subject: 'Re: Weekend Getaway',
    body: 'That sounds like a great plan! I\'m in!',
    date: '2023-09-25T09:30:00Z',
    starred: false,
    unread: false,
    labels: ['Personal'],
  },
  {
    id: 10,
    sender: 'Mark Smith',
    subject: 'Urgent: Meeting Rescheduled',
    body: 'The meeting has been rescheduled to 2 PM today.',
    date: '2023-09-24T15:00:00Z',
    starred: false,
    unread: false,
    labels: ['Urgent'],
  },
  // Add more messages here
  ]);
  
  const [starredMessages, setStarredMessages] = useState([]);
  const [deletedMessages, setDeletedMessages] = useState([]);
  const [spamMessages, setSpamMessages] = useState([]);
  const [archieveMessages, setArchieveMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [savedDraftMessages, setSavedDraftMessages] = useState([]);





    const [starredIsClicked, setStarredIsClicked] = useState(false);
    const [deletedIsClicked, setDeletedIsClicked] = useState(false);
    const [spamIsClicked, setSpamIsClicked] = useState(false);
    const [inboxIsClicked, setInboxIsClicked] = useState(true);
  const [archieveIsClicked, setArchieveIsClicked] = useState(false);
  const [sentIsClicked, setSentIsClicked] = useState(false);
  const [draftIsClicked, setDraftIsClicked] = useState(false);
    const [isMessageDetailOpen, setIsMessageDetailOpen] = useState(false);


  const acrhieveMessagesDisplayHandler = () => {
    setArchieveIsClicked((prevState) => !prevState);
    setInboxIsClicked(false); 
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDeletedIsClicked(false);
    setDraftIsClicked(false);
    setSpamIsClicked(false);
    setSentIsClicked(false);
  }
  
  const starMessagesDisplayHandler = () => {
        
    setStarredIsClicked((prevState)=>!prevState);
    setInboxIsClicked(false); 
    setIsMessageDetailOpen(false);
    setDeletedIsClicked(false);
    setDraftIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
    setSentIsClicked(false);
  };

  const deletedMessagesDisplayHandler = () => {
    setDeletedIsClicked((prevState)=>!prevState);
    setInboxIsClicked(false); 
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDraftIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
    setSentIsClicked(false);
  };

  const spamMessagesDisplayHandler = () => {
    setSpamIsClicked((prevState)=>!prevState);
    setInboxIsClicked(false); 
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDeletedIsClicked(false);
    setDraftIsClicked(false);
    setArchieveIsClicked(false);
    setSentIsClicked(false);
    
  };

  const inboxMessagesDisplayHandler = () => {
    setInboxIsClicked((prevState) => !prevState); 
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDeletedIsClicked(false);
    setDraftIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
    setSentIsClicked(false);
  };

  const sentMessagesDisplayHandler = () => {
    setSentIsClicked((prevState)=>!prevState);
    setInboxIsClicked(false); 
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDeletedIsClicked(false);
    setDraftIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
  };


  const draftMessagesDisplayHandler = () => {

    setDraftIsClicked((prevState)=>!prevState);
    setInboxIsClicked(false); 
    setIsMessageDetailOpen(false);
    setStarredIsClicked(false);
    setDeletedIsClicked(false);
    setArchieveIsClicked(false);
    setSpamIsClicked(false);
    setSentIsClicked(false);
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
  setAllMessages((prevMessages) => {
    const updatedMessages = prevMessages.map((message) => {
      if (message.id === id) {
        return { ...message, starred: !message.starred };
      }
      return message;
    });

    // Determine the updated starred messages in a single pass
    const updatedStarredMessages = updatedMessages.filter((message) => message.starred);

    setStarredMessages(updatedStarredMessages);

    return updatedMessages;
  });
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
  
const messageDetailDisplayHandler = () => {
    setIsMessageDetailOpen((prevState)=>!prevState);
  };

  const contextValue = useMemo(
  () => {
    const fetchData = async () => {
      const userName = localStorage.getItem('userName');
      
      try {
        const sentResponse = await fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/store/${userName}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const sentData = await sentResponse.json();
        console.log('sent message data is: ', sentData);
        if (sentData) {
          setSentMessages(sentData);
        }
        
        const draftResponse = await fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/draft/${userName}.json`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const draftData = await draftResponse.json();
        console.log('draft message data is: ', draftData);
        if (draftData) {
          setSavedDraftMessages(draftData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData(); // Fetch data when the context is created.

    return {
      messages : allMessages,
      starredMessages,
      deletedMessages,
      archieveMessages,
      spamMessages,
      sentMessages,
      savedDraftMessages,
      starredIsClicked,
      deletedIsClicked,
      spamIsClicked,
      inboxIsClicked,
      archieveIsClicked,
      sentIsClicked,
      draftIsClicked,
      isMessageDetailOpen,
      setInboxIsClicked,
      starMessagesDisplayHandler,
      deletedMessagesDisplayHandler,
      spamMessagesDisplayHandler,
      inboxMessagesDisplayHandler,
      acrhieveMessagesDisplayHandler,
      sentMessagesDisplayHandler,
      draftMessagesDisplayHandler,
      markAsReadHandler,
      markAsUnreadHandler,
      markAsSpamHandler,
      deletedMessagesHandler,
      toggleStarredHandler,
      archieveMessagesHandler,
      messageDetailDisplayHandler,
    };
  },
  [
    allMessages,
    starredMessages,
    deletedMessages,
    archieveMessages,
    spamMessages,
    sentMessages,
    savedDraftMessages,
    starredIsClicked,
    deletedIsClicked,
    spamIsClicked,
    inboxIsClicked,
    archieveIsClicked,
    sentIsClicked,
    draftIsClicked,
    isMessageDetailOpen,
    setInboxIsClicked,
    starMessagesDisplayHandler,
    deletedMessagesDisplayHandler,
    spamMessagesDisplayHandler,
    inboxMessagesDisplayHandler,
    acrhieveMessagesDisplayHandler,
    sentMessagesDisplayHandler,
    draftMessagesDisplayHandler,
    markAsReadHandler,
    markAsUnreadHandler,
    markAsSpamHandler,
    deletedMessagesHandler,
    toggleStarredHandler,
    archieveMessagesHandler,
    messageDetailDisplayHandler,
  ]
);

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;
