import React, { Component } from "react";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getRoomMessages, setRoomMessages } from '../actions/roomMessages';
import Moment from 'react-moment';
class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient("http://127.0.0.1:5000"),
      socketId: null,
      roomMessages: [],
      currentMessage: null,
      messages: [],
      userList: [],
      roomName: "a",
    };
  }
  sendPrivateMessage = (user) => {
    const message = {
      toid: user.id,
      msg: "motherfucker!!!",
      name: this.props.currentUser.username
    }

    this.state.socket.emit('getMsg', message);
  }

  sendRoomMessage = (msg) => {
    //save
    const message = {
      msg,
      name: this.props.currentUser.username,
      roomName: this.state.roomName
    }
    this.props.setRoomMessages(message);
    //send  

    this.state.socket.emit('getRoomMsg', message);
  }
  renderMessages = () => {
    return (
      <div>
        {this.state.roomMessages.map((message, index) =>
          <li key={index} className="message">
            <div className="message__title">
              <h4>{message.sender}</h4>
              <span> <Moment format="h:mm a">{message.createdAt}</Moment></span>
            </div>
            <div className="message__body">
              <p>{message.text}</p>
            </div>
          </li>
        )}
      </div>)
  }
  componentDidMount() {
    this.props.getRoomMessages(this.state.roomName);
  
   

    this.state.socket.on("connect", (err) => {
      if (err)
        return console.log(err);
        this.state.socket.emit('join', { username: this.props.currentUser.username });
    });

    this.state.socket.on('userList', (userList, socketId) => {
      console.log("userList", userList)
      this.setState((prevState) => { return { socketId, userList } });
    });


    this.state.socket.on('exit', (userList) => {
      console.log("exit", userList)
      this.setState({ userList });
    });

    this.state.socket.on('sendMsg', (data) => {
      this.setState((prevState) => ({ messages: [...prevState.messages, data] }));
    });

    this.state.socket.on('sendRoomMsg', (data) => {
      this.setState((prevState) => ({ roomMessages: [...prevState.roomMessages, data] }));
    });
  }
  render() {
    return (
      <div className="chatPage">
        <div className="chat__sidebar">
          <h3>People</h3>
          <div id="users">
            {this.state.userList.length > 0 &&
              <ol>
                {this.state.userList.map((user, index) => <li key={index} onClick={() => { this.sendPrivateMessage(user) }}>{user.userName.username}</li>)}
              </ol>
            }
          </div>
          {this.state.messages.length > 0 &&
            <div>
              <h3>Private Messages</h3>
              <ol>
                {this.state.messages.map((msg, index) => <li key={index}>{`from: ${msg.name}, to: ${msg.msg}`}</li>)}
              </ol>
            </div>
          }
        </div>

        <div className="chat__main">
          <ol id="messages" className="chat__messages"></ol>
          {
            this.state.roomMessages && this.state.roomMessages.length > 0 && this.renderMessages()
          }
          <div className="chat__footer">
            <form id="message-form">
              <input name="message" onChange={(e) => this.setState({ currentMessage: e.target.value })} type="text" placeholder="Message" autoFocus autoComplete="off" />
              <button onClick={() => { this.sendRoomMessage(this.state.currentMessage) }}>Send</button>
            </form>
          </div>
        </div>




      </div>

    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getRoomMessages: (roomName) => {
    dispatch(getRoomMessages(roomName));
  },
  setRoomMessages: (roomName, msg) => {
    dispatch(setRoomMessages(roomName, msg));
  },
});
const mapStateToProps = (state, props) => ({
  roomMessages: state.roomMessages.roomMessages,
  currentUser: state.auth.currentUser || JSON.parse(localStorage.getItem("currentUser"))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
