import React from 'react';
import Sender from './Sender'



const SenderContainer = (props) => {
  return (
    <div>
      {props.senders.map(s => {
        return <Sender senderName={s} handleSenderClick={props.handleSenderClick} senderMessages={props.senderMessages} handleEdit={props.handleEdit}/>
      })}

    </div>
  )
}

export default SenderContainer
