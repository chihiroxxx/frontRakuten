import React from 'react'
import { Index } from '../components/Index'
import { UserDetail } from '../components/UserDetail'


export const UserRouter = () => [
  {
    path: "/",
    exact: true,
    children: <Index />
  },
  {
    path: "/:id",
    exact: false,
    children: <UserDetail />
  }
]
