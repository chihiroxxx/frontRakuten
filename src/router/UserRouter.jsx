import React from 'react'
import { Index } from '../components/Index'


export const UserRouter = () => [
  {
    path: "/",
    exact: true,
    children: <Index />
  }
]
