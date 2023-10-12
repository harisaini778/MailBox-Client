import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import OverlayDetails from "./Overlay";
import InboxMessageDetails from "./InboxMessageDetails";
import { toggleMessageDetail, fetchAllMessages } from "../store/dataStore";
import { setSearchQuery, toggleStarred } from "../store/dataStore";
import "./InboxContent.css";

const InboxContent = () => {
  const [isSmaller, setIsSmaller] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const searchQuery = useSelector((state) => state.dataStore.searchQuery);
  const selectAll = useSelector((state) => state.dataStore.selectAll);

  const messages = useSelector((state) => state.dataStore.allMessages);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMessages());
  }, [dispatch]);

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
    dispatch(toggleMessageDetail());
  };

  const filteredMessages = messages.filter((message) => {
    return message.to.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleStar = (messageId, event) => {
    event.stopPropagation();
    dispatch(toggleStarred(messageId));
  };

  return (
    <Container className="mt-3">
      {selectedMessageId && isMessageDetailOpen && (
        <InboxMessageDetails messageId={selectedMessageId} />
      )}
      {!isMessageDetailOpen && (
        <ListGroup className="message-list">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={message.unread ? "unread list-item" : "list-item"}
              onClick={() => handleListItemClick(message.id)}
            >
              <Row>
                <Col xs={1}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                  />
                </Col>
                {!isSmaller && (
                  <Col xs={1}>
                    <div
                      onClick={(event) => toggleStar(message.id, event)}
                      className="star-icon-container"
                    >
                      {message.starred ? (
                        <FaStar className="starred-icon" style={{ color: "gold", cursor: "pointer" }} />
                      ) : (
                        <FaRegStar className="starred-icon" />
                      )}
                    </div>
                  </Col>
                )}
                <Col className="truncate-text">
                  <h style={{ fontWeight: message.unread ? "normal" : "bold" }}>
                    {message.from}
                  </h>
                </Col>
                <Col className="truncate-text">
                  <h style={{ fontWeight: message.unread ? "normal" : "bold" }}>
                    {message.subject}
                  </h>
                </Col>
                <Col>
                  {new Date(message.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Col>
                <Col>
                  <div onClick={(event) => event.stopPropagation()}>
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
