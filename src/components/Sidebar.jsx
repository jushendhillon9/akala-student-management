import React from 'react'
import { NavLink } from 'react-router-dom';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CNavTitle,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {cilSpeedometer } from '@coreui/icons'

const SimpleSidebar = () => {
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
			<CNavItem href="#">
			<CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Chat
			</CNavItem>
		</NavLink>
      </CSidebarNav>
    </CSidebar>
  )
}

export default SimpleSidebar;