import React, { useState, useEffect } from 'react'
import Cookie from 'js-cookie'

const axios = require('axios')
const CartContext = React.createContext({
  numItems: 0,
  items: {},
  addItems: (id, quantity) => {},
  removeItems: (id) => {},
  setQuantity: (id, qty) => {},
  clearCart: () => {},
})

export const CartProvider = ({ children }) => {
  const cartContext = React.useContext(CartContext)
  const [numItems, setNumItems] = useState(cartContext.numItems)
  const [items, setItems] = useState(
    Cookie.getJSON('cart') || cartContext.items
  )

  useEffect(() => {
    var qty = 0
    Object.keys(items).forEach((key) => {
      qty += items[key]
    })
    setNumItems(qty)
  }, [])

  const clearCart = () => {
    setNumItems(0)
    setItems({})
  }

  const addItems = async (id, quantity) => {
    const { data } = await axios.get(
      `https://a2z-ecommerce.herokuapp.com/product/${id}`
    )
    try {
      if (id in items) {
        if (data.stock >= parseInt(quantity) + parseInt(items[id])) {
          let addQty = (parseInt(items[id]) + parseInt(quantity)).toString()
          setItems({ ...items, [id]: addQty })
        } else throw 'Out of Stock'
      } else {
        if (data.stock >= parseInt(quantity))
          setItems({ ...items, [id]: quantity })
        else throw 'Out of Stock'
      }
      setNumItems(numItems + parseInt(quantity))
    } catch (err) {
      throw err
    }
  }

  const setQuantity = (id, qty) => {
    setNumItems(numItems + (qty - items[id]))
    setItems({ ...items, [id]: qty })
  }

  const removeItems = (id) => {
    var temp = { ...items }
    delete temp[id]
    setItems(temp)
    setNumItems(numItems - 1)
  }

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(items), { expires: 7 })
  }, [items])

  return (
    <CartContext.Provider
      value={{
        numItems,
        items,
        addItems,
        removeItems,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => React.useContext(CartContext)
