import Detail from "./pages/Detail/Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layouts/Header/Header";
import Search from "./pages/search/Search";
import Footer from "./layouts/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Forgot_Password from "./pages/Forgot-Password/Forgot_Password";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot_Password />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
