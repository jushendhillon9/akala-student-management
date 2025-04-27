import { useContext } from 'react';
import { StudentContext } from '../Contexts/StudentContext';

function ThreadList({ onSelectThread }) {
  const { students } = useContext(StudentContext);

  return (
    <div className="w-full md:w-1/3 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-2">Chat Threads</h2>
      {students.map((student) => (
        <div
          key={student.id}
          onClick={() => onSelectThread(student.id)}
          className="p-2 cursor-pointer hover:bg-gray-300"
        >
          {student.name}
        </div>
      ))}
    </div>
  );
}

export default ThreadList;