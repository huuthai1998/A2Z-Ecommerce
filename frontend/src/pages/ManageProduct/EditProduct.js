import React, { useState, useEffect } from 'react'
import { useAuth } from 'contexts/authContext'
const axios = require('axios')

const EditProduct = (props) => {
  const id = props.match.params.id

  const { authContext } = useAuth()

  const [product, setProduct] = useState()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState()
  const [brand, setBrand] = useState('')
  const [rating, setRating] = useState()
  const [numReviews, setNumReviews] = useState()
  const [stock, setStock] = useState()
  const [error, setError] = useState('')

  useEffect(() => {
    if (product === undefined)
      axios
        .get(`https://a2z-ecommerce.herokuapp.com/product/${id}`)
        .then(({ data }) => {
          setProduct(data)
        })
  }, [])

  useEffect(() => {
    if (product !== undefined) {
      setName(product.name)
      setCategory(product.category)
      setPrice(product.price)
      setBrand(product.brand)
      setRating(product.rating)
      setNumReviews(product.numReviews)
      setStock(product.stock)
    }
  }, [product])

  const onChangeHandler = (e) => {
    const { name, value } = e.currentTarget
    switch (name) {
      case 'name':
        setName(value)
        break
      case 'category':
        setCategory(value)
        break
      case 'rating':
        setRating(parseFloat(value))
        break
      case 'brand':
        setBrand(value)
        break
      case 'price':
        setPrice(parseFloat(value))
        break
      case 'numReviews':
        setNumReviews(parseFloat(value))
        break
      case 'stock':
        setStock(parseFloat(value))
        break
    }
  }

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      axios
        .put(
          `https://a2z-ecommerce.herokuapp.com/product/${id}`,
          {
            user: authContext.user,
            product: {
              id: product.id,
              name,
              category,
              brand,
              price,
              rating,
              numReviews,
              stock,
            },
          },
          {
            headers: {
              Authorization: 'Bearer ' + authContext.user.token,
            },
          }
        )
        .then(({ data }) => console.log(data))
    } catch (err) {
      console.log(err.response)
      setError(err.response)
    }
  }

  return (
    <div className="min-h-screen p-4 bg-black">
      <main className="container mx-auto max-w-md">
        <div className="bg-gray-800 rounded-t-lg  text-white text-center text-xl py-4">
          Edit Product
        </div>
        <form className="bg-gray-700 shadow-md p-8" onSubmit={submitHandler}>
          <fieldset>
            {error && (
              <div className="p-2 bg-red-700 text-gray-100 text-center text-xl mb-4 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label className="text-white text-lg font-bold" htmlFor="name">
                Name
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="name"
                  type="text"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={name}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label
                className="text-white text-lg mb-2 font-bold"
                name="category"
                htmlFor="category"
              >
                Category
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="category"
                  type="text"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={category}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label
                className="text-white text-lg mb-2 font-bold"
                name="brand"
                htmlFor="brand"
              >
                Brand
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="brand"
                  type="text"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={brand}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label
                className="text-white text-lg mb-2 font-bold"
                name="price"
                htmlFor="price"
              >
                Price
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={price}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label
                className="text-white text-lg mb-2 font-bold"
                name="rating"
                htmlFor="rating"
              >
                Rating
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={rating}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label
                className="text-white text-lg mb-2 font-bold"
                name="numReviews"
                htmlFor="numReviews"
              >
                Number of Reviews
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="numReviews"
                  type="number"
                  step="1"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={numReviews}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-baseline justify-between mb-2 w-full">
              <label
                className="text-white text-lg mb-2 font-bold"
                name="stock"
                htmlFor="stock"
              >
                Stock
              </label>
              <div className="mb-4 w-full sm:w-2/3">
                <input
                  name="stock"
                  type="number"
                  step="1"
                  required
                  className="shadow appearance-none outline-none rounded w-full py-2 px-3 mb-2
                    bg-gray-900 text-gray-100 leading-tight focus:shadow-outline"
                  onChange={onChangeHandler}
                  defaultValue={stock}
                />
              </div>
            </div>
            <button
              className="w-full bg-red-400 text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline hover:bg-red-500"
              type="submit"
            >
              Save
            </button>
          </fieldset>
        </form>
      </main>
    </div>
  )
}

export default EditProduct
