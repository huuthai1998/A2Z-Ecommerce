import React, { useState, useEffect } from 'react'
import NavBar from 'component/NavBar/NavBar'
import Sidebar from 'component/Sidebar/Sidebar'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'contexts/authContext'
import RoutingSwitch from 'routing/RoutingSwitch'
import { CartProvider } from 'contexts/cartContext'

export const SidebarContext = React.createContext({
  showSidebar: false,
  toggleSidebar: () => {},
})

const App = () => {
  const sidebarContext = React.useContext(SidebarContext)
  const [showSidebar, setShowSidebar] = useState(sidebarContext.showSidebar)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  useEffect(() => {
    if (showSidebar) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
  }, [showSidebar])

  return (
    <AuthProvider>
      <CartProvider>
        <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
          <BrowserRouter>
            <NavBar />
            <Sidebar />
            <RoutingSwitch />
          </BrowserRouter>
        </SidebarContext.Provider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
