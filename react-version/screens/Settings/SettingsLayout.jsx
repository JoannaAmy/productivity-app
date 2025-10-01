import { Outlet } from 'react-router-dom'
import React from 'react'
import SideBar from '../../components/SideBar'
import './Layout.css'
import SettingsHeader from '../../components/SettingsHeader'

function SettingsLayout() {
  return (
    <>
        <div className="layout">
          <SideBar />
          <div className='screen'>
            <SettingsHeader />
            <Outlet />
          </div>
        </div>
    </>
  )
}

export default SettingsLayout
