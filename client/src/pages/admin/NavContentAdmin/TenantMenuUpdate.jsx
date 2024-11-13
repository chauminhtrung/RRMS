import { useState } from 'react'
import { Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap'
import { FaEye, FaShare, FaUserPlus, FaTrashAlt, FaPrint, FaTimes } from 'react-icons/fa'

const TenantMenuUpdate = ({
  handleClickDoc,
  tenantId,
  handleOpen,
  setEditId,
  setAvatar,
  handleClose,
  deleteTenant
}) => {
  const [showMenu, setShowMenu] = useState(false)

  // Mở hoặc đóng menu
  const handleMenuToggle = () => setShowMenu(!showMenu)

  return (
    <div>
      {/* Menu */}
      <Dropdown show={showMenu} onToggle={handleMenuToggle}>
        <DropdownButton
          variant="light"
          id="tenant-menu-dropdown"
          align="end"
          drop="end"
          style={{ width: '60px' }}
          onClick={(e) => e.stopPropagation()} // Ngừng sự kiện click để ngăn đóng menu tự động
        >
          {/* Mục xem mẫu văn bản */}
          <DropdownItem onClick={() => handleClickDoc(tenantId)}>
            <FaEye /> Xem mẫu văn bản tạm trú
          </DropdownItem>

          {/* Mục in tenantId */}
          <DropdownItem onClick={handleClose}>
            <FaPrint /> {tenantId}
          </DropdownItem>

          {/* Mục chia sẻ mẫu văn bản */}
          <DropdownItem onClick={handleClose}>
            <FaShare /> Chia sẻ mẫu văn bản tạm trú
          </DropdownItem>

          {/* Mục khách thuê tự nhập */}
          <DropdownItem onClick={handleClose}>
            <FaUserPlus /> Khách thuê tự nhập
          </DropdownItem>

          {/* Mục chỉnh sửa */}
          <DropdownItem
            onClick={() => {
              handleOpen() // Mở modal
              setEditId(tenantId) // Cập nhật tenantId
              setAvatar(false) // Đặt avatar nếu cần
              console.log('setEditId called with tenantId:', tenantId) // Kiểm tra console
            }}>
            <FaUserPlus /> Chỉnh sửa
          </DropdownItem>

          {/* Mục xóa */}
          <DropdownItem
            onClick={(e) => {
              deleteTenant(tenantId, e) // Xóa tenant với tenantId
              handleClose() // Đóng menu
            }}
            style={{ color: 'red' }}>
            <FaTrashAlt /> Xóa khách thuê
          </DropdownItem>

          {/* Mục đóng menu */}
          <DropdownItem onClick={handleClose}>
            <FaTimes /> Đóng menu
          </DropdownItem>
        </DropdownButton>
      </Dropdown>
    </div>
  )
}

export default TenantMenuUpdate
