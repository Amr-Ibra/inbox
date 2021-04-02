import "./App.css";
import { Component } from "react";
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import Compose from "./components/Compose";

const flag = {
  all: "fa-check-square-o",
  some: "fa-minus-square-o",
  none: "fa-square-o",
};

const ApiUrl = "http://localhost:8082/api/messages";

class App extends Component {
  state = {
    messages: [],
    selection: flag.some,
    unreadCount: 0,
    plural: null,
    disabled: false,
    hidden: true,
  };

  async componentDidMount() {
    const response = await fetch(ApiUrl);
    const messages = await response.json();

    /* Messages that come from the server do not
    have a "selected" key. Add that missing key. */
    this.addSelectedKey(messages);

    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);
  }

  addSelectedKey(messages) {
    messages.forEach((message) => {
      if (message.selected === undefined || message.selected === true) {
        message["selected"] = false;
      }
    });
  }

  toggleComposeForm = () => this.setState({ hidden: !this.state.hidden });

  onMessageSubmission = (e) => {
    e.preventDefault();

    const subject = e.target.elements.subject.value;
    const body = e.target.elements.body.value;

    this.sendMessageToServer(subject, body, e);
  };

  async sendMessageToServer(subject, body, e) {
    const response = await fetch(ApiUrl, {
      method: "POST",
      body: JSON.stringify({ subject: subject, body: body }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const newMessage = await response.json();

    /* Add the "selected" key */
    newMessage["selected"] = false;

    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);

    this.toggleComposeForm();

    e.target.elements.subject.value = null;
    e.target.elements.body.value = null;
  }

  toggleStarring = (id) => {
    const message = this.state.messages.find((message) => message.id === id);
    this.updateStarringOnServer(id, !message.starred);
  };

  async updateStarringOnServer(id, bool) {
    const response = await fetch(ApiUrl, {
      method: "PATCH",
      body: JSON.stringify({ messageIds: [id], command: "star", star: bool }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const messages = await response.json();

    this.addSelectedKey(messages);

    this.setState({ messages: messages });
    this.updateOverallSelectionFlag(messages);
  }

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

    if (allSelected) {
      this.setState({ selection: flag.all, disabled: false });
    } else if (allUnselected) {
      this.setState({ selection: flag.none, disabled: true });
    } else {
      this.setState({ selection: flag.some, disabled: false });
    }
  }

  markAsRead = () => {
    const ids = [];
    this.state.messages.forEach((message) => {
      if (message.selected && !message.read) {
        ids.push(message.id);
      }
    });
    this.updateReadBoolOnServer(ids, true);
  };

  markAsUnread = () => {
    const ids = [];
    this.state.messages.forEach((message) => {
      if (message.selected && message.read) {
        ids.push(message.id);
      }
    });
    this.updateReadBoolOnServer(ids, false);
  };

  async updateReadBoolOnServer(ids, bool) {
    const response = await fetch(ApiUrl, {
      method: "PATCH",
      body: JSON.stringify({ messageIds: ids, command: "read", read: bool }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const messages = await response.json();

    this.addSelectedKey(messages);

    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);
  }

  deleteMessage = () => {
    const ids = [];
    this.state.messages.forEach((message) => {
      if (message.selected) {
        ids.push(message.id);
      }
    });
    this.deleteMessageOnServer(ids);
  };

  async deleteMessageOnServer(ids) {
    const response = await fetch(ApiUrl, {
      method: "PATCH",
      body: JSON.stringify({ messageIds: ids, command: "delete" }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const messages = await response.json();

    this.addSelectedKey(messages);

    this.setState({ messages: messages });

    this.updateOverallSelectionFlag(messages);
    this.countUnreadMessages(messages);
  }

  countUnreadMessages(messages) {
    const unreadMessages = messages.filter((message) => !message.read);
    const unreadCount = unreadMessages.length;

    this.setState({ unreadCount: unreadCount });

    if (unreadCount === 1) {
      this.setState({ plural: null });
    } else {
      this.setState({ plural: "s" });
    }
  }

  applyLabel = (e) => {
    const label = e.target.value;
    const ids = [];

    this.state.messages.forEach((message) => {
      if (message.selected && !message.labels.includes(label)) {
        ids.push(message.id);
      }
    });
    this.updateLabelOnServer(ids, "addLabel", label);

    e.target.selectedIndex = 0;
  };

  removeLabel = (e) => {
    const label = e.target.value;
    const ids = [];

    this.state.messages.forEach((message) => {
      if (message.selected && message.labels.includes(label)) {
        ids.push(message.id);
      }
    });
    this.updateLabelOnServer(ids, "removeLabel", label);

    e.target.selectedIndex = 0;
  };

  async updateLabelOnServer(ids, command, label) {
    const response = await fetch(ApiUrl, {
      method: "PATCH",
      body: JSON.stringify({ messageIds: ids, command: command, label: label }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const messages = await response.json();

    this.addSelectedKey(messages);

    this.setState({ messages: messages });
    this.updateOverallSelectionFlag(messages);
  }

  render = () => (
    <div>
      <Toolbar
        unreadCount={this.state.unreadCount}
        plural={this.state.plural}
        selection={this.state.selection}
        disabled={this.state.disabled}
        toggleComposeForm={this.toggleComposeForm}
        toggleOverallSelection={this.toggleOverallSelection}
        markAsRead={this.markAsRead}
        markAsUnread={this.markAsUnread}
        deleteMessage={this.deleteMessage}
        applyLabel={this.applyLabel}
        removeLabel={this.removeLabel}
      />
      <Compose
        hidden={this.state.hidden}
        onMessageSubmission={this.onMessageSubmission}
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
