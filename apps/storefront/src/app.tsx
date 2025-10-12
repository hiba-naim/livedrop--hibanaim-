import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./components/organisms/navbar"

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
