import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { StudentContext } from './StudentContext';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { students } = useContext(StudentContext);
  const [threads, setThreads] = useLocalStorage("chatThreads", () =>
    students.map((student) => ({
      studentId: student.studentId,
      messages: [
        { sender: 'student', text: `Hi, I need help with ${student.course}.`, timestamp: new Date().toISOString() },
      ],
    }))
  );

  const sendMessage = (studentId, message) => {
    setThreads((prev) => {
      const threadIndex = prev.findIndex((t) => t.studentId === studentId);
      if (threadIndex >= 0) {
        const updatedThreads = [...prev];
        updatedThreads[threadIndex].messages.push(message);
        return updatedThreads;
      }
      return [...prev, { studentId, messages: [message] }];
    });
  };

  return (
    <ChatContext.Provider value={{ threads, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}