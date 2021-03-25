import React, { Component } from "react";
import Message from "./Message";
import messages from "../apis/messages";

const selection = {
  all: "fa-check-square-o",
  some: "fa-minus-square-o",
  none: "fa-square-o",
};

class MessageList extends Component {
  state = {
    selectionStatus: null,
    messages: messages,
  };

  componentDidMount() {
    this.handleSelectionStatus();
  }

  handleSelectionStatus = () => {
    const statuses = this.state.messages.map((message) => message.isSelected);
    const allSelected = statuses.every((status) => status);
    const noneSelected = statuses.every((status) => !status);

    if (allSelected) {
      this.setState({ selectionStatus: selection.all });
    } else if (noneSelected) {
      this.setState({ selectionStatus: selection.none });
    } else {
      this.setState({ selectionStatus: selection.some });
    }
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
