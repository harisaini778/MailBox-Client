import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useMessageContext } from "./MessageContextProvider";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import your icons
import OverlayDetails from "./Overlay"; // Import your Overlay component
import "./InboxContent.css";
import InboxMessageDetails from "./InboxMessageDetails";

const InboxContent = () => {
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [listIsClicked, setListIsClicked] = useState(false);
  const ctx = useMessageContext();
  const messages = ctx.messages; // Assuming messages are available from the context

  const handleListItemClick = (messageId) => {
    setSelectedMessageId(messageId);
    setListIsClicked((prevState) => !prevState);
  };

  return (
    <Container className="mt-3">
            {selectedMessageId && <InboxMessageDetails messageId={selectedMessageId} />}
      {!listIsClicked && <ListGroup>
        {messages.map((message) => (
          <ListGroup.Item
            key={message.id}
            className={message.unread ? "unread" : ""}
            onClick={() => handleListItemClick(message.id)}
          >
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={1}>
                {message.starred ? (
                  <FaStar className="starred-icon" />
                ) : (
                  <FaRegStar className="starred-icon" />
                )}
              </Col>
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
              {/* Add more columns or information as needed */}
              <Col>
                {/* Example: Display message date */}
                {new Date(message.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Col>
              <Col>
                {/* Example: Display message labels */}
                {message.labels.map((label) => (
                  <span key={label} className="label">
                    {label}
                  </span>
                ))}
              </Col>
              <Col>
                {/* Example: Display overlay button */}
                <OverlayDetails messageId={message.id} />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>}
    </Container>
  );
};

export default InboxContent;
