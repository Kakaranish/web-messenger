import React from 'react';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessagesBox = ({ messages, currentUserNickname }) => {

    const boxStyle = css({
        width: "70%",
        float: "left",
        marginTop: "20px",
        padding: "10px",
        height: "60vh",
        borderLeft: "1px solid gray",
        borderRight: "1px solid gray"
    }).toString();

    const styleMessage = message => {
        if (message.nickname === currentUserNickname) return <>
            <b>You: </b> {message.content}
        </>
        else if (message.nickname === 'admin') return <>
            <b>Admin:&nbsp;
                         <span className="text-success">
                    {message.content}
                </span>
            </b>
        </>
        else return <>
            <b>{message.nickname}: </b> {message.content}
        </>
    }

    return <>
        <ScrollToBottom className={boxStyle}>
            {
                messages.length > 0 &&
                messages.map((message, i) => <div key={`m-${i}`}>
                    {styleMessage(message)}
                </div>)
            }
        </ScrollToBottom>
    </>
};



export default MessagesBox;