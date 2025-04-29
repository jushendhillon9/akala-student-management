import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SimpleSidebar from '../components/Sidebar.jsx'; 
import ConversationView from '../components/ConversationView';
import { StudentContext } from '../Contexts/StudentContext';

function ThreadPage() {
  const { studentId } = useParams(); 
  const { students } = useContext(StudentContext);
  const [selectedThreadId, setSelectedThreadId] = useState(studentId || null);
  const [selectedStudent, setSelectedStudent] = useState(studentId || null);

  useEffect(() => {
    setSelectedThreadId(studentId || null);
  }, [studentId]);

  useEffect(() => {
	for (var i = 0; i < students.length; i++) {
		if (students[i].studentId == studentId) {
			setSelectedStudent(students[i]);
		}
	}
  }, [studentId]);

  return (
    <div className = "viewPositioning2">
      <ConversationView
        selectedThread={selectedThreadId}
        selectedStudent={selectedStudent}
      />
    </div>
  );
}

export default ThreadPage;