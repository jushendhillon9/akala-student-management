import React, { useContext } from 'react';
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
import { ChatContext } from '../Contexts/ChatContext'; // Adjust the path as needed

const SimpleSidebar = () => {
  const { threads } = useContext(ChatContext); // Access threads from ChatContext

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
          to="/chat"
          className={({ isActive }) => (isActive ? 'font-bold underline' : '')}
        >
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> All threads
              </>
            }
          >
            {threads.length > 0 ? (
              threads.map((thread) => (
                <NavLink
                  key={thread.studentId}
                  to={`/chat/${thread.studentId}`} // Adjust the route as needed
                  className={({ isActive }) => (isActive ? 'font-bold' : '')}
                >
                  <CNavItem href="#">
                    <span className="nav-icon">
                      <span className="nav-icon-bullet"></span>
                    </span>{' '}
                    {thread.studentName || thread.studentId} {/* Display studentName or fallback to studentId */}
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