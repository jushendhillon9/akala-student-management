import React, { useContext, useState, useEffect } from 'react';
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
import { CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilSpeedometer, cilPuzzle, cilMenu } from '@coreui/icons';
import { StudentContext } from '../Contexts/StudentContext';

const SimpleSidebar = ({ onSelectThread }) => {
  const { students } = useContext(StudentContext);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleThreadSelect = (studentId) => {
    if (!studentId) {
      console.warn('Invalid studentId:', studentId);
      return;
    }
    if (onSelectThread) {
      console.log('Calling onSelectThread with studentId:', studentId);
      onSelectThread(studentId);
    }
  };

  return (
    <div>
      <CButton
        color="light"
        onClick={() => setVisible(!visible)}
      >
        <CIcon icon={cilMenu} size="lg" />
      </CButton>
      <CSidebar className="border-end" unfoldable visible={visible} onVisibleChange={setVisible} responsive="true">
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
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> All threads
              </>
            }
          >
            {students.length > 0 ? (
              students.map((student) => {
                if (!student.studentId) {
                  console.warn('Student with undefined studentId:', student);
                  return null;
                }
                return (
                  <NavLink
                    key={student.studentId}
                    to={`/thread/${student.studentId}`}
                    className={({ isActive }) => (isActive ? 'font-bold' : '')}
                    onClick={() => handleThreadSelect(student.studentId)}
                  >
                    <CNavItem href={`/thread/${student.studentId}`}>
                      <span className="nav-icon">
                        <span className="nav-icon-bullet"></span>
                      </span>{' '}
                      {student.name}
                    </CNavItem>
                  </NavLink>
                );
              })
            ) : (
              <CNavItem href="#">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{' '}
                No threads available
              </CNavItem>
            )}
          </CNavGroup>
        </CSidebarNav>
      </CSidebar>
    </div>
  );
};

export default SimpleSidebar;
