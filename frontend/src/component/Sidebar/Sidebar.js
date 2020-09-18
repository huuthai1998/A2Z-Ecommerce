import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { sidebarCategory, sidebarBrand } from '../ProductRender/ProductRender'

import { SidebarContext } from '../../App.js'
import { useAuth } from 'contexts/authContext'
import { Link, useHistory } from 'react-router-dom'

const Sidebar = () => {
  const authContext = useAuth()
  const sidebarContext = React.useContext(SidebarContext)
  const [showSidebar, setShowSidebar] = useState(sidebarContext.showSidebar)
  const history = useHistory()
  useEffect(() => {
    setShowSidebar(sidebarContext.showSidebar)
  })
  const handleLogOut = (e) => {
    e.preventDefault()
    authContext.logout()
    history.replace('/')
  }
  return (
    <div className="h-full bg-white w-full z-50 block">
      {showSidebar && (
        <button
          className="x text-4xl font-extrabold text-blue-500 z-50"
          onClick={() => {
            sidebarContext.toggleSidebar()
          }}
        >
          X
        </button>
      )}
      <div
        className={`h-full bg-white w-2/5 top-0 fixed z-50 sidebar flex flex-col ${
          !showSidebar ? 'hiddenSidebar' : ''
        }`}
      >
        {authContext.authContext.user !== undefined ? (
          <div className="bg-gray-700 flex justify-between p-4 ">
            <div className="flex items-baseline">
              <i className="fa fa-user" aria-hidden="true"></i>
              <Link
                onClick={() => {
                  sidebarContext.toggleSidebar()
                }}
                to="/setting"
                className="ml-2 text-white text-xl"
              >
                {'Hello, ' + authContext.authContext.user.name}
              </Link>
            </div>

            <div className="flex items-baseline">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <button
                className="ml-2 text-white text-xl"
                onClick={handleLogOut}
              >
                LOG OUT
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-700 flex justify-between p-4 ">
            <Link
              onClick={() => {
                sidebarContext.toggleSidebar()
              }}
              to={'/login'}
              className="flex items-baseline"
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              <p className="ml-2 text-white text-xl"> LOG IN</p>
            </Link>
          </div>
        )}

        <div className="overflow-y-scroll h-full ">
          <div className="p-4">
            <h1 className="text-gray-500">SHOP BY CATEGORY</h1>
            {sidebarCategory}
          </div>
          <div className="p-4">
            <h1 className="text-gray-500">SHOP BY BRAND</h1>
            {sidebarBrand}
          </div>
        </div>
      </div>
      {showSidebar && (
        <div
          className="h-full w-full absolute top-0 opacity-75 bg-black blank-sidebar z-10"
          onClick={sidebarContext.toggleSidebar}
        ></div>
      )}
    </div>
  )
}

export default Sidebar
