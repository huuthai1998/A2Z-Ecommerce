import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'contexts/authContext'
const axios = require('axios')

const ManageProduct = () => {
  const { authContext } = useAuth()
  const [products, setProducts] = useState()

  useEffect(() => {
    if (products === undefined)
      axios
        .get(`https://a2z-ecommerce.herokuapp.com/product/`)
        .then(({ data }) => {
          setProducts(data)
        })
  }, [products])

  const deleteProduct = (id) => async (e) => {
    try {
      e.preventDefault()
      await axios
        .delete(`https://a2z-ecommerce.herokuapp.com/product/${id}`, {
          headers: {
            Authorization: 'Bearer ' + authContext.user.token,
          },
          params: { isAdmin: authContext.user.isAdmin },
        })
        .then(() =>
          axios
            .get(`https://a2z-ecommerce.herokuapp.com/product/`)
            .then(({ data }) => {
              console.log(data)
              setProducts(data)
            })
        )
    } catch (err) {
      console.log(err.response)
    }
  }
  var productRender

  if (products !== undefined)
    productRender = products.map((item, i) => {
      return (
        <div className="p-1 flex my-3 bg-gray-300" key={i}>
          <p className="font-black w-1/12">{item._id}</p>
          <p className="font-black w-6/12">{item.name}</p>
          <p className="font-black w-2/12">{item.price}</p>
          <p className="font-black w-2/12">{item.category}</p>
          <p className="font-black w-2/12">{item.brand}</p>
          <div className="font-black w-3/12">
            <Link
              to={`edit_product/${item._id}`}
              className="bg-yellow-500 rounded p-1"
            >
              Update
            </Link>
            <button
              onClick={deleteProduct(item._id)}
              className="bg-red-500 rounded ml-3 p-1"
            >
              Delete
            </button>
          </div>
        </div>
      )
    })

  return (
    <div className="min-h-screen p-1 bg-white block">
      <main className="mx-auto sm:mt-10">
        <div className="flex justify-end">
          <h1 className="text-xl font-extrabold w-full mb-4">Manage Product</h1>
          <Link to="/add_product" className="bg-yellow-400 rounded p-1">
            <nobr className="text-lg"> Add new product</nobr>
          </Link>
        </div>
        <div className="flex mt-5">
          <p className="font-black w-1/12">ID</p>
          <p className="font-black w-6/12">Name</p>
          <p className="font-black w-2/12">Price</p>
          <p className="font-black w-2/12">Category</p>
          <p className="font-black w-2/12">Brand</p>
          <p className="font-black w-3/12">Action</p>
        </div>
        {productRender}
      </main>
    </div>
  )
}

export default ManageProduct
