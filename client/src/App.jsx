
import Detail from "./pages/Detail/Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homes/Home";
import Chart from "./pages/Charts/Chart";
import Header from "./layouts/Header/Header";
import Search from "./pages/search/Search";
import Footer from "./layouts/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forgot_Password from "./pages/Forgot-Password/Forgot_Password";
import AdminStatis from "./pages/admin/statistical";

import Detail from './pages/Detail/Detail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Homes/Home'
import Header from './layouts/Header/Header'
import Search from './pages/search/Search'
import Footer from './layouts/Footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Forgot_Password from './pages/Forgot-Password/Forgot_Password'
import { env } from './configs/environment'
import MainManagement from './pages/admin/MainManagement'
import Profile from './pages/Profile/Profile'
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
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/AdminStatis" element={<AdminStatis />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot_Password />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/test" element={<TestPage />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
