import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './NavBar.css'
import { SidebarContext } from '../../App.js'
import { useCart } from 'contexts/cartContext'
import { useAuth } from 'contexts/authContext'

const NavBar = () => {
  const { authContext, logout } = useAuth()
  const sidebarContext = React.useContext(SidebarContext)

  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [dropdown, setDropdown] = useState(false)

  const cartContext = useCart()
  const history = useHistory()

  const dropdownHandler = () => {
    setDropdown(!dropdown)
  }
  const handleLogOut = (e) => {
    e.preventDefault()
    dropdownHandler()
    logout()
  }

  const dropdownMenu = () => {
    if (authContext.user && authContext.user.isAdmin)
      return (
        <div className="bg-blue-900 absolute p-2 rounded-md dropdown-menu">
          <Link
            onClick={dropdownHandler}
            to="/setting"
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fas fa-user-cog"></i>
            </div>
            <nobr className="text-white ml-2 text-lg"> Account info</nobr>
          </Link>
          <Link
            onClick={dropdownHandler}
            to="/manage_product"
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fas fa-toolbox"></i>
            </div>
            <nobr className="text-white ml-2 text-lg"> Manage product</nobr>
          </Link>
          <Link
            onClick={dropdownHandler}
            to="/orders"
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fa fa-tasks"></i>
            </div>
            <nobr className="text-white ml-2 text-lg"> Your orders</nobr>
          </Link>
          <div
            onClick={handleLogOut}
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20 cursor-pointer"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </div>
            <nobr className="text-white ml-2 text-lg">Log out</nobr>
          </div>
        </div>
      )
    else
      return (
        <div className="bg-blue-900 absolute p-2 rounded-md dropdown-menu">
          <Link
            onClick={dropdownHandler}
            to="/setting"
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fas fa-user-cog"></i>
            </div>
            <nobr className="text-white ml-2 text-lg"> Account info</nobr>
          </Link>
          <Link
            onClick={dropdownHandler}
            to="/orders"
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fa fa-tasks"></i>
            </div>
            <nobr className="text-white ml-2 text-lg"> Your orders</nobr>
          </Link>
          <div
            onClick={handleLogOut}
            className="relative flex p-1 items-center hover:bg-gray-600 rounded-md z-20 cursor-pointer"
          >
            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </div>
            <nobr className="text-white ml-2 text-lg">Log out</nobr>
          </div>
        </div>
      )
  }

  const searchHandler = (e) => {
    var search = ''
    if (name !== '') {
      if (category === '' || category === 'All') search = `?name=${name}`
      else search = `?category=${category}&name=${name}`
    } else {
      if (category !== '' && category !== 'All' && name === '')
        search = `?category=${category}`
    }
    e.preventDefault()
    history.push({ pathname: '/search', search })
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget
    if (name === 'name') setName(value)
    else if (name === 'category') setCategory(value)
  }
  return (
    <header className="sticky top-0 bg-gray-900 z-10">
      <div className="container sm:items-center">
        <div className="flex items-center p-2">
          <button
            className="ml-5 focus:outline-none border-solid border-white border-2 p-2"
            onClick={() => sidebarContext.toggleSidebar()}
          >
            <i className="fas fa-bars block fa-2x text-white" />
          </button>
          <Link className="text-center w-3/12" to="/">
            <h1 className="text-white text-xl">A2Z</h1>
          </Link>
          <form
            className="ml-5 flex search-bar rounded-md w-6/12"
            onSubmit={searchHandler}
          >
            <select
              name="category"
              className="bg-gray-200 rounded-l-md p-2 w-20"
              onChange={onChangeHandler}
            >
              <option>All</option>
              <option className="p-2">Sweater</option>
              <option>Shoes</option>
              <option>Shirt</option>
              <option>Jersey</option>
              <option>Short</option>
              <option>Pant</option>
              <option>Jacket</option>
            </select>
            <input
              name="name"
              className="w-8/12 py-2 px-3 appearance-none text-black leading-tight outline-none"
              onChange={onChangeHandler}
            ></input>
            <button className="bg-blue-400 p-2 rounded-r-md">
              <i className="fa fa-search fa-2x"></i>
            </button>
          </form>
          <Link to="/cart" className="ml-5 w-24 flex text-white">
            <button className="text-white flex cart-wrapper h-8 items-baseline">
              <i className="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
              <p>Cart</p>
            </button>
            {cartContext.numItems > 0 ? (
              <span className="relative rounded-full h-5 w-5 flex items-center justify-center bg-red-600 z-10 cart-count">
                {cartContext.numItems}
              </span>
            ) : (
              <></>
            )}
          </Link>
          {authContext.authenticated ? (
            <div className="relative ml-5">
              {dropdown && dropdownMenu()}
              <div
                className="w-24 flex flex cart-wrapper h-8 items-baseline cursor-pointer"
                onClick={dropdownHandler}
              >
                <i
                  className="fa fa-user fa-2x mr-2 text-white"
                  aria-hidden="true"
                ></i>
                <p className="text-white">{authContext.user.name}</p>
                <i className="fas fa-caret-down ml-2 text-white"></i>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-5 w-24 flex text-white flex cart-wrapper h-8 items-baseline"
            >
              <i className="fa fa-user fa-2x mr-2" aria-hidden="true"></i>
              Login
            </Link>
          )}
          {dropdown && (
            <div
              onClick={dropdownHandler}
              className="h-screen w-screen top-0 left-0 blank-dropdown"
            ></div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
