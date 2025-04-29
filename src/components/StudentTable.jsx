import React, { useState, useContext } from 'react';
import "../assets/css/StudentTable.css";
import { StudentContext } from '../Contexts/StudentContext.jsx';
import { CTable, CTableHead, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';

const StudentTable = () => {
  const { students } = useContext(StudentContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('id');

  const columns = [
    {
      key: 'studentId',
      label: '#',
      _props: { scope: 'col', style: {
        backgroundColor: '#007BFF',
        color: 'white',
      }
	}
    },
    {
      key: 'name',
      label: 'Name',
      _props: { scope: 'col', style: {
        backgroundColor: '#007BFF',
        color: 'white',
      }
	}
    },
    {
      key: 'course',
      label: 'Course',
      _props: { scope: 'col', style: {
        backgroundColor: '#007BFF',
        color: 'white',
      }
	}
    },
    {
      key: 'grade',
      label: 'Grade',
      _props: { scope: 'col', style: {
        backgroundColor: '#007BFF',
        color: 'white',
      }
	}
    },
    {
      key: 'enrollmentDate',
      label: 'Enrollment Date',
      _props: { scope: 'col', style: {
        backgroundColor: '#007BFF',
        color: 'white',
      }
	}
    },
  ];

  const filteredItems = students.filter((item) =>
    [item.name, item.studentId].some((field) => {
      const fieldStr = String(field);
      const searchStr = String(searchTerm);
      if (typeof field === 'string') {
        return field.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return fieldStr.includes(searchStr);
    })
  );

  const gradeOrder = {
    'A': 11,
    'A-': 10,
    'B+': 9,
    'B': 8,
    'B-': 7,
    'C+': 6,
    'C': 5,
    'C-': 4,
    'D+': 3,
    'D': 2,
    'D-': 1,
    'F': 0,
  };

  const sortedItems = [...filteredItems].sort((a, b) => {
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (sortColumn === 'grade') {
      const rankA = gradeOrder[valueA] || 0;
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
    <div className = "studentTableView">
	  <div className = "tableHeaderAndFilter">
	  	<h1 className= "tableHeader">Our Students</h1>
		<CInputGroup className="mb-3 tableFilters" style={{ maxWidth: '400px' }}>
			<CInputGroupText style={{ backgroundColor: '#007BFF', borderColor: '#007BFF', color: 'white' }}>Search</CInputGroupText>
			<CFormInput
			type="text"
			placeholder="Search by name or ID..."
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<CDropdown className="marginLeft">
			<CDropdownToggle style={{ backgroundColor: '#007BFF', borderColor: '#007BFF', color: 'white' }}>Sort By</CDropdownToggle>
			<CDropdownMenu>
				{columns.map((column) => (
				<CDropdownItem
					key={column.key}
					onClick={() => handleSort(column.key)}
					style={{ cursor: 'pointer' }}
					active={sortColumn === column.key}
				>
					{column.label}
				</CDropdownItem>
				))}
			</CDropdownMenu>
			</CDropdown>
		</CInputGroup>
	  </div>
	  <div className = "overflowTable">
		<CTable columns={columns} items={sortedItems} stripedColumns hover bordered>
		</CTable>
	  </div>
    </div>
  );
};

export default StudentTable;