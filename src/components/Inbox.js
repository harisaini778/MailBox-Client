// Inbox.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import { FaUser,FaTags,FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";
import InboxContent from "./InboxContent";
import StarredMessages from "./StarredMessages";
import ArchiveMessages from "./ArchieveMessages";
import SpamMessages from "./SpamMessages";
import DeletedMessages from "./DeletedMessages";
import SentMessages from "./SentMessages";
import DraftMessages from "./DraftMessages";
import "./Inbox.css";



const Inbox = () => {
  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);

  const inboxIsClicked = useSelector((state) => state.dataStore.inboxIsClicked);
  const starIsClicked = useSelector((state) => state.dataStore.starIsClicked);
  const archieveIsClicked = useSelector((state) => state.dataStore.archieveIsClicked);
  const spamIsClicked = useSelector((state) => state.dataStore.spamIsClicked);
  const deletedIsClicked = useSelector((state) => state.dataStore.deleteIsClicked);
  const sentIsClicked = useSelector((state) => state.dataStore.sentIsClicked);
  const draftIsClicked = useSelector((state) => state.dataStore.draftIsClicked);
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
          <Col sm={3} lg={2} style={{ width: isSmaller ? "auto" : "auto" }}
            className="heading_hover">
                        <Stack direction="horizontal" gap="3" >
                            <span ><FaUser/></span>
                            <h style={{ textAlign: "center",fontSize: isSmaller ? "1rem" : "1.2rem" }}
                        > Primary</h> 
            </Stack>
          </Col>
          <Col sm={3} lg={2} style={{ width: isSmaller ? "auto" : "auto" }}
          className="heading_hover">
                        <Stack direction="horizontal"  gap="3" >
                            <span><FaTags/></span>
                            <h style={{ textAlign: "center",fontSize: isSmaller ? "1rem" : "1.2rem",
                            }}
                            > Promotions</h>  
            </Stack>
          </Col>
          <Col sm={3} lg={2} style={{ width: isSmaller ? "auto" : "auto" }}
          className="heading_hover">
                            <Stack direction="horizontal" gap="3" >
                            <span><FaComments/></span>
                            <h style={{ textAlign: "center", fontSize: isSmaller ?  "1rem" : "1.2rem" }}
                           >Social</h>  
            </Stack>

          </Col>
        </Row>
        </Container>
      {inboxIsClicked && <InboxContent />}
      {starIsClicked && <StarredMessages />}
      {archieveIsClicked && <ArchiveMessages />}
      {spamIsClicked && <SpamMessages />}
      {deletedIsClicked && <DeletedMessages />}
      {sentIsClicked && <SentMessages />}
      {draftIsClicked && <DraftMessages />} 
      {/* {deletedIsClicked && <DeletedMessages />}
      {spamIsClicked && <SpamMessages />}
      {archiveIsClicked && <ArchieveMessages />}
      {sentIsClicked && <SentMessages />}
      {draftIsClicked && <DraftMessages />}  */}
    </div>
  );
};

export default Inbox;
