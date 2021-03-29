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
  };

  componentDidMount() {
    this.setOverallSelectionFlag();
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

    this.setOverallSelectionFlag();
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
    this.setOverallSelectionFlag();
  };

  setOverallSelectionFlag() {
    const statuses = this.state.messages.map((message) => message.selected);
    const allSelected = statuses.every((status) => status);
    const allUnselected = statuses.every((status) => !status);

    if (allSelected) {
      this.setState({ selection: flag.all });
    } else if (allUnselected) {
      this.setState({ selection: flag.none });
    } else {
      this.setState({ selection: flag.some });
    }
  }

  markAsRead = () => {
    const messages = [...this.state.messages];
    messages.forEach((message) => {
      if (message.selected && !message.read) message.read = true;
    });
    this.setState({ messages: messages });
  };

  markAsUnread = () => {
    const messages = [...this.state.messages];
    messages.forEach((message) => {
      if (message.selected && message.read) message.read = false;
    });
    this.setState({ messages: messages });
  };

  render = () => (
    <div>
      <Toolbar
        selection={this.state.selection}
        toggleOverallSelection={this.toggleOverallSelection}
        markAsRead={this.markAsRead}
        markAsUnread={this.markAsUnread}
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
