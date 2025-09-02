import { useState, useEffect, useRef } from 'react';
import './ChatPage.css';
import { useAuthContext } from '../shared/hooks/AuthContext';

interface Message {
	id: string;
	type: string;
	text: string;
	timestamp: Date;
}

function ChatPage() {
	const { user } = useAuthContext();

	const [ws, setWs] = useState<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [isRegistered, setIsRegistered] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageInput, setMessageInput] = useState<string>('');
	const [userId, setUserId] = useState<string>(user?.profile?.username || '');
	const [roomName, setRoomName] = useState<string>('');
	const [currentRoom, setCurrentRoom] = useState<string | null>(null);
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const connectToWebSocket = () => {
		const userIdValue = userId.trim();

		if (!userIdValue) {
			alert('Please enter a valid User ID.');
			return;
		}

		if (ws) return; // Prevent multiple connections

		const webSocket = new WebSocket('ws://localhost:8080/websocket/');

		webSocket.onopen = () => {
			setIsConnected(true);
			const room = roomName.trim();
			setCurrentRoom(room);
			webSocket.send(`USER:${userIdValue}:${room}`);
		};

		webSocket.onmessage = (event) => {
			// const message: Message = JSON.parse(event.data);
			const message = event.data;

			if (message.includes('Welcome') && !isRegistered) {
				setIsRegistered(true);
				addMessage(
					'You have successfully registered. Message: ' + message,
					'system'
				);
			} else if (message.includes('joined') || message.includes('left')) {
				addMessage(
					'A user has ' +
						(message.includes('joined') ? 'joined' : 'left') +
						' the room. Message: ' +
						message,
					'system'
				);
			} else if (message.includes('new message')) {
				addMessage('New message', 'system');
			} else {
				addMessage(message, 'received');
			}

			setMessages((prevMessages) => [...prevMessages, message]);
		};

		webSocket.onclose = (event) => {
			setIsConnected(false);
			setIsRegistered(false);
			setCurrentRoom(null);
			setWs(null);

			addMessage(
				'Connection closed:' + event.code + ' ' + event.reason,
				'system'
			);
		};

		setWs(webSocket);
	};

	const disconnect = () => {
		if (ws) {
			ws.close();
		}
	};

	const addMessage = (text: string, type: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			type,
			text,
			timestamp: new Date(),
		};

		setMessages((prevMessages) => [...prevMessages, newMessage]);
	};

	const sendMessage = () => {
		const message = messageInput.trim();
		if (ws && isConnected && isRegistered && message) {
			// const messagePayload = {
			// 	id: Date.now().toString(),
			// 	type: 'user',
			// 	text: message,
			// 	timestamp: new Date(),
			// };

			// ws.send(JSON.stringify(messagePayload));

			ws.send(message);
			// addMessage(message, 'user');
			setMessageInput('');
		}
	};

	return (
		<div className="chat-container">
			<div className="chat-header">
				<h1>Chat de {userId}</h1>
				<div className="user-setup">
					<input
						type="text"
						value={userId}
						onChange={(e) => setUserId(e.target.value)}
						placeholder="User ID"
						// disabled={isConnected}
						disabled={true}
						className="user-id-input"
					/>
					<input
						type="text"
						value={roomName}
						onChange={(e) => setRoomName(e.target.value)}
						placeholder="Room Name"
						disabled={isConnected}
						className="room-input"
					/>
					<button
						onClick={connectToWebSocket}
						disabled={isConnected}
						className="connect-btn"
					>
						Connect
					</button>
					<button
						onClick={disconnect}
						disabled={!isConnected}
						className="disconnect-btn"
					>
						Disconnect
					</button>
					<span className="status">
						{isConnected ? 'Connected' : 'Disconnected'}
					</span>
				</div>
			</div>

			<div className="input-container">
				<input
					type="text"
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					placeholder="Type your message..."
					disabled={!isConnected || !isRegistered}
					className="message-input"
				/>
				<button
					onClick={sendMessage}
					className="send-btn"
					disabled={!messageInput || !isConnected || !isRegistered}
				>
					Send
				</button>
			</div>

			<div className="messages-container">
				{messages.map((message, index) => (
					<div key={index} className={`message ${message.type}`}>
						<div className="message-content">{message.text}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ChatPage;
