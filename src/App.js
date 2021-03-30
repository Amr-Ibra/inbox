import { Component } from "react";
import "./App.css";
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import messages from "./apis/messages";

const flag = {
  all: "fa-check-square-o",
  some: "fa-minus-square-o",
  none: "fa-square-o",
};

class App extends Component {
  state = {
    messages: messages,
    selection: null,
    unreadCount: 0,
    plural: null,
    disabled: false,
  };

  componentDidMount() {
    this.updateOverallSelectionFlag(this.state.messages);
    this.countUnreadMessages(this.state.messages);
  }

  toggleStarring = (id) => {
    const messages = [...this.state.messages];
    const message = messages.find((message) => message.id === id);
    message.starred = !message.starred;
    this.setState({ messages: messages });
  };

  toggleSelection = (id) => {
    const messages = [...this.state.messages];
    const message = messages.find((message) => message.id === id);
    message.selected = !message.selected;
    this.setState({ messages: messages });
    this.updateOverallSelectionFlag(messages);
  };

  toggleOverallSelection = () => {
    const messages = [...this.state.messages];
    if (this.state.selection === flag.all) {
      messages.forEach((message) => (message.selected = false));
      this.setState({ messages: messages });
    } else if (
      this.state.selection === flag.none ||
      this.state.selection === flag.some
    ) {
      messages.forEach((message) => (message.selected = true));
      this.setState({ messages: messages });
    }
    this.updateOverallSelectionFlag(messages);
  };

  updateOverallSelectionFlag(messages) {
    const statuses = messages.map((message) => message.selected);
    const allSelected = statuses.every((status) => status);
    const allUnselected = statuses.every((status) => !status);
    if (allSelected) this.setState({ selection: flag.all, disabled: false });
    else if (allUnselected)
      this.setState({ selection: flag.none, disabled: true });
    else this.setState({ selection: flag.some, disabled: false });
  }

  markAsRead = () => {
    const messages = [...this.state.messages];
    messages.forEach((message) => {
      if (message.selected && !message.read) message.read = true;
    });
    this.setState({ messages: messages });
    this.countUnreadMessages(messages);
  };

  markAsUnread = () => {
    const messages = [...this.state.messages];
    messages.forEach((message) => {
      if (message.selected && message.read) message.read = false;
    });
    this.setState({ messages: messages });
    this.countUnreadMessages(messages);
  };

  deleteMessage = () => {
    const messages = [...this.state.messages];
    const retainedMessages = messages.filter((message) => !message.selected);
    this.setState({ messages: retainedMessages });
    this.updateOverallSelectionFlag(retainedMessages);
    this.countUnreadMessages(retainedMessages);
  };

  countUnreadMessages(messages) {
    const unreadMessages = messages.filter((message) => !message.read);
    const unreadCount = unreadMessages.length;
    this.setState({ unreadCount: unreadCount });
    if (unreadCount === 1) this.setState({ plural: null });
    else this.setState({ plural: "s" });
  }

  applyLabel = (e) => {
    const labelToAdd = e.target.value;
    const messages = [...this.state.messages];
    messages.forEach((message) => {
      if (message.selected && !message.labels.includes(labelToAdd))
        message.labels.push(labelToAdd);
    });
    e.target.selectedIndex = 0;
    this.setState({ messages: messages });
  };

  removeLabel = (e) => {
    const labelToRemove = e.target.value;
    const messages = [...this.state.messages];
    messages.forEach((message) => {
      if (message.selected && message.labels.includes(labelToRemove)) {
        const retainedLabels = message.labels.filter(
          (label) => label !== labelToRemove
        );
        message.labels = retainedLabels;
      }
    });
    e.target.selectedIndex = 0;
    this.setState({ messages: messages });
  };

  render = () => (
    <div>
      <Toolbar
        unreadCount={this.state.unreadCount}
        plural={this.state.plural}
        selection={this.state.selection}
        disabled={this.state.disabled}
        toggleOverallSelection={this.toggleOverallSelection}
        markAsRead={this.markAsRead}
        markAsUnread={this.markAsUnread}
        deleteMessage={this.deleteMessage}
        applyLabel={this.applyLabel}
        removeLabel={this.removeLabel}
      />
      <MessageList
        messages={this.state.messages}
        toggleSelection={this.toggleSelection}
        toggleStarring={this.toggleStarring}
      />
    </div>
  );
}

export default App;
