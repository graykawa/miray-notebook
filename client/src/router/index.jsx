import React from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router'

// 路由懒加载
const Login = React.lazy(() => import('../pages/Login'))
const NoteClass = React.lazy(() => import('../pages/NoteClass'))
const Register = React.lazy(() => import('../pages/Register'))

const routes = [
  {
    path: '/',
    element: <Navigate to='/noteClass' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/noteClass',
    element: <NoteClass />
  },
  {
    path: '/register',
    element: <Register />
  }
]

function WrapperRoutes() {  
  // useRoutes 这个 hook 函数只能用在路由组件中，也就是说，该组件不能被抛出
  let ele = useRoutes(routes) // <Routes></Routes>
  return ele
}
export default function WrapperRouter() {
  return (
    <BrowserRouter>
      <WrapperRoutes />
    </BrowserRouter>
  )
}