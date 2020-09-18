import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useAuth } from 'contexts/authContext'

const StarRater = ({ product, rating, id }) => {
  const [numShow, setNumShow] = useState(product.rating)
  const { authContext } = useAuth()
  const onHover = (idx) => (e) => {
    setNumShow(idx)
  }

  useEffect(() => {
    setNumShow(product.rating)
  }, [product])
  const mouseOut = () => {
    setNumShow(product.rating)
  }

  const rate = (idx) => async (e) => {
    try {
      ++product.numReviews
      product.rating =
        (idx + product.rating * (product.numReviews - 1)) / product.numReviews
      await Axios.put(
        `https://a2z-ecommerce.herokuapp.com/product/rating/${id}`,
        { product },
        {
          headers: {
            Authorization: 'Bearer ' + authContext.user.token,
          },
        }
      )
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <div>
      {[...Array(5).keys()].map((i) => {
        return (
          <span
            className="cursor-pointer"
            onMouseEnter={onHover(i + 1)}
            onMouseLeave={mouseOut}
            onClick={rate(i + 1)}
            key={i}
          >
            <i
              className={`fa fa-star${i + 1 > numShow + 0.5 ? '-o' : ''}`}
              aria-hidden="true"
            ></i>
          </span>
        )
      })}
      <p className="">in {product.numReviews} reviews</p>
    </div>
  )
}

export default StarRater
