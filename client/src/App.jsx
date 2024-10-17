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

import MainManagement from './pages/admin/ManagerHome/MainManagement'

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
import AdminManage from './pages/admin/AdminManage/AdminManage'
import ChatAI from './pages/AI/ChatAI'
import Audio from './pages/AI/Audio'
import RoomManagement from './pages/admin/AdminManage/RoomManagement'
import Recognition from './pages/AI/Recognition'
import FaceMatch from './pages/AI/FaceMatch'

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
        {/* <ChatAI /> */}
        {/* <ValidCaptcha /> */}
        {!isAdmin ? <Header /> : <></>}
        <Routes>
          <Route path="/" element={<Home setIsAdmin={setIsAdmin} />} />
          <Route path="/chart" element={<Chart setIsAdmin={setIsAdmin} />} />
          <Route path="/audio" element={<Audio setIsAdmin={setIsAdmin} />} />
          <Route path="/recognition" element={<Recognition setIsAdmin={setIsAdmin} />} />
          <Route path="/facematch" element={<FaceMatch setIsAdmin={setIsAdmin} />} />
          <Route path="/search" element={<Search setIsAdmin={setIsAdmin} />} />
          <Route path="/detail/:roomId" element={<Detail setIsAdmin={setIsAdmin} />} />
          <Route path="/forgot-password" element={<Forgot_Password setIsAdmin={setIsAdmin} />} />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route path="/contact" element={<Contact setIsAdmin={setIsAdmin} />} />
          <Route path="/introduce" element={<Introduce setIsAdmin={setIsAdmin} />} />
          <Route path="/register" element={<Register setIsAdmin={setIsAdmin} />} />
          <Route path="/profile" element={<Profile setIsAdmin={setIsAdmin} />} />
          <Route path="/payment" element={<PaymentPage setIsAdmin={setIsAdmin} />} />
          <Route path="/support" element={<Support setIsAdmin={setIsAdmin} />} />
          <Route path="/heart" element={<Heart setIsAdmin={setIsAdmin} />} />
          <Route path="/RRMS" element={<RRMS setIsAdmin={setIsAdmin} />} />
          {/* Admin page */}
          <Route path="/admin" element={<MainManagement setIsAdmin={setIsAdmin} />} />
          <Route path="/adminBoker" element={<AdminManageBoker setIsAdmin={setIsAdmin} />} />
          <Route path="/adminManage" element={<AdminManage setIsAdmin={setIsAdmin} />} />
          <Route path="/roomManagement" element={<RoomManagement setIsAdmin={setIsAdmin} />} />
          <Route path="/AdminStatis" element={<AdminStatis setIsAdmin={setIsAdmin} />} />
          <Route path="/AdminManagerBoard" element={<AdminManagerBoard setIsAdmin={setIsAdmin} />} />
          <Route path="/AdminManagerGroup" element={<AdminManagerGroup setIsAdmin={setIsAdmin} />} />
          <Route path="/dang-tin" element={<PostRooms setIsAdmin={setIsAdmin} />} />
        </Routes>
        {!isAdmin ? <Footer /> : <></>}
      </Router>
    </>
  )
}

export default App
