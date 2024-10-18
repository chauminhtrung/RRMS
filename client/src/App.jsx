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
import ManagerMyAccount from './pages/admin/ManagerMyAccount/ManagerMyAccount'
import ManagerCompanyAT from './pages/admin/ManagerCompanyAT/ManagerCompanyAT'
import ManagerSettings from './pages/admin/ManagerSettings/ManagerSettings'

import AdminManagerGroup from './pages/admin/AdminManagerGroup'
import Contact from './pages/Contact/Contact'
import Introduce from './pages/Introduce/Introduce'
import AdminManagerBoard from './pages/admin/AdminManageBoard'
import Profile from './pages/Profile/Profile'
import PaymentPage from './pages/cart/PaymentPage'
import { useState, useEffect } from 'react'
import Heart from './pages/cart/Heart'
import RRMS from './pages/RRMS/RRMS'
import AdminManageBoker from './pages/admin/AdminManageBoker/AdminManageBoker'
import PostRooms from './pages/PostRooms/PostRooms'
import AdminManage from './pages/admin/AdminManage/AdminManage'
import Audio from './pages/AI/Audio'

import { getMotelByUsername } from '~/apis/apiClient'

import RoomManagement from './pages/admin/AdminManage/RoomManagement'
import Recognition from './pages/AI/Recognition'
import FaceMatch from './pages/AI/FaceMatch'

// import TestPage from './pages/TestPage'
// import ValidCaptcha from './components/ValidCaptcha'

function App() {
  //lay thong tin tro cua tk account truyen xuong cho trang chu tro

  useEffect(() => {
    fetchMotelsByUsername('admin')
  }, [])

  const fetchMotelsByUsername = async (username) => {
    getMotelByUsername(username).then((res) => {
      setmotels(res.data.result)
    })
  }

  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  //Muốn mất header thì thêm props setIsAdmin={setIsAdmin}
  useEffect(() => {
    //   setIsAdmin(true)
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      setUsername(user.username)
      setAvatar(user.avatar)
    }
  }, [])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isNavAdmin, setIsNavAdmin] = useState(true)
  const [motels, setmotels] = useState([])
  return (
    <>
      <Router>
        {/* <ValidCaptcha /> */}
        {!isAdmin ? <Header username={username} avatar={avatar} /> : <></>}
        <Routes>
          <Route path="/" element={<Home setIsAdmin={setIsAdmin} />} />
          <Route path="/chart" element={<Chart setIsAdmin={setIsAdmin} />} />
          <Route path="/audio" element={<Audio setIsAdmin={setIsAdmin} />} />
          <Route path="/recognition" element={<Recognition setIsAdmin={setIsAdmin} />} />
          <Route path="/facematch" element={<FaceMatch setIsAdmin={setIsAdmin} />} />
          <Route path="/search" element={<Search setIsAdmin={setIsAdmin} />} />
          <Route path="/detail/:roomId" element={<Detail setIsAdmin={setIsAdmin} />} />
          <Route path="/forgot-password" element={<Forgot_Password setIsAdmin={setIsAdmin} />} />
          <Route
            path="/login"
            element={<Login setUsername={setUsername} setAvatar={setAvatar} setIsAdmin={setIsAdmin} />}
          />
          <Route path="/contact" element={<Contact setIsAdmin={setIsAdmin} />} />
          <Route path="/introduce" element={<Introduce setIsAdmin={setIsAdmin} />} />
          <Route path="/register" element={<Register setIsAdmin={setIsAdmin} />} />
          <Route path="/profile" element={<Profile setIsAdmin={setIsAdmin} />} />
          <Route path="/payment" element={<PaymentPage setIsAdmin={setIsAdmin} />} />
          <Route path="/support" element={<Support setIsAdmin={setIsAdmin} />} />
          <Route path="/heart" element={<Heart setIsAdmin={setIsAdmin} />} />
          <Route path="/RRMS" element={<RRMS setIsAdmin={setIsAdmin} />} />
          {/* Admin page */}
          {/* route du lieu mac dinh khi ko nhan vao  */}
          <Route
            path="/quanlytro"
            element={
              <MainManagement
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
            }
          />
          {/* route co du lieu khi nhan vao nha tro  */}
          <Route
            path="/quanlytro/:motelName"
            element={
              <MainManagement
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
            }
          />
          <Route path="/moi-gioi" element={<AdminManageBoker setIsAdmin={setIsAdmin} />} />
          <Route
            path="/moi-gioi/:motelName"
            element={<AdminManageBoker setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />}
          />
          <Route path="/adminManage" element={<AdminManage setIsAdmin={setIsAdmin} />} />

          <Route
            path="/bao-cao"
            element={
              <AdminStatis
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
            }
          />
          <Route
            path="/bao-cao/:motelName"
            element={
              <AdminStatis
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
            }
          />
          <Route path="/roomManagement" element={<RoomManagement setIsAdmin={setIsAdmin} />} />
          <Route path="/AdminStatis" element={<AdminStatis setIsAdmin={setIsAdmin} />} />
          <Route path="/bao-cao" element={<AdminStatis setIsAdmin={setIsAdmin} />} />
          <Route path="/AdminManagerBoard" element={<AdminManagerBoard setIsAdmin={setIsAdmin} />} />
          <Route path="/AdminManagerGroup" element={<AdminManagerGroup setIsAdmin={setIsAdmin} />} />
          <Route path="/dang-tin" element={<PostRooms setIsAdmin={setIsAdmin} />} />
          <Route path="/dang-tin/:motelName" element={<PostRooms setIsAdmin={setIsAdmin} />} />
          <Route path="/tai-khoan" element={<ManagerMyAccount setIsAdmin={setIsAdmin} />} />
          <Route
            path="/tai-khoan/:motelName"
            element={<ManagerMyAccount setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />}
          />
          <Route path="/phan-quyen" element={<ManagerCompanyAT setIsAdmin={setIsAdmin} />} />
          <Route
            path="/phan-quyen/:motelName"
            element={<ManagerCompanyAT setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />}
          />
          <Route path="/cai-dat" element={<ManagerSettings setIsAdmin={setIsAdmin} />} />
          <Route
            path="/cai-dat/:motelName"
            element={<ManagerSettings setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />}
          />
        </Routes>
        {!isAdmin ? <Footer /> : <></>}
      </Router>
    </>
  )
}

export default App
