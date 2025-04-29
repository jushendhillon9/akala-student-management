import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CNavTitle,
  CNavGroup,
} from '@coreui/react';
import { CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import PlatformGif from '../assets/PlatfromGif.gif'
import { cilPencil, cilSchool, cilMenu } from '@coreui/icons';
import { StudentContext } from '../Contexts/StudentContext';

const SimpleSidebar = ({ onSelectThread }) => {
  const { students } = useContext(StudentContext);
  const [visible, setVisible] = useState(true);

  const getScreenClass = () => {
    if (location.pathname === '/' || location.pathname.startsWith('/thread/')) {
      return 'anchoring2';
    }
    return 'anchoring';
  };

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
		className={getScreenClass()}
      >
        <CIcon icon={cilMenu} size="lg" />
      </CButton>
      <CSidebar className="border-end sideBar" unfoldable visible={visible} onVisibleChange={setVisible} responsive="true">
        <CSidebarHeader className="border-bottom centerContent">
			Text
			<img className = "platformGif2" src={PlatformGif} alt="Sample GIF" />
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle className = "navigation">Navigation</CNavTitle>
		  <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'font-bold underline' : '')}
          >
			<CNavItem className="border-end sideBarItem" href="/">
              <CIcon customClassName="nav-icon" icon={cilSchool} /> Home
		    </CNavItem>	
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) => (isActive ? 'font-bold underline' : '')}
          >
            <CNavItem className="border-end sideBarItem" href="/students">
              <CIcon customClassName="nav-icon" icon={cilSchool} /> Students
            </CNavItem>
          </NavLink>
          <CNavGroup
		  	className="border-end sideBarItem"
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPencil} /> All threads
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
                    <CNavItem className = "sideBarThreads"href={`/thread/${student.studentId}`}>
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
