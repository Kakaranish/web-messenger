import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import queryString from 'query-string';
import MessageInput from './components/MessageInput';
import MessagesBox from './components/MessagesBox';

/**
 * @type {SocketIOClient.Socket}
 */
let socket;

const ChatPage = ({ location }) => {

	const { nickname, room } = queryString.parse(location.search);

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket = io('http://localhost:9000');

		socket.emit('join', { nickname, room }, err => {
			if (err) alert(err);
		});

		socket.on('joinRes', messages => setMessages(messages);

		socket.on('serverMessage', message => 
			setMessages(messages => [...messages, message])
		);

		socket.on('message', message => {
			setMessages(messages => [...messages, { content: message.content, nickname: message.nickname }]);
		});
	}, []);

	const onSend = message => {
		socket.emit('message', { nickname, room, content: message }, err => {
			if (err) alert(err);
		});

		setMessages(messages => [...messages, { nickname: 'You', content: message }]);
	};

	if (!nickname || !room) return <h3>Passed invalid data</h3>
	return <>
		<div className="container-fluid">

			<div className="row">

				<div className="offset-3 col-6">
					<h3>Room {room}</h3>

					<MessagesBox messages={messages} currentUserNickname={nickname} />

					<MessageInput onSendCb={onSend} />
				</div>
			</div>
		</div>
	</>
};

export default ChatPage;