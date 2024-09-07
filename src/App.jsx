import React from "react"
import { BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Layout from './shared/Layout'
import Dashboard from "./Dashboard"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
