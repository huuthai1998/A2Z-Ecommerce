import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useCart } from 'contexts/cartContext'
import 'pages/Cart/Cart.css'
import { useAuth } from 'contexts/authContext'
const axios = require('axios')

const Cart = () => {
  const history = useHistory()
  const { authContext } = useAuth()
  const cartContext = useCart()
  const [data, setData] = useState([])
  const [itemTotal, setItemTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [quantity, setQuantity] = useState([])
  const [address, setAddress] = useState(
    authContext.user && authContext.user.address
  )
  const [shipment, setShipment] = useState('standard')

  useEffect(() => {
    if (authContext.user !== undefined) {
      setAddress(authContext.user.address)
    }
  }, [authContext])

  const onChangeShipment = (e) => {
    switch (e.target.name) {
      case 'address':
        setAddress(e.target.value)
        break
      case 'shipment':
        setShipment(e.target.value)
        break
    }
  }

  useEffect(() => {
    axios.get('https://a2z-ecommerce.herokuapp.com/product').then((product) => {
      setData(product.data)
    })
  }, [])

  const updateQuantityHandle = (id, key) => (e) => {
    cartContext.setQuantity(id, quantity[key])
  }

  const onChangeHandler = (e, i) => {
    var qty = [...quantity]
    qty[i] = parseInt(e.currentTarget.value)
    setQuantity(qty)
  }
  var qt = []
  var temp = 0

  const checkOutHandler = () => {
    if (authContext.user) {
      try {
        axios.post(
          'https://a2z-ecommerce.herokuapp.com/order',
          {
            items: cartContext.items,
            buyer: authContext.user._id,
            address,
            shipment,
            itemPrice: itemTotal,
            totalPrice: total,
            shippingCost: shipment === 'standard' ? 0 : 6.99,
          },
          {
            headers: {
              Authorization: 'Bearer ' + authContext.user.token,
            },
          }
        )
        cartContext.clearCart()
        alert('Order placed!')
      } catch (err) {
        alert(err.response)
      }
    } else {
      alert('Please log in first')
      history.push('/login')
    }
  }

  const cartProduct = Object.keys(cartContext.items).map((key, i) => {
    if (data.length !== 0) {
      const product = data.find((item) => item._id === key)
      if (product !== undefined) {
        temp += cartContext.items[key] * product.price
        qt[i] = cartContext.items[key]
        return (
          <div
            className="p-4 flex border-black border-2 rounded mb-5 justify-between"
            key={i}
          >
            <div className="flex flex-col">
              <Link
                to={`/product/${key}`}
                target="_blank"
                className="font-bold text-xl text-blue-400"
              >
                {product.name}
              </Link>
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32"
              />
            </div>
            <div className="flex flex-col text-right">
              <span
                className="text-red-600 text-xl font-black cursor-pointer ml-auto"
                onClick={() => cartContext.removeItems(key)}
              >
                X
              </span>
              <span className="">
                {'Price: '}
                <span className="font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(product.price)}
                </span>
              </span>
              <span className="ml-auto flex">
                {'Quantity: '}
                <select
                  name="qty"
                  defaultValue={cartContext.items[key]}
                  className="w-10 border-2 border-black rounded ml-2"
                  onChange={(e) => onChangeHandler(e, i)}
                >
                  {[...Array(product.stock).keys()].map((i) => {
                    return (
                      <option value={i + 1} className="" key={i}>
                        {i + 1}
                      </option>
                    )
                  })}
                </select>
                <button
                  className="bg-yellow-500 rounded px-1 ml-2"
                  onClick={updateQuantityHandle(key, i)}
                >
                  Update
                </button>
              </span>
            </div>
          </div>
        )
      } else cartContext.removeItems(key)
    }
  })

  useEffect(() => {
    setItemTotal(temp)
    setQuantity(qt)
    setTotal(shipment === 'standard' ? temp + 0 : temp + 6.99)
  }, [cartContext.numItems, data, shipment])

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between">
        <div className="w-2/3 mr-5">
          <form className="p-2 flex flex-col items-center justify-between mb-2 w-full border-2 border-black rounded-md">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-2 w-full">
              <label className="text-lg font-bold" htmlFor="address">
                Shipping address
              </label>
              <div className="mb-2 w-full sm:w-2/3">
                <textarea
                  name="address"
                  defaultValue={address}
                  onChange={onChangeShipment}
                  type="text"
                  required
                  className="border-2 border-black shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                leading-tight focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-2 w-full">
              <h1 className="text-lg font-bold">Delivering options</h1>
              <div className="mb-2">
                <input
                  name="shipment"
                  id="standard"
                  value="standard"
                  defaultChecked="true"
                  onClick={onChangeShipment}
                  type="radio"
                  required
                  className=""
                ></input>
                <label className="text-lg ml-2" htmlFor="standard">
                  <span>
                    Standard (7 days)
                    <p className="text-green-300 ml-5">FREE</p>
                  </span>
                </label>
              </div>
              <div className="mb-2">
                <input
                  name="shipment"
                  id="fast"
                  value="fast"
                  onClick={onChangeShipment}
                  type="radio"
                  required
                  className=""
                ></input>
                <label className="text-lg ml-2" htmlFor="fast">
                  <span>
                    Fast (2 days)
                    <p className="ml-5">$6.99</p>
                  </span>
                </label>
              </div>
            </div>
          </form>
          {cartProduct}
        </div>
        <div className="">
          <div className="border-2 border-black p-4 flex flex-col justify-around checkout-wrapper">
            <h1 className="text-lg">
              {'Total ('}
              <span className="font-bold">{cartContext.numItems}</span>)
              {cartContext.numItems > 1 ? ' items' : ' item'} :
              <span className="font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(itemTotal)}
              </span>
            </h1>
            {shipment !== 'fast' ? (
              <h1 className="text-lg">
                Shipping: <span className="font-bold">Free</span>
              </h1>
            ) : (
              <h1 className="text-lg">
                Shipping: <span className="font-bold">$6.99</span>
              </h1>
            )}
            <h1 className="text-lg">
              Subtotal:{' '}
              <span className="font-bold">
                <span className="font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(total)}
                </span>
              </span>
            </h1>
            <button
              className="bg-yellow-400 p-2 rounded w-full mt-5 text-xl font-extrabold"
              onClick={checkOutHandler}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
