import { useEffect } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
const TenantManager = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {
  useEffect(() => {
    setIsAdmin(true)
  }, [])
  return (
    <div>
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={isNavAdmin}
      />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px',
        }}></div>
    </div>
  )
}

export default TenantManager
