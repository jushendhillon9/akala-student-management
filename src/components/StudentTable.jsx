import {React, useState} from 'react';
import "../assets/css/StudentTable.css"
import { CTable, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CInputGroup, CInputGroupText, CFormInput} from '@coreui/react';

const StudentTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('studentId');
  const columns = [
    {
      key: 'studentId',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      label: 'Name',
      _props: { scope: 'col' },
    },
    {
      key: 'course',
      label: 'Course',
      _props: { scope: 'col' },
    },
    {
      key: 'grade',
      label: 'Grade',
      _props: { scope: 'col' },
    },
    {
      key: 'enrollmentDate',
      label: 'Enrollment Date',
      _props: { scope: 'col' },
    },
  ];

  const items = [
    {
      studentId: 1,
      name: 'Mark',
      course: 'Math',
      grade: 'A',
      enrollmentDate: '2023-09-01',
      _cellProps: { studentId: { scope: 'row' } },
    },
    {
      studentId: 2,
      name: 'Jacob',
      course: 'Physics',
      grade: 'B+',
      enrollmentDate: '2023-09-02',
      _cellProps: { studentId: { scope: 'row' } },
    },
    {
      studentId: 3,
      name: 'Larry',
      course: 'Chemistry',
      grade: 'A-',
      enrollmentDate: '2023-09-03',
      _cellProps: { studentId: { scope: 'row' } },
    },
    {
      studentId: 4,
      name: 'Sarah',
      course: 'Biology',
      grade: 'B',
      enrollmentDate: '2023-09-04',
      _cellProps: { studentId: { scope: 'row' } },
    },
    {
      studentId: 5,
      name: 'Emma',
      course: 'History',
      grade: 'A',
      enrollmentDate: '2023-09-05',
      _cellProps: { studentId: { scope: 'row' } },
    },
    {
      studentId: 6,
      name: 'John',
      course: 'English',
      grade: 'B-',
      enrollmentDate: '2023-09-06',
      _cellProps: { studentId: { scope: 'row' } },
    },
  ];

  const filteredItems = items.filter((item) =>
    [item.name, item.studentId].some((field) =>{
		const fieldStr = String(field)
		const searchStr = String(searchTerm)
		if (typeof field === 'string') {
			return field.toLowerCase().includes(searchTerm.toLowerCase());
		}
		return fieldStr.includes(searchStr);
	}
  ));

  const gradeOrder = {
    'A': 11,
    'A-': 10,
    'B+': 9,
    'B': 8,
    'B-': 7,
    'C+':6,
	'C': 5,
	'C-': 4,
	'D+': 3,
	'D': 2,
	'D-': 1,
	'F': 0
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

	if (sortColumn === 'grade') {
		const rankA = gradeOrder[valueA] || 0; // Default to 0 if grade not in gradeOrder
		const rankB = gradeOrder[valueB] || 0;
		return rankB - rankA; // Descending rank for ascending grade (higher grade first)
	}

    if (sortColumn === 'enrollmentDate') {
      return new Date(valueA) - new Date(valueB);
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    return valueA - valueB;
  });

  const handleSort = (columnKey) => {
    setSortColumn(columnKey);
  };

  return (
    <div>
      <CInputGroup className="mb-3" style={{ maxWidth: '400px' }}>
        <CInputGroupText>Search</CInputGroupText>
        <CFormInput
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
		<CDropdown className = "marginLeft">
			<CDropdownToggle color="secondary">Column Filter</CDropdownToggle>
			<CDropdownMenu>
            {columns.map((column) => (
              <CDropdownItem
                key={column.key}
                onClick={() => handleSort(column.key)}
                style={{ cursor: 'pointer' }}
				active={sortColumn === column.key}
              >
                {column.label}
                {sortColumn === column.key && <span></span>}
              </CDropdownItem>
            ))}
          </CDropdownMenu>
		</CDropdown>
      </CInputGroup>
      <CTable columns={columns} items={sortedItems} />
    </div>
  );
};

export default StudentTable;