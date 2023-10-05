import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useMessageContext } from "./MessageContextProvider";
import { FaStar, FaRegStar } from "react-icons/fa"; 
import OverlayDetails from "./Overlay"; 
import "./InboxContent.css";
import InboxMessageDetails from "./InboxMessageDetails";


const InboxContent = () => {

  const [isSmaller, setIsSmaller] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const ctx = useMessageContext();
  const messages = ctx.messages; 


  useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    }, []);
    

  const handleListItemClick = (messageId) => {
    setSelectedMessageId(messageId);
    ctx.messageDetailDisplayHandler();
  };

  const toggleStar = (messageId, event) => {
    event.stopPropagation(); 
    ctx.toggleStarredHandler(messageId);
  };

  const preventListGroupClick = (event) => {
    event.stopPropagation(); 
  };


  return (
    <Container className="mt-3">
      {selectedMessageId && ctx.isMessageDetailOpen && (
        <InboxMessageDetails messageId={selectedMessageId} />
      )}
      {!ctx.isMessageDetailOpen && (
        <ListGroup className="message-list" >
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.unread ? "unread list-item" : "list-item"}
              onClick={() => handleListItemClick(message.id)}
            >
              <Row>
                <Col xs={1}>
                  <input type="checkbox" />
                </Col>
                {!isSmaller && <Col xs={1}>
                  <div
                    onClick={(event) => toggleStar(message.id, event)}
                    className="star-icon-container"
                  >
                    {message.starred ? (
                      <FaStar className="starred-icon" />
                    ) : (
                      <FaRegStar className="starred-icon" />
                    )}
                  </div>
                </Col>}
                <Col className="truncate-text">
                  <h style={{ fontWeight: message.unread ? "normal" : "bold" }}>
                    {message.sender}
                  </h>
                </Col>
                <Col className="truncate-text">
                  <h style={{ fontWeight: message.unread ? "normal" : "bold" }}>
                    {message.subject}
                  </h>
                </Col>
                {!isSmaller && <Col>
                  {new Date(message.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Col>}
                {!isSmaller && <Col>
                  {message.labels.map((label) => (
                    <span key={label} className="label">
                      {label}
                    </span>
                  ))}
                </Col>}
                <Col>
                  <div onClick={(event)=>preventListGroupClick(event)}>
                    <OverlayDetails messageId={message.id} />
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default InboxContent;

