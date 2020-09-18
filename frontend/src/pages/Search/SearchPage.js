import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { productImgs } from 'component/ProductRender/ProductRender'
import * as qs from 'qs'
import StarRater from 'component/StarRater/StarRater'

const axios = require('axios')

const SearchPage = (props) => {
  const [products, setProducts] = useState([])
  const [brand, setBrand] = useState([])
  const [category, setCategory] = useState([])

  const {
    category: categoryParam,
    brand: brandParam,
    name: nameParam,
  } = qs.parse(props.location.search, {
    ignoreQueryPrefix: true,
  })

  const history = useHistory()

  const checkboxHandler = (search) => (e) => {
    history.push({ pathname: '/search', search })
  }

  useEffect(() => {
    axios.get('https://a2z-ecommerce.herokuapp.com/product').then((product) => {
      setProducts(product.data)
    })
    axios.get('https://a2z-ecommerce.herokuapp.com/brand').then((brand) => {
      setBrand(brand.data)
    })
    axios
      .get('https://a2z-ecommerce.herokuapp.com/category')
      .then((category) => {
        setCategory(category.data)
      })
  }, [])
  var product = products.filter(
    (i) =>
      (categoryParam === undefined ||
        categoryParam.includes(i.category.replace(' ', ''))) &&
      (brandParam === undefined ||
        brandParam.includes(i.brand.replace(' ', ''))) &&
      (nameParam === undefined ||
        i.name.toLowerCase().includes(nameParam.toLowerCase()))
  )

  var productRender = product.map((i, key) => {
    return (
      <div
        className={`p-2 flex border-t-2 border-gray-300 mb-4 ${
          key === product.length - 1 && 'border-b-2'
        }`}
        key={key}
      >
        <Link to={`product/${i._id}`}>
          <img src={i.image} alt={i.name} className="w-32 h-32 mr-4" />
        </Link>
        <div className="flex flex-col">
          <Link to={`product/${i._id}`}>
            <h1 className="font-bold">{i.name}</h1>
          </Link>
          <StarRater product={i} id={i._id}></StarRater>
          <span className="font-bold">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(i.price)}
          </span>
        </div>
      </div>
    )
  })

  const categoryRender = category.map((item, key) => {
    var search = props.location.search
    if (categoryParam !== undefined) {
      if (categoryParam.includes(item.name.replace(' ', ''))) {
        if (categoryParam.includes(' ')) {
          search = search.replace(`+${item.name.replace(' ', '')}`, '')
          search = search.replace(`${item.name.replace(' ', '')}+`, '')
        } else if (!search.includes('brand')) {
          search = search.replace(`category=${item.name.replace(' ', '')}`, '')
        } else
          search = search.replace(`category=${item.name.replace(' ', '')}&`, '')
      } else {
        if (search.includes('category')) {
          search =
            search.slice(0, search.lastIndexOf('category=') + 9) +
            item.name.replace(' ', '') +
            '+' +
            search.slice(search.lastIndexOf('category=') + 9)
        } else if (!search.includes('brand'))
          search += `category=${item.name.replace(' ', '')}`
      }
    } else {
      search =
        search.slice(0, search.indexOf('?')) +
        `category=${item.name.replace(' ', '')}` +
        (props.location.search.includes('brand') ? '&' : '') +
        search.slice(search.indexOf('?') + 1)
    }
    return (
      <div className="block relative my-2" key={key}>
        <div className="flex items-center">
          <input
            type="checkbox"
            id={item.name}
            name={item.name}
            className="mr-2"
            onChange={checkboxHandler(search)}
            defaultChecked={
              categoryParam !== undefined &&
              categoryParam.includes(item.name.replace(' ', ''))
            }
          />
          <label className="" htmlFor={item.name}>
            {item.name}
          </label>
        </div>
      </div>
    )
  })

  const brandRender = brand.map((item, key) => {
    var search = props.location.search
    if (brandParam !== undefined) {
      if (brandParam.includes(item.name.replace(' ', ''))) {
        if (brandParam.includes(' ')) {
          search = search.replace(`+${item.name.replace(' ', '')}`, '')
          search = search.replace(`${item.name.replace(' ', '')}+`, '')
        } else if (categoryParam !== undefined || nameParam !== undefined) {
          search = search.replace(`&brand=${item.name.replace(' ', '')}`, '')
        } else
          search = search.replace(`brand=${item.name.replace(' ', '')}`, '')
      } else {
        if (search.includes('brand')) {
          search =
            search.slice(0, search.lastIndexOf('brand=') + 6) +
            item.name.replace(' ', '') +
            '+' +
            search.slice(search.lastIndexOf('brand=') + 6)
        } else if (!search.includes('category'))
          search += `brand=${item.name.replace(' ', '')}`
      }
    } else if (categoryParam === undefined)
      search += `brand=${item.name.replace(' ', '')}`
    else {
      search += `&brand=${item.name.replace(' ', '')}`
    }

    return (
      <div className="block relative my-2" key={key}>
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={checkboxHandler(search)}
            id={item.name}
            className="mr-2"
            defaultChecked={
              brandParam !== undefined &&
              brandParam.includes(item.name.replace(' ', ''))
            }
          />
          <label htmlFor={item.name} className="">
            {item.name}
          </label>
        </div>
      </div>
    )
  })

  return (
    <div className="min-h-screen p-8 flex justify-between">
      <div className="flex flex-col w-1/5">
        <div className="">
          <h1 className="font-bold">Category</h1>
          {categoryRender}
          <h1 className="font-bold mt-6">Brand</h1>
          {brandRender}
        </div>
      </div>
      <div className="flex-grow ml-4 px-4 border-l-2 border-gray-300">
        {' '}
        {productRender}
      </div>
    </div>
  )
}

export default SearchPage
