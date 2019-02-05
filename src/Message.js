import React from 'react';

const Message = (props) => {
  return (
    <div>
      <h4>{props.messageData.message}</h4>
      <button onClick={()=>props.handleEdit(props.messageData)}>Edit</button>
      <hr/>
    </div>
  )
}

export default Message
