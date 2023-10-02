import React, { useState,useEffect } from "react";
import { ListGroup, Container, Row, Col, Overlay } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useMessageContext } from "./MessageContextProvider";
import OverlayDetails from "./Overlay";
import "./InboxContent.css";

const InboxContent = () => {

  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  const ctx = useMessageContext();

  const message = ctx.messages;

    useEffect(() => {
    const handleResize = () => {
      setIsSmaller(window.innerWidth <= 576);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    }, []);

  
  return (
    <Container className="mt-3">
      <ListGroup>
        {message.map((message) => (
          <ListGroup.Item key={message.id} className={message.unread ? 'unread' : ''}>
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={1} onClick={() => ctx.toggleStarredHandler(message.id)}>
                {message.starred ? <FaStar /> : <FaRegStar />}
              </Col>
              <Col className="truncate-text">
                <h style={{fontWeight:"bold"}}>{message.sender}</h>
              </Col>

              <Col className="truncate-text">
                <h style={{fontWeight:"bold"}}>{message.subject}</h>
              </Col>
             
              {!isSmaller && <Col className="truncate-text">
                {message.body}
              </Col>}

             { !isSmaller && <Col>
              {new Date(message.date).toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
               })}
              </Col>}


              {!isSmaller && <Col>
                {message.labels.map((label) => (
                  <span key={label} className="label">{label}</span>
                ))}
              </Col>}

              <Col>
                <OverlayDetails/>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

    export default InboxContent;
