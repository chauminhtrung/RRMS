import * as XLSX from 'xlsx' // Cập nhật cách import đúng
const ExportToExcel = ({ rooms }) => {
  // Hàm xử lý khi nhấn nút xuất Excel
  const handleExportToExcel = () => {
    // Tạo bảng (worksheet) từ dữ liệu
    const ws = XLSX.utils.json_to_sheet(
      rooms.map((room) => ({
        RoomName: room.name,
        Group: room.group,
        Price: room.price,
        Deposit: room.latestContract?.deposit || 'N/A',
        Area: room.area,
        InvoiceDate: room.invoiceDate,
        // Thông tin hợp đồng
        MoveInDate: room.latestContract?.moveinDate || 'N/A',
        LeaseTerm: room.latestContract?.leaseTerm || 'N/A',
        CloseContract: room.latestContract?.closeContract || 'N/A',
        CollectionCycle: room.latestContract?.collectioncycle || 'N/A',
        ContractCountTenant: room.latestContract?.countTenant || 'N/A',
        ContractStatus: room.latestContract?.status || 'N/A'
      }))
    )

    // Tạo một workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Rooms')

    // Xuất ra file Excel
    XLSX.writeFile(wb, 'rooms.xlsx')
  }

  return (
    <button
      id="download-excel"
      style={{ marginLeft: '10px' }}
      className="ml-2 btn btn-primary"
      onClick={handleExportToExcel} // Gọi hàm xuất Excel khi nhấn nút
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-file-text">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      Xuất excel
    </button>
  )
}

export default ExportToExcel
