import React, { Component } from "react";
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";
import { getRoomMessages } from '../actions/roomMessages';

class ChatPage extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000",
      roomName: "a"
    };
  }
  send = (to) => {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.emit(to, "hello darling");
  }
  renderMessages = () => {
    return (
    <div>
      {this.props.roomMessages.map((message,index) =>
        <div key={index}>            
            <p>{`text: ${message.text}`} </p>
            <p>{`sender: ${message.sender}`} </p>
            <p>{`receiver: ${message.receiver}`} </p>
            <p>{`roomName: ${message.roomName}`} </p>
            <p>{`createdAt: ${message.createdAt}`} </p>
        </div>
           )}
    </div>)
  }
  componentDidMount() {
    this.props.getRoomMessages(this.state.roomName);
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("connect", (err) => {
      socket.emit('join', function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('No error');
        }
      });
    });
    socket.on("newMessage", (data) => {
      console.log(data)
    })
  }
  render() {    
    return (
      <div>
        {
          this.props.roomMessages && this.props.roomMessages.length == 0 && <p> Loading...</p>
        }
        {
          this.props.roomMessages && this.props.roomMessages.length > 0 && this.renderMessages()
        }
      </div>

    );
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  getRoomMessages: (roomName) => {
    dispatch(getRoomMessages(roomName));
  },
});
const mapStateToProps = (state, props) => ({
  roomMessages: state.roomMessages.roomMessages//(state.roomMessages.roomMessages && state.roomMessages.roomMessages.lenght>0)? state.roomMessages.roomMessages.filter((message) => message.roomName === this.state.roomName):null,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
