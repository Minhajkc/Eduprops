import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa';
import { retrieveMentorChats, sendChatMessage } from '../../../Services/mentorService';

const MentorChat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Connect to the Socket.IO server
    const socketIo = io('http://localhost:3000', { withCredentials: true });
    setSocket(socketIo);

    // Listen for incoming chat messages
    socketIo.on('chat message', (msg) => {
        if (msg.sender !== 'Mentor') {
            setMessages((prevMessages) => [...prevMessages, msg]);
        }
    });

    // Cleanup the connection on component unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch mentor's chats from the server
    const fetchMessages = async () => {
      try {
        const data = await retrieveMentorChats();
        setMessages(data.allChats);
      } catch (error) {
        console.error('Failed to retrieve chat messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (messageInput) {
      const newMessage = { message: messageInput }; // Only send the message object
      setMessages((prevMessages) => [...prevMessages, { ...newMessage, sender: 'Mentor', createdAt: new Date() }]); // Add createdAt
      try {
        setMessageInput('');
        await sendChatMessage(newMessage); // Pass the entire message object
        socket.emit('chat message', { ...newMessage, sender: 'Mentor' }); // Emit the message via Socket.io
       // Clear input after sending message
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to get formatted time or fallback to current time
  const getFormattedTime = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date().toLocaleTimeString() : date.toLocaleTimeString();
  };

  return (
    <div className="px-4 py-5 sm:p-6 bg-gray-1 rounded-lg shadow">
      <div className="flex flex-col h-[600px]">
        {/* Chat messages display */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'Mentor' ? 'justify-end' : 'justify-start'} items-end`}
              >
                <div className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${
                  msg.sender === 'Mentor' ? 'items-end' : 'items-start'
                }`}>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">{msg.sender}</span>
                    <div className={`relative px-4 py-2 rounded-lg inline-block ${
                      msg.sender === 'Mentor'
                        ? 'bg-custom-cyan text-white' // Mentor's message
                        : 'bg-white text-gray-700 border border-gray-200' // Other messages
                    }`}>
                      {msg.message}
                      <div className={`absolute top-1/2 -mt-2 w-0 h-0 border-4 ${
                        msg.sender === 'Mentor'
                          ? 'right-0 -mr-2 border-l-custom-cyan border-t-custom-cyan border-b-transparent border-r-transparent' // Mentor's arrow
                          : 'left-0 -ml-2 border-r-gray-800 border-t-white border-b-transparent border-l-transparent' // Other's arrow
                      }`}></div>
                    </div>
                    {/* Display the createdAt timestamp or current time if invalid */}
                    <span className="text-xs text-gray-400 mt-1">{getFormattedTime(msg.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message input field */}
        <div className="px-4 py-4 bg-white border-t rounded-b-lg">
          <div className="flex space-x-4">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              onClick={sendMessage}
            >
              <FaPaperPlane className="w-20 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
