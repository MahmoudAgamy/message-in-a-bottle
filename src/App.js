import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Nav from './Nav'
import SenderContainer from './SenderContainer'

class App extends Component {
  state = {
    messages: [],
    senderMessages: [],
    newSender: "",
    newMessage: "",
    messageIdToEdit: 0
  }

  componentDidMount(){
    fetch("http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages")
    .then(res => res.json())
    .then(res => {
      this.setState({
        messages: res
      })
    })
  }

  getSenders = () => {
    const senders = []
    this.state.messages.map(m => {
      if (!senders.includes(m.real_name.trim())) {
        senders.push(m.real_name.trim())
      }
    })
    return senders
  }

  applySenderClick = (name) => {
    return this.state.messages.filter(m => {
      return m.real_name.trim() === name.trim()
    })
  }

  handleSenderClick = (name) => {
    const newSenderMessages = this.applySenderClick(name)
    this.setState({senderMessages: newSenderMessages})
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    if (this.state.messageIdToEdit === 0) {

      fetch("http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages", {
        method: "post",

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          message: {
            message: this.state.newMessage,
            real_name: this.state.newSender
          }
        })
      })
      .then(res => res.json())
      .then(message => {
        this.setState({
          messages: [...this.state.messages, message],
          newMessage: '',
          newSender: ''
        })
      })
    } else {
      fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${this.state.messageIdToEdit}`, {
        method: "PATCH",

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          message: {
            message: this.state.newMessage,
            real_name: this.state.newSender
          }
        })
      })
      .then(res => res.json())
      .then(message => {
        const updatedMessages = this.state.messages.map(m => {
          if (m.id === this.state.messageIdToEdit) {
            return {...m, real_name: this.state.newSender, message: this.state.newMessage}
          } else {
            return m
          }
        })


        this.handleSenderClick(message.real_name.trim())
        this.setState({
          messages: updatedMessages,
          newMessage: '',
          newSender: '',
          messageIdToEdit: 0
        })
      })
    }
  } // end of onFormSubmit


  onInputChange = (e) => {
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value})
  }

  handleEdit = (messageData) => {
    this.setState({
      newMessage: messageData.message,
      newSender: messageData.real_name,
      messageIdToEdit: messageData.id
    })
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <Nav
          onFormSubmit={this.onFormSubmit}
          onInputChange={this.onInputChange}
          newSender={this.state.newSender}
          newMessage={this.state.newMessage}
          />
        <SenderContainer senders={this.getSenders()}
          handleSenderClick={this.handleSenderClick}
          senderMessages={this.state.senderMessages}
          handleEdit={this.handleEdit}
          />
      </div>
    );
  }
}

export default App;


// {
// "id": 2493,
// "real_name": "J",
// "message": "Hi",
// "created_at": "2019-01-10T02:27:26.723Z",
// "updated_at": "2019-01-10T02:27:26.723Z"
// }
