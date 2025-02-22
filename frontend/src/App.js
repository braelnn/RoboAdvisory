import React from 'react'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import Login from './pages/Login'
import Register from './pages/Register'
import Faq from './pages/Faq'
import MarketData from './pages/MarketData'
import ServicesPage from './pages/ServicesPage'
import ProfilePage from './pages/ProfilePage' 
import ReportingNotificationsPage from './pages/ReportingNotificationsPage'
import DashboardPortfolio from './pages/DashboardPortfolio'
import PortfolioManagement from "./pages/PortfolioManagement";
import StockMarket from "./pages/StockMarket";
import AdminDashboard from './pages/AdminDashboard'


import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/adminDashboard" element={<AdminDashboard />} />

        <Route path="/portfolio" element={<DashboardPortfolio />}/>
        <Route path="/portfoliomgmt" element={<PortfolioManagement />} />
        <Route path="/stocks" element={<StockMarket />} />
        <Route path="/repo&notif" element={<ReportingNotificationsPage />} />

        <Route path='/home' element={<Home/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/Faq' element={<Faq/>}/>
        <Route path='/marketdata' element={<MarketData/>}/>
        <Route path='/services' element={<ServicesPage/>}/>
        <Route path='/edit-profile' element={<ProfilePage/>}/>





      </Routes>
    </BrowserRouter>
  )
}

export default App