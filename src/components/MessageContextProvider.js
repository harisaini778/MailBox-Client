import React, { createContext, useContext, useState } from "react";
import messages from "./Messages";


const MessageContext = createContext();

export const useMessageContext = () => {
    return useContext(MessageContext);
};

export const MessageContextProvider = ({ children }) => {

    const [messages, setMessages] = useState([...messages]);
    const [starredMessages, setStarredMessages] = useState([]);
    const [deletedMessages, setDeletedMessages] = useState([]);
    const [spamMessages, setSpamMessages] = useState([]);


    const toggleStarredHandler = (id) => {
        setStarredMessages((prevMessages) => {
            prevMessages.map((message) => {
                message.id === id ? { ...message, starred: !message.starred } : message
            })
        })
    }

    const deletedMessagesHandler = (id) => {
     
        const deletedMessagesFind = messages.find((message) => {
            message.id === id
        });

        if (deletedMessagesFind) {
            setMessages((prevMessages) => {
                prevMessages.filter((message) => { message.id !== id })
            });
            setDeletedMessages((prevDeletedMessages) => {
                [...prevDeletedMessages, deletedMessagesFind]
            })
        }
    }

    const markAsSpamHandler = (id) => {
     
        const spamMessagesFind = messages.find((message) => message.id == id);

        if (spamMessagesFind) {
            
            setMessages((prevMessages) => {
                prevMessages.filter((message) => {
                    message.id !== id
                })
            });

            setSpamMessages((prevSpamMessages) => {
                [...prevSpamMessages, spamMessagesFind]
            })

        }

    }

    const markAsReadHandler = (id) => {
        setMessages((prevMessages) => {
            prevMessages.map((message) => {
                message.id === id ? { ...message, unread: true } : message
            })
        })
    }

    const markAsUnreadHandler = (id) => {
        setMessages((prevMessages) => {
            prevMessages.map((message) => {
                message.id === id ? { ...message, unread: false } : message
            })
        })
    }

    const contextValue = {
        messages,
        starredMessages,
        deletedMessages,
        spamMessages,
        markAsReadHandler,
        markAsUnreadHandler,
        markAsSpamHandler,
        deletedMessagesHandler,
        toggleStarredHandler,
    }

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
    
};

export default MessageContextProvider;

