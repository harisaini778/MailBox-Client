// Inbox.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import InboxContent from "./InboxContent";



const Inbox = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);

  const inboxIsClicked = useSelector((state) => state.dataStore.inboxIsClicked);
  // const starredIsClicked = useSelector((state) => state.dataStore.starredIsClicked);
  // const deletedIsClicked = useSelector((state) => state.dataStore.deletedIsClicked);
  // const spamIsClicked = useSelector((state) => state.dataStore.spamIsClicked);
  // const archiveIsClicked = useSelector((state) => state.dataStore.archiveIsClicked);
  // const sentIsClicked = useSelector((state) => state.dataStore.sentIsClicked);
  // const draftIsClicked = useSelector((state) => state.dataStore.draftIsClicked);


  const handleResize = () => {
    setIsSmaller(window.innerWidth <= 576);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div>
      <Container>
        <Row className={isSmaller && "justify-content-center"}>
          <Col sm={3} lg={2} style={{ width: isSmaller ? "auto" : "auto" }}>
            <Stack
              direction="horizontal"
              gap="3"
              className="heading_hover"
              // onClick={handleInboxClick}
            >
              <span>
                <FaUser />
              </span>
              <h
                style={{
                  textAlign: "center",
                  fontSize: isSmaller ? "1rem" : "1.2rem",
                }}
              >
                Primary
              </h>
            </Stack>
          </Col>
          {/* Add similar code for other message categories */}
        </Row>
      </Container>
      {inboxIsClicked && <InboxContent />}
      {/* {starredIsClicked && <StarredMessages />}
      {deletedIsClicked && <DeletedMessages />}
      {spamIsClicked && <SpamMessages />}
      {archiveIsClicked && <ArchieveMessages />}
      {sentIsClicked && <SentMessages />}
      {draftIsClicked && <DraftMessages />} */}
    </div>
  );
};

export default Inbox;
