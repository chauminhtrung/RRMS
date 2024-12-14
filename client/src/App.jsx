import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Detail from './pages/Detail/Detail'
import Home from './pages/Homes/Home'
import Chart from './pages/Charts/Chart'
import Header from './layouts/Header/Header'
import Search from './pages/search/Search'
import Footer from './layouts/Footer/Footer'
import GoogleLoginRedirect from './pages/Login/GoogleLoginRedirect'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Forgot_Password from './pages/Forgot-Password/Forgot_Password'
import Support from './pages/Support/Support'
import AdminStatis from './pages/admin/statistical'
import DetailRoom from './pages/admin/ManagerHome/DetailRoom/DetailRoom'
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
import Heart from './pages/cart/Heart'
import RRMS from './pages/RRMS/RRMS'
import AdminManageBoker from './pages/admin/AdminManageBoker/AdminManageBoker'
import PostRooms from './pages/BulletinBoards/PostBulletinBoards'
import AdminManage from './pages/admin/AdminManage/AdminManage'
import Audio from './pages/AI/Audio'
import RoomManagement from './pages/admin/AdminManage/RoomManagement'
import Recognition from './pages/AI/Recognition'
import FaceMatch from './pages/AI/FaceMatch'
import InvoiceManager from './pages/admin/NavContentAdmin/InvoiceManager/InvoiceManager'
import ServiceManager from './pages/admin/NavContentAdmin/ServiceManager/ServiceManager'
import AssetManager from './pages/admin/NavContentAdmin/AssetManager'
import ContractManager from './pages/admin/NavContentAdmin/ContractManage/ContractManager'
import ContractPreview from './pages/admin/NavContentAdmin/ContractManage/ContractPreview'
import TenantManager from './pages/admin/NavContentAdmin/TenantManager'
import IncomeSummary from './pages/admin/NavContentAdmin/IncomeSummary/IncomeSummary'
import Zalo_history from './pages/admin/NavContentAdmin/Zalo_history'
import SettingMotel from './pages/admin/NavContentAdmin/SettingMotel/SettingMotel'
import ImageComparison from './pages/AI/ImageComparison'
import ImportFileExcel from './pages/admin/NavContentAdmin/ImportFileExcel/ImportFileExcel'
import MotelSetting from './pages/admin/MotelSettings/MotelSetting'
import PassportRecognition from './pages/AI/PassportRecognition'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import { getMotelByUsername } from './apis/motelAPI'
import i18n from './i18n/i18n'
import ResidenceForm from './pages/admin/NavContentAdmin/ResidenceForm'
import { Box } from '@mui/material'
import AppPromo from './pages/admin/NavContentAdmin/AppPromo'
import RatingHistory from './pages/RatingHistory/RatingHistory'
import { getAccountByUsername } from './apis/accountAPI'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')
  const [account, setAccount] = useState()
  const [token, setToken] = useState(null)
  //lay thong tin tro cua tk account truyen xuong cho trang chu tro
  const [isAdmin, setIsAdmin] = useState(false)
  const [isNavAdmin, setIsNavAdmin] = useState(false)
  const location = useLocation()

  const [motels, setmotels] = useState([])
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || i18n.language)
  const fetchMotelsByUsername = async (username) => {
    getMotelByUsername(username).then((res) => {
      setmotels(res.data.result)
    })
  }

  useEffect(() => {
    localStorage.setItem('language', currentLanguage)
    i18n.changeLanguage(currentLanguage)
  }, [currentLanguage])

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'vi' ? 'en' : 'vi'
    i18n.changeLanguage(newLanguage)
    setCurrentLanguage(newLanguage)
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      getAccountByUsername(user.username).then((res) => {
        setAccount(res.data)
      })
      setUsername(user.username)
      setAvatar(user.avatar)
      setToken(user.token)
      fetchMotelsByUsername(user.username)

      console.log(motels.length)
    }
  }, [location])

  return (
    <>
      <Box>
        {/* <ValidCaptcha /> */}
        {!isAdmin ? (
          <Header
            account={account}
            username={username}
            avatar={avatar}
            token={token}
            setUsername={setUsername}
            setAvatar={setAvatar}
            setToken={setToken}
            toggleLanguage={toggleLanguage}
            currentLanguage={currentLanguage}
            motelId={motels[0]?.motelId}
          />
        ) : (
          <></>
        )}
        <Routes>
          <Route path="*" element={<NotFoundPage styled />} />
          <Route path="/" element={<Home setIsAdmin={setIsAdmin} />} />
          <Route
            path="/login"
            element={<Login setUsername={setUsername} setAvatar={setAvatar} setIsAdmin={setIsAdmin} />}
          />
          <Route path="/oauth2/redirect" element={<GoogleLoginRedirect />} />
          <Route path="/forgot-password" element={<Forgot_Password setIsAdmin={setIsAdmin} />} />
          <Route path="/chart" element={<Chart setIsAdmin={setIsAdmin} />} />
          <Route path="/audio" element={<Audio setIsAdmin={setIsAdmin} />} />
          <Route path="/image" element={<ImageComparison setIsAdmin={setIsAdmin} />} />
          <Route path="/recognition" element={<Recognition setIsAdmin={setIsAdmin} />} />
          <Route path="/facematch" element={<FaceMatch setIsAdmin={setIsAdmin} />} />
          <Route path="/passport" element={<PassportRecognition setIsAdmin={setIsAdmin} />} />
          <Route path="/search" element={<Search setIsAdmin={setIsAdmin} />} />
          <Route path="/detail/:bulletinBoardId" element={<Detail setIsAdmin={setIsAdmin} />} />
          <Route path="/forgot-password" element={<Forgot_Password setIsAdmin={setIsAdmin} />} />
          <Route path="/contact" element={<Contact setIsAdmin={setIsAdmin} />} />
          <Route path="/introduce" element={<Introduce setIsAdmin={setIsAdmin} />} />
          <Route path="/register" element={<Register setIsAdmin={setIsAdmin} />} />
          <Route path="/profile" element={<Profile setIsAdmin={setIsAdmin} username={username} />} />
          <Route path="/payment" element={<PaymentPage setIsAdmin={setIsAdmin} />} />
          <Route path="/support" element={<Support setIsAdmin={setIsAdmin} />} />
          <Route path="/heart" element={<Heart setIsAdmin={setIsAdmin} />} />
          <Route path="/RRMS" element={<RRMS setIsAdmin={setIsAdmin} />} />
          <Route path="/rating-history" element={<RatingHistory setIsAdmin={setIsAdmin} />} />
          {/* Admin page */}
          {/* route du lieu mac dinh khi ko nhan vao  */}
          <Route
            path="/quanlytro"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <MainManagement
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          {/* route co du lieu khi nhan vao nha tro  */}
          <Route
            path="/quanlytro/:motelId"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <MainManagement
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/moi-gioi" element={<ProtectedRoute requiredRoles={['ADMIN', 'HOST']}><AdminManageBoker setIsAdmin={setIsAdmin} /></ProtectedRoute>} />
          <Route
            path="/moi-gioi/:motelId"
            element={<AdminManageBoker setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />}
          />
          <Route path="/adminManage" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminManage setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route
            path="/bao-cao"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminStatis
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
                setUsername={setUsername}
              />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bao-cao/:motelId"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <AdminStatis
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminManagerBoard"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <AdminManagerBoard
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/AppPromo" element={<AppPromo />} setIsAdmin={setIsAdmin} />
          <Route
            path="/residenceForm/:tenantId"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <ResidenceForm setIsAdmin={setIsAdmin} isNavAdmin={isNavAdmin} />
              </ProtectedRoute>
          }
          />
          <Route path="/adminManage/*" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminManage setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/AdminStatis" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminStatis setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/bao-cao" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminStatis setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/roomManagement" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <RoomManagement setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/AdminStatis" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminStatis setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/AdminManagerBoard" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminManagerBoard setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/AdminManagerGroup" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <AdminManagerGroup setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/dang-tin" element={<PostRooms setIsAdmin={setIsAdmin} />} />
          <Route path="/dang-tin/:motelId" element={<PostRooms setIsAdmin={setIsAdmin} />} />
          <Route path="/tai-khoan" element={<ManagerMyAccount TaiKhoan={username} setIsAdmin={setIsAdmin} />} />
          <Route path="/phan-quyen" element={<ManagerCompanyAT setIsAdmin={setIsAdmin} />} />
          <Route
            path="/phan-quyen/:motelId"
            element={<ManagerCompanyAT setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />}
          />
          <Route path="/cai-dat" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <ManagerSettings setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route path="/motelsetting" element={
            <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <MotelSetting setIsAdmin={setIsAdmin} />
            </ProtectedRoute>
            } />
          <Route
            path="/cai-dat/:motelId"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <ManagerSettings setIsAdmin={setIsAdmin} motels={motels} setmotels={setmotels} />
              </ProtectedRoute>
            }
          />
          {/* nav 2 cac tab o ben admin */}
          <Route
            path="/quanlytro/:motelId/quan-ly-hoa-don"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <InvoiceManager
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/quan-ly-dich-vu"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <ServiceManager
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/quan-ly-tai-san"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <AssetManager
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/tat-ca-hop-dong"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <ContractManager
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/tat-ca-khach-thue"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <TenantManager
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/thu-chi-tong-ket"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <IncomeSummary
                  motels={motels}
                  setmotels={setmotels}
                  setIsAdmin={setIsAdmin}
                  isNavAdmin={isNavAdmin}
                  setIsNavAdmin={setIsNavAdmin}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/cai-dat-nha-tro"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <SettingMotel
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/lich-su-gui-zalo"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <Zalo_history
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quanlytro/:motelId/import-data-from-file"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <ImportFileExcel
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
              </ProtectedRoute>
            }
          />
          {/* detaiROoom */}
          <Route
            path="/quanlytro/:motelId/Chi-tiet-phong/:roomId"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
              <DetailRoom
                motels={motels}
                setmotels={setmotels}
                setIsAdmin={setIsAdmin}
                isNavAdmin={isNavAdmin}
                setIsNavAdmin={setIsNavAdmin}
              />
              </ProtectedRoute>
            }
          />
          {/* preview contract  */}
          <Route
            path="/quanlytro/:motelId/Contract-Preview/:contractId"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'HOST']}>
                <ContractPreview setIsAdmin={setIsAdmin} />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!isAdmin ? <Footer /> : <></>}
      </Box>
    </>
  )
}

export default App
