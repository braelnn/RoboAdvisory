import React from 'react'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Marketdata from './pages/MarketData'
import Login from './pages/Login'
import Register from './pages/Register'
import Faq from './pages/Faq'
import Chart from './components/Chart'
import PortfolioOverview from './components/PortfolioOverview'
import PortfolioList from './components/PortfolioList'
import PortfolioDetails from './components/PortfolioDetails'
import PortfolioForm from './components/PortfolioForm'
import Analytics from './pages/Analytics'
import EditProfile from './components/EditProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/marketdata' element={<Marketdata/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/Faq' element={<Faq/>}/>
        <Route path='/portfolio-overview' element={<PortfolioOverview/>}/>
        <Route path='/portfolio-list' element={<PortfolioList/>}/>
        <Route path='/portfolio-form' element={<PortfolioForm/>}/>
        <Route path='/portfolio-details' element={<PortfolioDetails/>}/>
        <Route path='/chart' element={<Chart/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}/>




      </Routes>
    </BrowserRouter>
  )
}

export default App