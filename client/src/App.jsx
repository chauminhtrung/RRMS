import Detail from './pages/Detail/Detail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './layouts/Header/Header'
import Search from './pages/search/Search'
import Footer from './layouts/Footer/Footer'
import { env } from './configs/environment'
import TestPage from './pages/TestPage'
// import ValidCaptcha from "./components/ValidCaptcha";

function App() {
  console.log(env.API_URL)

  return (
    <>
      <Router>
        {/* <ValidCaptcha /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
