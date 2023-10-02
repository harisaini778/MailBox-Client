// OverlayDetails.js
import React from "react";
import { Container, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { MdDelete, MdSnooze, MdArchive, MdMarkEmailRead } from "react-icons/md";
import { BsList } from "react-icons/bs";
import { useMessageContext } from "./MessageContextProvider";

const OverlayDetails = ({ messageId }) => {
  const ctx = useMessageContext();

  const handleDelete = () => {
    // Call the delete handler from the context provider
    ctx.deletedMessagesHandler(messageId);
  };

  const icons = [
    { icon: <MdDelete onClick={handleDelete} />, name: "Delete" },
    { icon: <MdSnooze />, name: "Snooze" },
    { icon: <MdArchive />, name: "Archive" },
    { icon: <MdMarkEmailRead />, name: "Mark as Read" },
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
