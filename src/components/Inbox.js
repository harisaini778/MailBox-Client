import React from "react";
import { useState,useEffect} from "react";
import "./Inbox.css";
import { Container, Row, Col,Stack } from "react-bootstrap";
import { FaUser,FaTag,FaComments } from "react-icons/fa";
import InboxContent from "./InboxContent";
import StarredMessages from "./StarredMessages";
import DeletedMessages from "./DeletedMessages";
import { useMessageContext } from "./MessageContextProvider";
import SpamMessages from "./SpamMessages";
import ArchieveMessages from "./ArchieveMessages";
import SentMessages from "./SentMessages";
import DraftMessages from "./DraftMessages";
import UnreadMessages from "./UnreadMessgaes";

const Inbox = () => {

  const [isSmaller, setIsSmaller] = useState(window.innerWidth <= 576);
  
  const ctx = useMessageContext();
    
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
        <div>
      <Container>
        <Row className={isSmaller && "justify-content-center"}>
          <Col sm={3} lg={2} style={{width: isSmaller ? "auto" : "auto"}}>
                        <Stack direction="horizontal" gap="3" className="heading_hover">
                            <span ><FaUser/></span>
                            <h style={{ textAlign: "center",fontSize: isSmaller ? "1rem" : "1.2rem" }}
                        > Primary</h> 
            </Stack>
          </Col>
          <Col  sm={3} lg={2} style={{width: isSmaller ? "auto" : "auto"}}>
                        <Stack direction="horizontal"  gap="3" className="heading_hover">
                            <span><FaTag/></span>
                            <h style={{ textAlign: "center",fontSize: isSmaller ? "1rem" : "1.2rem",
                            }}
                            > Promotions</h>  
            </Stack>
          </Col>
          <Col  sm={3} lg={2} style={{width: isSmaller ? "auto" : "auto"}} >
                            <Stack direction="horizontal" gap="3" className="heading_hover">
                            <span><FaComments/></span>
                            <h style={{ textAlign: "center", fontSize: isSmaller ?  "1rem" : "1.2rem" }}
                           >Social</h>  
            </Stack>

          </Col>
        </Row>
        </Container>
       {ctx.inboxIsClicked &&  <InboxContent/>} 
        {ctx.starredIsClicked && <StarredMessages />}
        {ctx.deletedIsClicked && <DeletedMessages />}
        {ctx.spamIsClicked && <SpamMessages />}
        {ctx.archieveIsClicked && <ArchieveMessages />}
        {ctx.sentIsClicked && <SentMessages />}
        {ctx.draftIsClicked && <DraftMessages />}
        {ctx.unreadIsClicked && <UnreadMessages/>}
    </div>);

}
export default Inbox;