import React from 'react'

const Message = ({ message, classN }) => {
    return (
        <div className={`message ${classN}`}>
            <h4>{message}</h4>
        </div>
    )
}

export default Message;