import { createSlice } from "@reduxjs/toolkit";
import messages from "../components/Messages";

const initialState = {
  sentMessages: [],
  draftMessages: [],
  allMessages: [...messages], // You can populate this with the initial data
  starredMessages: [],
  deletedMessages: [],
  spamMessages: [],
  archiveMessages: [],
  inboxMessages: [...messages],
  isMessageDetailOpen: false,
  unreadMessages: [],
    inboxIsClicked: false,
    starIsClicked: false,
  archieveIsClicked : false,
};

const dataStore = createSlice({
  name: "dataStore",
  initialState,
  reducers: {
    setSentMessages: (state, action) => {
      state.sentMessages = action.payload;
    },
    setDraftMessages: (state, action) => {
      state.draftMessages = action.payload;
    },
    toggleStarred: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        state.allMessages[messageIndex].starred = !state.allMessages[
          messageIndex
        ].starred;

        if (state.starredMessages.includes(messageId)) {
          state.starredMessages = state.starredMessages.filter(
            (msgId) => msgId !== messageId
          );
        } else {
          state.starredMessages.push(messageId);
        }
      }
    },
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        const deletedMessage = state.allMessages[messageIndex];
        state.allMessages.splice(messageIndex, 1);
        state.deletedMessages.push(deletedMessage);
        state.starredMessages = state.starredMessages.filter(
          (msgId) => msgId !== messageId
        );
      }
    },
    markAsSpam: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        const spamMessage = state.allMessages[messageIndex];
        state.allMessages.splice(messageIndex, 1);
        state.spamMessages.push(spamMessage);
      }
    },
    markAsRead: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        state.allMessages[messageIndex].unread = false;
      }
    },
    markAsUnread: (state, action) => {
      const messageId = action.payload;
      const message = state.allMessages.find(
        (message) => message.id === messageId
      );
      if (message) {
        state.unreadMessages.push(message);
      }
    },
    archiveMessage: (state, action) => {
      const messageId = action.payload;
      const messageIndex = state.allMessages.findIndex(
        (message) => message.id === messageId
      );
      if (messageIndex !== -1) {
        const archiveMessage = state.allMessages[messageIndex];
        state.allMessages.splice(messageIndex, 1);
        state.archiveMessages.push(archiveMessage);
      }
    },
    toggleStarredMessages: (state) => {
      state.starredMessages = [];
    },
    toggleDeletedMessages: (state) => {
      state.deletedMessages = [];
    },
    toggleSpamMessages: (state) => {
      state.spamMessages = [];
    },
    toggleArchiveMessages: (state) => {
      state.archiveMessages = [];
    },
    toggleSentMessages: (state) => {
      state.sentMessages = [];
    },
    toggleDraftMessages: (state) => {
      state.draftMessages = [];
    },
    toggleMessageDetail: (state) => {
      state.isMessageDetailOpen = !state.isMessageDetailOpen;
      },
      toggleInboxIsClicked: (state) => {
          state.inboxIsClicked = !state.inboxIsClicked;
          state.starIsClicked = false;
          state.archieveIsClicked = false;
    },
      toggleStarIsClicked: (state) => {
          state.starIsClicked = !state.starIsClicked;
          state.inboxIsClicked = false;
          state.archieveIsClicked = false;
      },
      toggleArchieveIsClicked: (state) => {
          state.archieveIsClicked = !state.archieveIsClicked;
          state.starIsClicked = false;
          state.inboxIsClicked = false;
    },
    toggleUnreadMessages: (state) => {
      state.unreadMessages = [];
    },
  },
});

export const {
  setSentMessages,
  setDraftMessages,
  toggleStarred,
    deleteMessage,
  inboxMessages,
  markAsSpam,
  markAsRead,
  markAsUnread,
    archiveMessage,
    archiveMessages,
    inboxIsClicked,
    starIsClicked,
   archieveIsClicked,
  toggleStarredMessages,
  toggleDeletedMessages,
  toggleSpamMessages,
  toggleInboxMessages,
  toggleArchiveMessages,
  toggleSentMessages,
  toggleDraftMessages,
  toggleMessageDetail,
  toggleUnreadMessages,
    toggleInboxIsClicked,
    toggleStarIsClicked,
    toggleArchieveIsClicked,
  
} = dataStore.actions;
export default dataStore.reducer;
