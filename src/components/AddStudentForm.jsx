import { useState, useContext } from 'react';
import { StudentContext } from '../Contexts/StudentContext';
import {CCol, CButton, CForm, CFormInput, CFormLabel, CInputGroup, CInputGroupText, CFormSelect} from '@coreui/react'

function AddStudentForm() {
  const [validated, setValidated] = useState(false)
  const { students, addStudent } = useContext(StudentContext);
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    course: '',
    grade: '',
    enrollmentDate: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      setMessage('Error: Please fill out all required fields.');
      return;
    }

	const newId = students.length + 1;

	const updatedFormData = {
		...formData,
		studentId: newId.toString(), // Convert to string if your ids are strings
	};

	console.log(updatedFormData);

    // Use formData from state
    addStudent(updatedFormData);
    setMessage('Student added successfully!');
    setFormData({ id: '', name: '', course: '', grade: '', enrollmentDate: '' });
    setValidated(false);
  };

  return (
		<CForm
		  className="row g-3 needs-validation addStudent"
		  noValidate
		  validated={validated}
		  onSubmit={handleSubmit}
		>
		  <CCol md={4} className="position-relative">
			<CFormInput
			  type="text"
			  name="name"
			  value={formData.name}
			  onChange={handleChange}
			  feedbackInvalid="Input full name."
			  id="validationTooltip01"
			  label="Full name"
			  required
			  tooltipFeedback
			/>
		  </CCol>
		  <CCol md={4} className="position-relative">
			<CFormLabel htmlFor="validationTooltipUsername">Course</CFormLabel>
			<CInputGroup className="has-validation">
			  <CFormInput
			    type="text"
			    name="course"
			    value={formData.course}
			    onChange={handleChange}
				aria-describedby="inputGroupPrependFeedback"
				feedbackInvalid="Please choose a course."
				id="validationTooltipUsername"
				required
				tooltipFeedback
				defaultValue=""
			  />
			</CInputGroup>
		  </CCol>
		  <CCol md={3} className="position-relative">
			<CFormSelect
			  type="text"
			  name="grade"
			  value={formData.grade}
			  onChange={handleChange}
			  aria-describedby="validationTooltip04Feedback"
			  feedbackInvalid="Please select a valid grade."
			  id="validationTooltip04"
			  label="Grade"
			  required
			  tooltipFeedback
			  defaultValue=""
			>
			  <option disabled value="">
				Choose...
			  </option>
			  <option>A+</option>
			  <option>A</option>
			  <option>A-</option>
			  <option>B+</option>
			  <option>B</option>
			  <option>B-</option>
			  <option>C+</option>
			  <option>C</option>
			  <option>C-</option>
			  <option>D+</option>
			  <option>D</option>
			  <option>D-</option>
			  <option>F</option>
			</CFormSelect>
		  </CCol>
		  <CCol md={6} className="position-relative">
			<CFormInput
			  type="date"
			  name="enrollmentDate"
			  value={formData.enrollmentDate}
			  onChange={handleChange}
			  aria-describedby="validationTooltip03Feedback"
			  feedbackInvalid="Provide Enrollment Date in valid format (YYYY-MM-DD)"
			  id="validationTooltip03"
			  label="Enrollment Date"
			  required
			  tooltipFeedback
			/>
		  </CCol>
		  <CCol xs={12} className="position-relative">
			<CButton style={{ backgroundColor: '#007BFF', borderColor: '#007BFF', color: 'white', marginBottom: '10px'}} type="submit">
			  Submit form
			</CButton>
		  </CCol>
		</CForm>
	  )
}

export default AddStudentForm;