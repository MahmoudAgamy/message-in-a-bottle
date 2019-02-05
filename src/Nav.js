import React from 'react';

const Nav = (props) => {
  return (
    <div>
      <h3>Send a message</h3>
      <form onSubmit={(e)=>props.onFormSubmit(e)}>
        sender Name:
        <input name="newSender" type="input" value={props.newSender} onChange={(e)=>props.onInputChange(e)} /><br/>
        Message:
        <input name="newMessage" type="input" value={props.newMessage} onChange={(e)=>props.onInputChange(e)} /><br/>
        <input type="submit" value="some Message" />
      </form>
      <hr/>
    </div>
  )
}

export default Nav
