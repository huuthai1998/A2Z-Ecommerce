import React, { useEffect, useState } from 'react'
import { SidebarContext } from '../../App.js'
import { Link } from 'react-router-dom'
const axios = require('axios')

const Home = () => {
  const [category, setCategory] = useState()
  useEffect(() => {
    if (category === undefined) {
      axios
        .get(`https://a2z-ecommerce.herokuapp.com/category`)
        .then(({ data }) => {
          setCategory(data)
        })
    }
  }, [category])

  var categoryRender

  if (category !== undefined) {
    categoryRender = category.map((item, key) => {
      return (
        <Link
          to={{
            pathname: `/search`,
            search: `?category=${item.name}`,
          }}
          className="block relative mx-5 my-5"
          key={key}
        >
          <img src={item.image} alt={item.name} className="h-64 w-64" />
          <div className="text-in-img opacity-75">
            <p className="font-bold">{item.name}</p>
          </div>
        </Link>
      )
    })
  }

  const sidebarContext = React.useContext(SidebarContext)
  return (
    <div
      className={`min-h-screen p-4 bg-white block ${
        sidebarContext.showSidebar ? 'overflow-hidden' : 'overflow-auto'
      }`}
    >
      <main className="container mx-auto sm:mt-10">
        <h1 className="text-3xl font-extrabold w-full text-center mb-4">
          What do you want to buy today?
        </h1>
        <div className="flex flex-col sm:flex-row justify-between flex-wrap">
          {categoryRender}
        </div>
      </main>
    </div>
  )
}

export default Home
