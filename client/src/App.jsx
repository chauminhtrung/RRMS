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

import { env } from './configs/environment'
import MainManagement from './pages/admin/MainManagement'
import Contact from './pages/Contact/Contact'
import Introduce from './pages/Introduce/Introduce'
import AdminManagerBoard from './pages/admin/AdminManageBoard'
import Profile from './pages/Profile/Profile'
import PaymentPage from './pages/cart/PaymentPage'
import RRMS from './pages/RRMS/RRMS'
import AdminManageBoker from './pages/admin/AdminManageBoker/AdminManageBoker'

// import TestPage from './pages/TestPage'
// import ValidCaptcha from './components/ValidCaptcha'

function App() {
  console.log(env.API_URL)

  return (
    <>
      <Router>
        {/* <ValidCaptcha /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/admin" element={<MainManagement />} />
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
          <Route path="/RRMS" element={<RRMS />} />
          {/* <Route path="/test" element={<TestPage />} /> */}
          <Route path="/AdminManagerBoard" element={<AdminManagerBoard />} />
          {/* <Routes path="/test" element={<TestPage />} /> */}
          <Route path="/AdminManagerBoard" element={<AdminManagerBoard />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
