/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import HomeNData from './HomeNData'
import HomeWData from './HomeWData'
import './Admin.css'
const MainManagement = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
  useEffect(() => {
    setIsAdmin(true)
  }, [])

  return (
    <div style={{ backgroundColor: ' #e4eef5' }}>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={true}
      />
      {motels.length == 0 ? <HomeNData /> : <HomeWData Motel={motels} />}
    </div>
  )
}

export default MainManagement
