import React from "react";
import { useState,useEffect} from "react";
import "./Inbox.css";
import { Container, Row, Col,Stack } from "react-bootstrap";
import { FaUser,FaTag,FaComments } from "react-icons/fa";
import InboxContent from "./InboxContent";
import StarredMessages from "./StarredMessages";
import { useMessageContext } from "./MessageContextProvider";


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
        <div className="m-3">
      <Container className="m-2">
        <Row >
          <Col sm={3} lg={2} style={{width: isSmaller ? "auto" : "auto"}}>
                        <Stack direction="horizontal" gap="2" className="heading_hover">
                            <span ><FaUser/></span>
                            <h style={{ textAlign: "center",fontSize: isSmaller ? "1rem" : "1.2rem" }}
                        > Primary</h> 
            </Stack>
          </Col>
          <Col  sm={3} lg={2} style={{width: isSmaller ? "auto" : "auto"}}>
                        <Stack direction="horizontal"  gap="2" className="heading_hover">
                            <span><FaTag/></span>
                            <h style={{ textAlign: "center",fontSize: isSmaller ? "1rem" : "1.2rem",
                            }}
                            > Promotions</h>  
            </Stack>
          </Col>
          <Col  sm={3} lg={2} style={{width: isSmaller ? "auto" : "auto"}} >
                            <Stack direction="horizontal" gap="2" className="heading_hover">
                            <span><FaComments/></span>
                            <h style={{ textAlign: "center", fontSize: isSmaller ?  "1rem" : "1.2rem" }}
                           >Social</h>  
            </Stack>

          </Col>
        </Row>
        </Container>
       {ctx.inboxIsClicked &&  <InboxContent/>} 
        {ctx.starredIsClicked && <StarredMessages/>}
    </div>);

}
export default Inbox;