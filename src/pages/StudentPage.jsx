import StudentTable from "../components/StudentTable.jsx";
import AddStudentForm from '../components/AddStudentForm.jsx';

function StudentPage() {
  return (
    <div className="p-4">
	  <StudentTable/>
	  <AddStudentForm />
    </div>
  );
}

export default StudentPage;