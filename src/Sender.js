import React from 'react';
import Message from './Message'

const Sender = (props) => {
  return (
    <div>
      <h2 onClick={(e) => props.handleSenderClick(props.senderName)}>{props.senderName}</h2>
      <div>

      {props.senderMessages.map(m => {
        return props.senderName ==  m.real_name.trim() && <Message key={m.id} messageData={m} handleEdit={props.handleEdit}/>
      })}
      </div>
    </div>
  )
}

export default Sender
