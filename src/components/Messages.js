// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setAllMessages } from '../store/dataStore'; // Import the action you want to dispatch

// const Messages = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const senderName = localStorage.getItem("senderName");
//     const readInboxMessage = async () => {
//       try {
//         const response = await fetch(`https://mailbox-client-29c1e-default-rtdb.firebaseio.com/emails/${senderName}.json`);
//         if (response.ok) {
//           const data = await response.json();

//           if (data) {
//             // Convert the object values to an array
//             const messagesArray = Object.values(data);
//             localStorage.setItem("messagesArray", messagesArray);

//             dispatch(setAllMessages(messagesArray)); // Update state with the array
//             console.log("In Inbox data is:", messagesArray);
//           } else {
//             console.log("No messages found in the inbox.");
//           }
//         } else {
//           console.log("Failed to fetch messages data");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     readInboxMessage();
//   }, []);

//   return null; // This component doesn't render anything; it's for data fetching only.
// };

// export default Messages;
