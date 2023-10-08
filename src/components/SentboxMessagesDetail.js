// SentboxMessagesDetail.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { markAsRead, toggleMessageDetail } from "../store/dataStore";


const SentboxMessagesDetails = ({ messageId,sent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the sentMessages state using useSelector
  // const sent = useSelector((state) => state.dataStore.sentMessages);

  const message = sent.find((msg) => msg.id === messageId);

  if (!message) {
    return null;
  }
   if (message) {
     console.log("sentbox message is :", message);
  }

  const handleBackClick = () => {
    dispatch(toggleMessageDetail());
    dispatch(markAsRead(messageId));
    navigate("/Home");
  };

  return (
    <div className="message-detail">
      <Container fluid>
        <Row>
          <Col>
            <Button
              variant="light"
              className="back-button"
              onClick={handleBackClick}
            >
              <FaArrowLeft />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>{message.subject}</h3>
            <p className="message-sender">
              To: {message.to} -{" "}
              {new Date(message.date).toLocaleString()}
            </p>
            <div className="message-body">{message.message}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SentboxMessagesDetails;
