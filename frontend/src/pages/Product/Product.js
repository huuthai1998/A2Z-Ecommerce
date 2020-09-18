import React, { useState, useEffect } from 'react'
import { productImgs } from 'component/ProductRender/ProductRender'
import { useCart } from 'contexts/cartContext'
import StarRater from 'component/StarRater/StarRater'
import { useHistory } from 'react-router-dom'

const axios = require('axios')

const Product = (props) => {
  const id = props.match.params.id
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const history = useHistory()
  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget
    if (name === 'qty') setQuantity(value)
  }

  useEffect(() => {
    if (product === undefined)
      axios
        .get(`https://a2z-ecommerce.herokuapp.com/product/${id}`)
        .then(({ data }) => {
          setProduct(data)
        })
  }, [product])

  const cartContext = useCart()

  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      setError('')
      await cartContext.addItems(id, quantity)
    } catch (err) {
      setError(err)
    }
  }

  const handleBuy = async (e) => {
    e.preventDefault()
    try {
      setError('')
      await cartContext.addItems(id, quantity)
      history.push('/cart')
    } catch (err) {
      setError(err)
    }
  }

  if (product === undefined) return <div className="p-4">Loading </div>
  else
    return (
      <div className="p-4">
        <div className="p-8 flex justify-around">
          <img src={product.image} alt={product.name} className="product-img" />
          <div className="flex flex-col w-64 flex-wrap ml-4">
            <h1 className="font-bold text-2xl"> {product.name} </h1>
            <StarRater product={product} id={id}></StarRater>
            <p className="">
              {'List price: '}
              <span className="font-bold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}
              </span>
            </p>
            <p className="">Brand: {product.brand}</p>
          </div>
          <div className="flex flex-col justify-between border-2 border-blue-400 rounded ml-2 p-2 w-64 h-64">
            <p className="text-red-700 text-xl font-bold">${product.price}</p>
            {product.stock > 0 ? (
              <p className="text-green-500 text-xl font-bold">In Stock</p>
            ) : (
              <p className="text-red-700 text-xl font-bold">Out of Stock</p>
            )}
            {product.stock > 0 && (
              <label htmlFor="" className="text-bold">
                Quantity:
              </label>
            )}
            {product.stock > 0 && (
              <select
                name="qty"
                onChange={onChangeHandler}
                className="w-10 border-2 border-black rounded"
              >
                {[...Array(product.stock).keys()].map((i) => {
                  if (i < 10)
                    return (
                      <option value={i + 1} className="" key={i}>
                        {i + 1}
                      </option>
                    )
                })}
              </select>
            )}
            <div className="text-red-600">{error}</div>
            {product.stock > 0 && (
              <button
                className="p-2 bg-yellow-400 rounded hover:bg-yellow-500"
                onClick={handleAdd}
              >
                Add to Cart
              </button>
            )}
            {product.stock > 0 && (
              <button
                className="p-2 bg-orange-400 rounded hover:bg-orange-500"
                onClick={handleBuy}
              >
                Buy now
              </button>
            )}
          </div>
        </div>
      </div>
    )
}

export default Product
