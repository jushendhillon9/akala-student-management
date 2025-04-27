import { useState, useContext } from 'react';
import { ChatContext } from '../Contexts/ChatContext';

function ConversationView({ selectedThread }) {
  const { threads, sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  if (!selectedThread) return <div className="flex-1 p-4">Select a thread</div>;

  const thread = threads.find((t) => t.studentId === selectedThread) || {
    studentId: selectedThread,
    messages: [],
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(selectedThread, { sender: 'advisor', text: message, timestamp: new Date().toISOString() });
    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col bg-white p-4">
      <div className="flex-1 overflow-y-auto">
        {thread.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded ${
              msg.sender === 'advisor'
                ? 'bg-blue-100 ml-auto max-w-xs text-right'
                : 'bg-gray-100 max-w-xs'
            }`}
          >
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex mt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 border p-2 rounded-l"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
}

export default ConversationView;