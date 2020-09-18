import React, { useState, useEffect } from 'react'
import { useAuth } from 'contexts/authContext'
import { Link } from 'react-router-dom'

const axios = require('axios')

const Orders = () => {
  const { authContext } = useAuth()
  const [orders, setOrders] = useState()
  useEffect(() => {
    if (orders === undefined)
      axios
        .get(`https://a2z-ecommerce.herokuapp.com/order/`, {
          params: { user: authContext.user._id },
        })
        .then(({ data }) => {
          setOrders(data)
        })
  }, [])

  const removeHandler = (id) => async (e) => {
    axios
      .delete(`https://a2z-ecommerce.herokuapp.com/order/${id}`, {
        headers: {
          Authorization: 'Bearer ' + authContext.user.token,
        },
      })
      .then(() => {
        axios
          .get(`https://a2z-ecommerce.herokuapp.com/order/`, {
            params: { user: authContext.user._id },
          })
          .then(({ data }) => {
            setOrders(data)
          })
      })
  }

  var ordersRender
  if (orders !== undefined) {
    ordersRender = orders.map((item, key) => {
      const create = new Date(item.createdAt)
      const date = create.getDate()
      const month = create.getMonth()
      const year = create.getFullYear()
      const hour = create.getHours()
      const minute = create.getMinutes()
      return (
        <div className="border-2 border-black rounded-md mb-4" key={key}>
          <div className="flex justify-between p-2 bg-gray-200">
            <div className="ml-5">
              <p className="">Order Placed: </p>
              <p className="">
                {month}/{date}/{year} {hour}:{minute}
              </p>
            </div>
            <div className="ml-5">
              <p className="">Item Price: </p>
              <span className="font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.itemPrice)}
              </span>
            </div>
            <div className="ml-5">
              <p className="">Shipping cost: </p>
              <span className="font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.shippingCost)}
              </span>
            </div>
            <div className="ml-5">
              <p className="">Total: </p>
              <span className="font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.totalPrice)}
              </span>
            </div>
            <button
              onClick={removeHandler(item._id)}
              className="text-red-600 text-4xl font-black cursor-pointer ml-auto"
            >
              X
            </button>
          </div>

          {item.items.map((item, key) => {
            return (
              <div className="flex p-2" key={key}>
                <Link
                  to={`/product/${item._id}`}
                  className="text-blue-600 text-xl font-bold w-6/12"
                >
                  {item.name}
                </Link>
                <div className="flex w-3/12">
                  Price:
                  <span className="font-bold ml-2">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.price)}
                  </span>
                </div>
                <span className="w-3/12">Quantity: {item.quantity}</span>
              </div>
            )
          })}
        </div>
      )
    })
  }
  return (
    <div className={`min-h-screen p-4 bg-white block`}>
      <main className="container mx-auto sm:mt-10">
        <div className="flex justify-end">
          <h1 className="text-xl font-extrabold w-full mb-4">Your Orders</h1>
        </div>
        {ordersRender}
      </main>
    </div>
  )
}

export default Orders
