import React from 'react'
import './productRender.css'
import { Link } from 'react-router-dom'

export const brand = [
  { name: 'Nike' },
  { name: 'Adidas' },
  { name: 'Puma' },
  { name: 'Converse' },
  { name: 'Reebok' },
  { name: 'Under Armor' },
  { name: 'Sketcher' },
  { name: 'Kappa' },
]

export const category = [
  { name: 'Sweater' },
  { name: 'Shoes' },
  { name: 'Shirt' },
  { name: 'Jersey' },
  { name: 'Short' },
  { name: 'Pant' },
  { name: 'Jacket' },
]

export const sidebarCategory = category.map((item, key) => {
  return (
    <Link
      to={{
        pathname: `/search`,
        search: `?category=${item.name}`,
      }}
      className="block relative mx-5 my-5"
      key={key}
    >
      <div className="flex justify-between" to={`/${item.name}`}>
        <span className="font-bold">{item.name}</span>{' '}
        <span className="text-gray-500">{'>'}</span>{' '}
      </div>
    </Link>
  )
})

export const sidebarBrand = brand.map((item, key) => {
  return (
    <Link
      to={{
        pathname: `/search`,
        search: `?brand=${item.name}`,
      }}
      className="block relative mx-5 my-5"
      key={key}
    >
      <div className="flex justify-between" to={`/${item.name}`}>
        <span className="font-bold">{item.name}</span>
        <span className="text-gray-500">{'>'}</span>
      </div>
    </Link>
  )
})
