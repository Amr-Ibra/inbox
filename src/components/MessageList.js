import Message from "./Message";

const MessageList = ({ messages, toggleSelection, toggleStarring }) =>
  messages.map((message) => (
    <Message
      key={message.id}
      id={message.id}
      subject={message.subject}
      read={message.read}
      starred={message.starred}
      selected={message.selected}
      labels={message.labels}
      toggleSelection={toggleSelection}
      toggleStarring={toggleStarring}
    />
  ));

export default MessageList;
