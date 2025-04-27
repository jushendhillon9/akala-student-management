import StudentTable from "../components/StudentTable.jsx";
import AddStudentForm from '../components/AddStudentForm.jsx';

function StudentPage() {
  return (
    <div className="viewPositioning">
	  <StudentTable/>
	  <AddStudentForm />
    </div>
  );
}

export default StudentPage;