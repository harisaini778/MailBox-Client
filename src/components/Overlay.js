// OverlayDetails.js
import React from "react";
import { Container, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { MdDelete, MdSnooze, MdArchive, MdMarkEmailRead } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { FaFlag } from "react-icons/fa";
import { useDispatch } from "react-redux"; // Import useDispatch
import {
  deleteMessage,
  markAsSpam,
  archiveMessage,
  markAsRead,
} from "../store/dataStore"; // Replace with your actual reducer path

const OverlayDetails = ({ messageId }) => {
  const dispatch = useDispatch(); // Initialize useDispatch

  const handleDelete = () => {
    dispatch(deleteMessage(messageId)); // Dispatch the delete action
  };

  const markSpam = () => {
    dispatch(markAsSpam(messageId)); // Dispatch the markAsSpam action
  };

  const archiveHandler = () => {
    dispatch(archiveMessage(messageId)); // Dispatch the archiveMessage action
  };

  const readHandler = () => {
    dispatch(markAsRead(messageId)); // Dispatch the markAsRead action
  };

  const icons = [
    { icon: <MdDelete onClick={handleDelete} />, name: "Delete" },
    { icon: <FaFlag onClick={markSpam} />, name: "Mark as Spam" },
    { icon: <MdSnooze />, name: "Snooze" },
    { icon: <MdArchive onClick={archiveHandler} />, name: "Archive" },
    { icon: <MdMarkEmailRead onClick={readHandler} />, name: "Mark as Read" },
  ];

  const iconList = icons.map((iconData, index) => (
    <OverlayTrigger
      key={index}
      placement="bottom"
      overlay={<Tooltip id={`tooltip-${index}`}>{iconData.name}</Tooltip>}
    >
      <div style={{ marginRight: "10px" }}>{iconData.icon}</div>
    </OverlayTrigger>
  ));

  return (
    <Container>
      <OverlayTrigger
        trigger="click"
        placement="left"
        overlay={
          <Popover id="popover-positioned-left">
            <Popover.Body>
              <div style={{ display: "flex" }}>{iconList}</div>
            </Popover.Body>
          </Popover>
        }
      >
        <button className="btn btn-light">
          <BsList />
        </button>
      </OverlayTrigger>
    </Container>
  );
};

export default OverlayDetails;
