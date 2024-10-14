import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import { sendChatMessage, retrieveChatMessages } from '../../../Services/studentService';

const GroupChat = ({ courseId, userName }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // Connect to Socket.IO server
        const socketIo = io('http://localhost:3000', { withCredentials: true });

        setSocket(socketIo);

        // Listen for incoming messages
        socketIo.on('chat message', (msg) => {
            if (msg.sender !== userName) {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }
        });

        // Clean up on unmount
        return () => {
            socketIo.disconnect();
        };
    }, []);

    useEffect(() => {
        // Fetch existing messages when component mounts
        const fetchMessages = async () => {
            try {
                const data = await retrieveChatMessages(courseId);
                setMessages(data.chat); // Assuming data.chat contains the messages
            } catch (error) {
                console.error('Failed to retrieve chat messages:', error);
            }
        };

        fetchMessages();
    }, [courseId]);

    const sendMessage = async () => {
        if (messageInput) {
            const newMessage = { message: messageInput, courseId, sender: userName };
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            try {
                setMessageInput('');
                await sendChatMessage(courseId, messageInput); // Adjust based on your API
                socket.emit('chat message', newMessage);
               
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
        <div className="px-4 py-5 sm:p-6  rounded-lg shadow">
      <div className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === userName ? 'justify-end' : 'justify-start'} items-end`}
              >
                {msg.sender !== userName && (
                  <FaUserCircle className="text-gray-400 w-8 h-8 mr-2" />
                )}
                <div
                  className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${
                    msg.sender === userName ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex flex-col">
                    {msg.sender !== userName && (
                      <span className="text-xs text-gray-500 mb-1">{msg.sender}</span>
                    )}
                    <div className={`relative px-4 py-2 rounded-lg inline-block 
          ${msg.sender === userName
            ? 'bg-custom-cyan text-white' // User's messages
            : msg.sender === 'Mentor'
              ? ' text-black border-2 border-green-500' // Mentor's messages in green
              : 'bg-white text-gray-700 border border-gray-200' // Other messages
          }`}
        >
                      {msg.message}
                      <div 
                        className={`absolute top-1/2 -mt-2 w-0 h-0 border-4 
                          ${msg.sender === userName
                            ? 'right-0 -mr-2 border-l-custom-cyan border-t-custom-cyan border-b-transparent border-r-transparent':msg.sender === 'Mentor'
                            ? 'border-r-green-500 left-0 -ml-2  border-t-white border-b-transparent border-l-transparent' 
                            : 'left-0 -ml-2 border-r-gray-800 border-t-white border-b-transparent border-l-transparent'
                          }`}
                      ></div>
                      
                    </div>
                  </div>
                </div>
              
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 bg-white border-t rounded-b-lg">
          <div className="flex space-x-4">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-custom-cyan"
            />
            <button
              className="bg-custom-cyan2 text-white rounded-full p-2 hover:bg-custom-cyan focus:outline-none focus:ring-2 focus:ring-custom-cyan focus:ring-opacity-50"
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

export default GroupChat;
