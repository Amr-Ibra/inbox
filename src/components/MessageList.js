import React, { Component } from "react";
import Message from "./Message";

const selectionStatus = {
  all: null,
  some: null,
  none: null,
};

const messages = [
  {
    id: 1,
    subject: "Here is some message text that has a bunch of stuff 3",
    isRead: false,
    isStarred: false,
    isSelected: false,
    labels: [],
  },
  {
    id: 2,
    subject: "Here is some message text that has a bunch of stuff 1",
    isRead: false,
    isStarred: false,
    isSelected: false,
    labels: [],
  },
  {
    id: 3,
    subject: "Here is some message text that has a bunch of stuff 2",
    isRead: false,
    isStarred: false,
    isSelected: false,
    labels: [],
  },
];

class MessageList extends Component {
  state = {
    selectionStatus: selectionStatus.null,
    messages: messages,
  };

  render = () =>
    this.state.messages.map((message) => (
      <Message key={message.id} subject={message.subject} />
    ));
}

export default MessageList;
