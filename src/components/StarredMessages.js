import React from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; 
import { FaStar } from "react-icons/fa";
import {
  toggleStarred,
  toggleMessageDetail,
} from "../store/dataStore"; 
 

// const StarredMessages = () => {
//   const dispatch = useDispatch();

//   const starredMessages = useSelector((state) =>
//     state.dataStore.allMessages.filter((message) => message.starred)
//   );

//   const handleStarClick = (messageId) => {
//     dispatch(toggleStarred(messageId));
//   };

//   const handleRowClick = (messageId) => {
//     dispatch(toggleMessageDetail(messageId));
//   };

//   return (
//     <Container className="mt-3">
//       <ListGroup>
//         {starredMessages.map((message) => (
//           <ListGroup.Item
//             key={message.id}
//             className={message.unread ? "unread" : ""}
//             onClick={() => handleRowClick(message.id)}
//           >
//             <Row>
//               <Col xs={1}>
//                 <input type="checkbox" />
//               </Col>
//               <Col xs={1}>
//                 <FaStar
//                   style={{ color: "gold",cursor:"pointer" }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleStarClick(message.id);
//                   }}
//                 />
//               </Col>
//               <Col xs={3}>{message.sender}</Col>
//               <Col xs={4}>{message.subject}</Col>
//               <Col xs={2}>
//                 {new Date(message.date).toLocaleTimeString()}
//               </Col>
//               <Col xs={1}>
//                 {message.labels.map((label) => (
//                   <span key={label} className="label">
//                     {label}
//                   </span>
//                 ))}
//               </Col>
//             </Row>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>
//     </Container>
//   );
// };

// ... (other imports)

const StarredMessages = () => {
  const dispatch = useDispatch();

  const starredMessages = useSelector((state) =>
    state.dataStore.allMessages.filter((message) => message.starred)
  );

  const handleStarClick = (messageId) => {
    dispatch(toggleStarred(messageId));
  };

  const handleRowClick = (messageId) => {
    dispatch(toggleMessageDetail(messageId));
  };

  return (
    <Container className="mt-3">
      <ListGroup>
        {starredMessages.map((message) => (
          <ListGroup.Item
            key={message.id}
            className={message.unread ? "unread" : ""}
            onClick={() => handleRowClick(message.id)}
          >
            <Row>
              <Col xs={1}>
                <input type="checkbox" />
              </Col>
              <Col xs={1}>
                <FaStar
                  style={{ color: "gold", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStarClick(message.id);
                  }}
                />
              </Col>
              <Col xs={3}>{message.sender}</Col>
              <Col xs={4}>{message.subject}</Col>
              <Col xs={2}>
                {new Date(message.date).toLocaleTimeString()}
              </Col>
              <Col xs={1}>
                {Array.isArray(message.labels)
                  ? message.labels.map((label) => (
                      <span key={label} className="label">
                        {label}
                      </span>
                    ))
                  : null}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

//export default StarredMessages;


export default StarredMessages;
