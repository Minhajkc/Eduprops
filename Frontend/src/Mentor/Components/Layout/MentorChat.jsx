import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FaPaperPlane } from 'react-icons/fa';
import { retrieveMentorChats,sendChatMessage } from '../../../Services/mentorService';

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
      setMessages((prevMessages) => [...prevMessages, msg]);
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
      setMessages((prevMessages) => [...prevMessages, { ...newMessage, sender: 'Mentor' }]);
      try {
        await sendChatMessage(newMessage); // Pass the entire message object
        socket.emit('chat message', { ...newMessage, sender: 'Mentor' }); // Emit the message via Socket.io
        setMessageInput(''); // Clear input after sending message
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

  return (
    <div className="px-4 py-5 sm:p-6 bg-gray-1 rounded-lg shadow">
      <div className="flex flex-col h-[600px]">
        {/* Chat messages display */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex justify-start items-end">
                <div className="flex flex-col space-y-2 text-sm max-w-xs mx-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">{msg.sender}</span>
                    <div className="relative px-4 py-2 rounded-lg inline-block bg-white text-gray-700 border border-gray-200">
                      {msg.message}
                      <div className="absolute top-1/2 -mt-2 w-0 h-0 border-4 border-r-gray-800 border-t-white border-b-transparent border-l-transparent left-0 -ml-2"></div>
                    </div>
                    {/* Display the createdAt timestamp */}
                    <span className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</span>
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
