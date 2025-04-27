import React, { useState, useContext } from 'react';
import "../assets/css/StudentTable.css";
import { StudentContext } from '../Contexts/StudentContext.jsx';
import { CTable, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CInputGroup, CInputGroupText, CFormInput } from '@coreui/react';

const StudentTable = () => {
  const { students } = useContext(StudentContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('id');

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

  const filteredItems = students.filter((item) =>
    [item.name, item.id].some((field) => {
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
    <div>
      <CInputGroup className="mb-3" style={{ maxWidth: '400px' }}>
        <CInputGroupText>Search</CInputGroupText>
        <CFormInput
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CDropdown className="marginLeft">
          <CDropdownToggle color="secondary">Sort By</CDropdownToggle>
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
      <CTable columns={columns} items={sortedItems}/>
    </div>
  );
};

export default StudentTable;