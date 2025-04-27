import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useLocalStorage('students', [
	{studentId: 1, name: 'Mark', course: 'Math', grade: 'A', enrollmentDate: '2023-09-01', _cellProps: { studentId: { scope: 'row' } },},
    {studentId: 2, name: 'Jacob', course: 'Physics', grade: 'B+', enrollmentDate: '2023-09-02', _cellProps: { studentId: { scope: 'row' } },},
    {studentId: 3, name: 'Larry', course: 'Chemistry', grade: 'A-', enrollmentDate: '2023-09-03', _cellProps: { studentId: { scope: 'row' } },},
    {studentId: 4, name: 'Sarah', course: 'Biology', grade: 'B', enrollmentDate: '2023-09-04', _cellProps: { studentId: { scope: 'row' } },},
    {studentId: 5,name: 'Emma',course: 'History', grade: 'A', enrollmentDate: '2023-09-05', _cellProps: { studentId: { scope: 'row' } },},
    {studentId: 6, name: 'John', course: 'English', grade: 'B-', enrollmentDate: '2023-09-06', _cellProps: { studentId: { scope: 'row' } },},
  ]);


  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <StudentContext.Provider value={{ students, addStudent }}>
      {children}
    </StudentContext.Provider>
  );
}