import React, { useState } from 'react';

const MessageInput = ({ onSendCb }) => {

    const [message, setMessage] = useState('');

    const onKeyDown = event => { if (event.key === 'Enter') onSend(); }

    const onSend = () => {
        if (!message) return;
        onSendCb(message);
        setMessage('');
    };

    return <>
        <div className="mt-4">
            <input name="message" type="text" className="col-9" autoComplete={"off"}
                value={message} onChange={event => setMessage(event.target.value)}
                onKeyDown={onKeyDown} />

            <button className="btn btn-primary col-3" onClick={onSend}>
                Send
            </button>
        </div>
    </>
};

export default MessageInput;