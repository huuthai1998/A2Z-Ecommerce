import routePaths from 'routing/paths'
import HomePage from 'pages/Home/Home'
import LoginPage from 'pages/Login/LoginPage'
import RegisterPage from 'pages/Register/RegisterPage'
import ResetPasswordPage from 'pages/ResetPassword/ResetPasswordPage'
import SettingPage from 'pages/Setting/SettingPage'
import Error from 'pages/Error/Error'
import Product from 'pages/Product/Product'
import Cart from 'pages/Cart/Cart'
import Checkout from 'pages/Checkout/Checkout'
import SearchPage from 'pages/Search/SearchPage'
import EditProduct from 'pages/ManageProduct/EditProduct'
import AddProduct from 'pages/ManageProduct/AddProduct'
import ManageProduct from 'pages/ManageProduct/ManageProduct'
import Orders from 'pages/Orders/Orders'

const config = [
  { path: routePaths.HOME, exact: true, component: HomePage },
  { path: routePaths.SEARCH, component: SearchPage },
  {
    path: routePaths.LOGIN,
    component: LoginPage,
    unAuthOnly: true,
    redirect: routePaths.HOME,
  },
  {
    path: routePaths.REGISTER,
    component: RegisterPage,
    redirect: routePaths.HOME,
    unAuthOnly: true,
  },
  { path: routePaths.RESET_PASSWORD, component: ResetPasswordPage },
  { path: routePaths.PRODUCT, component: Product },
  {
    path: routePaths.SETTING,
    authOnly: true,
    component: SettingPage,
    redirect: routePaths.LOGIN,
  },
  {
    path: routePaths.CART,
    component: Cart,
  },
  {
    path: routePaths.CHECKOUT,
    authOnly: true,
    redirect: routePaths.LOGIN,
    component: Checkout,
  },
  {
    path: routePaths.ORDERS,
    authOnly: true,
    redirect: routePaths.LOGIN,
    component: Orders,
  },
  { path: routePaths.ERROR, component: Error },
  {
    path: routePaths.EDIT_PRODUCT,
    authOnly: true,
    adminOnly: true,
    redirect: routePaths.LOGIN,
    component: EditProduct,
  },
  {
    path: routePaths.MANAGE_PRODUCT,
    authOnly: true,
    adminOnly: true,
    redirect: routePaths.LOGIN,
    component: ManageProduct,
  },
  {
    path: routePaths.ADD_PRODUCT,
    authOnly: true,
    adminOnly: true,
    redirect: routePaths.LOGIN,
    component: AddProduct,
  },
]

export default config
