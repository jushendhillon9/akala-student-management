import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavGroup,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilPuzzle } from '@coreui/icons';
import { StudentContext } from '../Contexts/StudentContext';

const SimpleSidebar = ( selectedThread ) => {
  const { students } = useContext(StudentContext);
  const [thisThreadID, setThisThreadID] = useState(selectedThread.studentId);

  const handleThreadSelect = (studentId) => {
	setThisThreadID(studentId);
  };

  return (
    <CSidebar className="border-end" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>SMP</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Navigation</CNavTitle>
        <NavLink
          to="/students"
          className={({ isActive }) => (isActive ? 'font-bold underline' : '')}
        >
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Students
          </CNavItem>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'font-bold underline' : '')}
        >
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> All threads
              </>
            }
          >
            {students.length > 0 ? (
              students.map((student) => (
                <NavLink
                  key={student.studentId}
                  to={`/thread/${thisThreadID}`}
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}
                  onClick={() => handleThreadSelect(student.studentId)}
                >
                  <CNavItem href="#">
                    <span className="nav-icon">
                      <span className="nav-icon-bullet"></span>
                    </span>{' '}
                    {student.name}
                  </CNavItem>
                </NavLink>
              ))
            ) : (
              <CNavItem href="#">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{' '}
                No threads available
              </CNavItem>
            )}
          </CNavGroup>
        </NavLink>
      </CSidebarNav>
    </CSidebar>
  );
};

export default SimpleSidebar;