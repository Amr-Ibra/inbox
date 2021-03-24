const label = { dev: "dev", personal: "personal", gschool: "gschool" };

const messages = [
  {
    id: 1,
    subject: "Here is some message text that has a bunch of stuff 1",
    isRead: false,
    isStarred: false,
    isSelected: true,
    labels: [label.dev],
  },
  {
    id: 2,
    subject: "Here is some message text that has a bunch of stuff 2",
    isRead: true,
    isStarred: true,
    isSelected: false,
    labels: [label.dev, label.gschool],
  },
  {
    id: 3,
    subject: "Here is some message text that has a bunch of stuff 3",
    isRead: false,
    isStarred: false,
    isSelected: false,
    labels: [label.dev, label.personal],
  },
  {
    id: 4,
    subject: "Here is some message text that has a bunch of stuff 4",
    isRead: true,
    isStarred: true,
    isSelected: true,
    labels: [label.personal],
  },
];

export default messages;
