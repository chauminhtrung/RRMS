import Detail from './pages/Detail/Detail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Homes/Home'
import Chart from './pages/Charts/Chart'
import Header from './layouts/Header/Header'
import Search from './pages/search/Search'
import Footer from './layouts/Footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Forgot_Password from './pages/Forgot-Password/Forgot_Password'

import Support from './pages/Support/Support'

import AdminStatis from './pages/admin/statistical'

import MainManagement from './pages/admin/MainManagement'

import AdminManagerGroup from './pages/admin/AdminManagerGroup'
import Contact from './pages/Contact/Contact'
import Introduce from './pages/Introduce/Introduce'
import AdminManagerBoard from './pages/admin/AdminManageBoard'
import Profile from './pages/Profile/Profile'
import PaymentPage from './pages/cart/PaymentPage'
import { useState } from 'react'
import Heart from './pages/cart/Heart'
import RRMS from './pages/RRMS/RRMS'
import AdminManageBoker from './pages/admin/AdminManageBoker/AdminManageBoker'
import PostRooms from './pages/PostRooms/PostRooms'

// import TestPage from './pages/TestPage'
// import ValidCaptcha from './components/ValidCaptcha'

function App() {
  //Muốn mất header thì thêm props setIsAdmin={setIsAdmin}
  // useEffect(() => {
  //   setIsAdmin(true)
  // }, [])
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <>
      <Router>
        {/* <ValidCaptcha /> */}
        {!isAdmin ? <Header /> : <></>}
        <Routes>
          <Route path="/" element={<Home setIsAdmin={setIsAdmin} />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/admin" element={<MainManagement setIsAdmin={setIsAdmin} />} />
          <Route path="/adminBoker" element={<AdminManageBoker />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/AdminStatis" element={<AdminStatis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<Forgot_Password />} />
          <Route path="/support" element={<Support />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/heart" element={<Heart />} />
          <Route path="/RRMS" element={<RRMS />} />
          <Route path="/AdminManagerBoard" element={<AdminManagerBoard />} />
          <Route path="/dang-tin" element={<PostRooms />} />
          <Route path="/AdminManagerGroup" element={<AdminManagerGroup />} />
        </Routes>
        {!isAdmin ? <Footer /> : <></>}
      </Router>
    </>
  )
}

export default App
