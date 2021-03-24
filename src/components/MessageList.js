import React, { Component } from "react";
import Message from "./Message";
import messages from "../apis/messages";

const selectionStatus = {
  all: null,
  some: null,
  none: null,
};

class MessageList extends Component {
  state = {
    selectionStatus: selectionStatus.null,
    messages: messages,
  };

  render = () =>
    this.state.messages.map((message) => (
      <Message
        key={message.id}
        subject={message.subject}
        isRead={message.isRead}
        isStarred={message.isStarred}
        isSelected={message.isSelected}
        labels={message.labels}
      />
    ));
}

export default MessageList;
