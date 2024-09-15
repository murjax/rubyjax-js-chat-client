import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ChannelShow(props) {
  const [name, setName] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const messageBox = useRef(null);

  const params = useParams();

  useEffect(() => {
    if (!name) {
      const getName = () => {
        const name = prompt('Please enter your name');
        setName(name[0]);
      }

      getName();
    }

    if (!socket) {
      const socket = new WebSocket("ws://localhost:3001");

      socket.addEventListener('open', (event) => {
        const subscribeMessage = JSON.stringify({ requestType: 'subscribe', id: params.id });
        socket.send(subscribeMessage);
      });

      socket.addEventListener('message', async (event) => {
        const textData = await event.data.text();
        const data = JSON.parse(textData);
        setMessages(messages => [...messages, { id: data.id, sender: data.sender, message: data.message, sentAt: data.sentAt }]);
      });

      setSocket(socket);
    }

    if (messageBox.current) {
      messageBox.current.scrollTo(0, messageBox.current.scrollHeight);
    }
  }, [messages, name, socket, params.id]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const message = inputRef.current.value;
      const messageId = uuidv4();
      const now = new Date();
      const sentAt = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });

      const chatMessage = JSON.stringify({
        requestType: 'chatMessage',
        channel: params.id,
        id: messageId,
        sender: name,
        message,
        sentAt
      });
      socket.send(chatMessage);

      inputRef.current.value = '';
      setMessages(messages => [...messages, { id: messageId, self: true, sender: name, message, sentAt }]);
    }
  }

  const senderTemplate = (message) => {
    return (
      <div key={message.id} className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">{message.message}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{message.sentAt}</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 text-center leading-10">{message.sender}</div>
      </div>
    );
  }

  const receiveTemplate = (message) => {
    return (
      <div key={message.id} className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 text-center leading-10">{message.sender}</div>
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">{message.message}</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">{message.sentAt}</span>
        </div>
      </div>
    );
  }

  const renderMessage = (message) => {
    if (message.self) {
      return senderTemplate(message);
    }

    return receiveTemplate(message);
  }

  return (
    <div className="flex flex-col items-center relative md:rounded-md bg-white mb-10 p-2">
      <h2 className="text-2xl">Show Channel</h2>

      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div ref={messageBox} className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map((message) => (
              renderMessage(message)
            ))}
          </div>

          <div className="bg-gray-300 p-4">
            <input
              className="flex items-center h-10 w-full rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
              ref={inputRef}
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChannelShow;
