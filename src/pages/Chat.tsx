import React, { useState, useEffect } from 'react';
import ResetButton from '../components/ResetButton';
import BackButton from '../components/BackButton';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false); // New state variable
  console.log(messages);

  const fetchChatMessages = async () => {
    const response = await fetch('https://kevlongalloway.shop/api/chat', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        setMessages(JSON.parse(data));
      })
      .catch(function (error) {});
  };

  const sendMessage = async () => {
    const userMessage = { content: inputMessage, role: 'user' };
    const updatedMessages = [...messages, userMessage]; // Append the user message to the existing messages array
    
    setShowTypingIndicator(true); // Show typing indicator
    setMessages(updatedMessages); // Update the messages state with the updated array
    setInputMessage('');

    await fetch('https://kevlongalloway.shop/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
      body: JSON.stringify({ message: inputMessage }),
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log(data);
        fetchChatMessages();
        setShowTypingIndicator(false); // Hide typing indicator
      })
      .catch(function (error) {
        console.error('Error sending message:', error);
      });
  };
  

  const handleResetConversation = () => {
    setMessages([]);
  };

  function ucfirst(str) {
    if (typeof str !== 'string') {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    fetchChatMessages();
  }, []);

  return (
    <div id="app" className="flex flex-col h-screen">
      <div className="flex justify-between">
        <BackButton to="/dashboard" />
        <ResetButton onClick={handleResetConversation} />
      </div>
      
      {/* Your chat UI code */}
      {/* Display chat messages */}
      <div
        id="chat-container"
        className="border border-gray-300 p-4 flex-grow overflow-y-auto"
      >
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((chat, index) => (
            <div
              key={index}
              className={`mb-2 max-w-md mx-auto p-4 rounded-lg text-white ${
                chat.role === 'assistant'
                  ? 'bg-blue-500 mr-auto'
                  : 'bg-gray-300 text-gray-800 ml-auto'
              }`}
            >
              <span className="font-bold">{ucfirst(chat.role)}: </span>
              {chat.content}
            </div>
          ))
        ) : (
          <div>No messages to display.</div>
        )}
      </div>
      {/* Chat input */}
      <div
        id="chat-input"
        className="flex items-center bg-white px-4 py-2 border-t border-gray-300"
      >
        <input
          type="text"
          id="message-input"
          className="flex-grow rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          id="send-button"
          type="submit"
          className="rounded-r-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
        {showTypingIndicator && (
          <div className="ml-2 text-gray-500">
            <span className="animate-ping absolute inline-flex h-3 w-3 bg-blue-500 opacity-75 rounded-full"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </div>
        )}
      </div>
    </div>
  );
}
