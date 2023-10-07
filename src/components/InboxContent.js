import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { FaStar, FaRegStar } from "react-icons/fa";
import OverlayDetails from "./Overlay";
import "./InboxContent.css";
import InboxMessageDetails from "./InboxMessageDetails";
import { toggleMessageDetail } from "../store/dataStore";
import { toggleStarred } from "../store/dataStore";
import { searchQuery } from "../store/dataStore";
import { setSearchQuery } from "../store/dataStore";
import { selectAll } from "../store/dataStore";



const InboxContent = () => {
  const [isSmaller, setIsSmaller] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const searchQuery = useSelector((state) => state.dataStore.searchQuery);
  const selectAll = useSelector((state) => state.dataStore.selectAll);

  // Use Redux selectors to get data from the store
  const messages = useSelector((state) => state.dataStore.allMessages);
  const isMessageDetailOpen = useSelector((state) => state.dataStore.isMessageDetailOpen);

  // Use Redux dispatch to dispatch actions
  const dispatch = useDispatch();


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
    setSearchQuery("");
    dispatch(toggleMessageDetail());
  };

  const filteredMessages = messages.filter((message) => {
    return (
      message.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );
  })

  const toggleStar = (messageId, event) => {
    event.stopPropagation();
    // Dispatch the action to toggle message starred status
    dispatch(toggleStarred(messageId));
  };

  const preventListGroupClick = (event) => {
    event.stopPropagation();
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
                  <input type="checkbox" checked={selectAll} />
                </Col>
                {!isSmaller && (
                  <Col xs={1}>
                    <div
                      onClick={(event) => toggleStar(message.id, event)}
                      className="star-icon-container"
                    >
                      {message.starred ? (
                        <FaStar className="starred-icon" style={{color:"gold",cursor:"pointer"}}/>
                      ) : (
                        <FaRegStar className="starred-icon" />
                      )}
                    </div>
                  </Col>
                )}
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
                {!isSmaller && (
                  <Col>
                    {new Date(message.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Col>
                )}
                {!isSmaller && (
                  <Col>
                    {message.labels.map((label) => (
                      <span key={label} className="label">
                        {label}
                      </span>
                    ))}
                  </Col>
                )}
                <Col>
                  <div onClick={(event) => preventListGroupClick(event)}>
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
