module.exports = class Message {
  constructor(props) {
    this.id = props.id;
    this.userMessage = props.userMessage;
    this.botMessage = props.botMessage;
  }
};