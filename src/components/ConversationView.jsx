import React, { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../Contexts/ChatContext';

function ConversationView({ selectedThread, selectedStudent }) {
  const { threads, sendMessage } = useContext(ChatContext);
  const [thisPagesThread, setThisPagesThread] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
	const matchingThreads = threads.filter((t) => t.studentId == selectedThread);
	console.log(matchingThreads);
	setThisPagesThread(matchingThreads.length > 0 ? matchingThreads : null);
  }, [selectedThread, threads]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const newMessage = {
      sender: 'advisor',
      text: message,
      timestamp: new Date().toISOString(),
    };
    console.log('Sending message:', { studentId: selectedThread, message: newMessage });
    sendMessage(selectedThread, newMessage);
    setMessage('');
  };

  let allMessages = [];

  if (thisPagesThread) {
  	  for (const thread of thisPagesThread) {
		  if (thread.messages) {
			  for (const message of thread.messages) {
				  allMessages.push(message);
			  }
		  }
	  }
	  allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
	  console.log(allMessages);
  }

  if (!selectedStudent) {
    return <div className="flex-1 p-4">Loading thread...</div>;
  }

  return (
    <div className="chat min-h-screen flex-1 flex flex-col bg-white p-4">
      <div className="border-b pb-2 mb-2">
        <h2 className="text-lg font-bold">Chat with {selectedStudent.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {allMessages.length > 0 ? (
          allMessages.map((msg, idx) => (
            <div
              key={`${msg.timestamp || idx}`}
              className={`chat-start mb-2 p-2 rounded ${
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
          ))
        ) : (
          <div className="text-gray-500">No messages yet</div>
        )}
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