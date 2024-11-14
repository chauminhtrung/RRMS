import { useState } from 'react'
import { Dropdown, DropdownButton, DropdownItem } from 'react-bootstrap'
import { FaEye, FaShare, FaUserPlus, FaTrashAlt, FaTimes } from 'react-icons/fa'
import Swal from 'sweetalert2'

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
  const linkToCopy = 'http://localhost:5173/residenceForm'

  const linkDienThoai = 'http://localhost:5173/AppPromo'
  // Mở hoặc đóng menu
  const handleMenuToggle = () => setShowMenu(!showMenu)
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: `Đã sao chép liên kết văn bản tạm trú! Bạn có thể chia sẻ cho bên thứ ba. ${linkToCopy}`,
          showCancelButton: true,
          confirmButtonText: 'Đi đến đường dẫn',
          cancelButtonText: 'Đóng'
        }).then((result) => {
          if (result.isConfirmed) {
            handleClickDoc(tenantId)
          }
        })
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Thất bại', text: 'Lỗi khi sao chép link!' })
      })
  }
  const handleCopyLinkTuNhap = () => {
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: `Đã sao chép liên kết văn bản tạm trú! Bạn có thể chia sẻ cho bên thứ ba. ${linkToCopy}`,
          showCancelButton: true,
          confirmButtonText: 'Đi đến đường dẫn',
          cancelButtonText: 'Đóng'
        }).then((result) => {
          if (result.isConfirmed) {
            // Chuyển hướng đến đường dẫn
            window.location.href = linkDienThoai
          }
        })
      })
      .catch(() => {
        Swal.fire({ icon: 'error', title: 'Thất bại', text: 'Lỗi khi sao chép link!' })
      })
  }

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

          {/* Mục chia sẻ mẫu văn bản */}
          <DropdownItem onClick={handleCopyLink}>
            <FaShare /> Chia sẻ mẫu văn bản tạm trú
          </DropdownItem>

          {/* Mục khách thuê tự nhập */}
          <DropdownItem onClick={handleCopyLinkTuNhap}>
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
            <FaUserPlus /> Chỉnh sửa thông tin khách hàng
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
