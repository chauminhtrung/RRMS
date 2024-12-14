import { useEffect, useState, useRef,useMemo  } from 'react'
import NavAdmin from '~/layouts/admin/NavbarAdmin'
import YearMonthFilter from '../YearMonthFilter'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import 'flatpickr/dist/plugins/monthSelect/style.css'
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect'
import { Vietnamese } from 'flatpickr/dist/l10n/vn' 
import AdditionItem from './AdditionItem'
import 'react-tabulator/lib/styles.css'
import 'react-tabulator/lib/css/tabulator.min.css' 
import { ReactTabulator } from 'react-tabulator'
import { Link,useParams } from 'react-router-dom'
import axios from 'axios'
import { env } from '~/configs/environment'
import ModalEditInvoice from './ModalEditInvoice'
import ModalCollectMoneyInvoice from './ModalCollectMoneyInvoice'
const InvoiceManager = ({ setIsAdmin, setIsNavAdmin, motels, setmotels }) => {
  const token = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).token : null
  const { motelId } = useParams()
  const [invoice, setInvoice] = useState({}) // Lưu 1 hóa đơn 
  const [invoices, setInvoices] = useState([]) // Lưu danh sách hóa đơn
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [showMenu, setShowMenu] = useState(null) // Trạng thái của menu hiện tại
  const [services, setServices] = useState([]); // Lưu danh sách dịch vụ từ API
  //2 thang nay la cho chon tu ngay --> den ngay (tu tinh den 1 thang sau)
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  //them cai muc cong tru vi li do
  const [items, setItems] = useState([{}]) // Khởi tạo một mục
  // chuyen doi cac buoc
  const [step, setStep] = useState(1) // Bước mặc định là bước 1
  const menuRef = useRef(null) // Tham chiếu đến menu
  const [modalOpenInvoice, setModalOpenInvoice] = useState(false) //mo modal 
  const [modalOpenCollectMoney, setModalOpenCollectMoney] = useState(false)
  const [filterStatus, setFilterStatus] = useState({ done: false, new: false }); // Trạng thái bộ lọc

  const toggleModalInvoice = () => {
    setModalOpenInvoice(!modalOpenInvoice)
  }
  const toggleModalCollectMoney = () => {
  setModalOpenCollectMoney(!modalOpenCollectMoney)
  }

  const fetchInvoices = async (motelId) => {
    try {  
      const response = await axios.get(`${env.API_URL}/invoices/motel/${motelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Invoices from API:", response.data);
      setInvoices(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setIsAdmin(true)
    fetchInvoices(motelId)
  }, [])

  const fetchMotelServices = async (motelId) => {
    try {
        const response = await axios.get(`${env.API_URL}/motels/get-motel-id?id=${motelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const motelData = response.data.result;

        if (motelData?.motelServices) {
            const serviceNames = motelData.motelServices.map((service) => service.nameService);
            setServices(serviceNames);
        }
    } catch (error) {
        console.error("Error fetching motel services:", error);
    }
};

  
  useEffect(() => {
    fetchMotelServices(motelId);
  }, [motelId]);

  const dynamicServiceColumns = useMemo(() => {
    const serviceColumnWidth = services.length === 2 ? 177 : services.length === 3 ? 118 : 100; // Tùy chỉnh độ rộng
    return services.map((serviceName) => ({
        title: serviceName, // Tiêu đề cột là tên dịch vụ
        field: serviceName, // Tên trường trong dữ liệu
        hozAlign: "center", // Canh phải
        width: serviceColumnWidth, // Tính toán độ rộng
        formatter: "money", // Định dạng số tiền
    }));
  }, [services]);


  const StatusFormatter = (cell) => {
    const data = cell.getRow().getData();
    const paymentStatus = data.status; 
    return paymentStatus === "Chưa thu"
        ? `<span class="badge mt-2" style="background-color: #ED6004; white-space: break-spaces;">Chưa thu</span>`
        : `<span class="badge mt-2" style="background-color: #7dc242; white-space: break-spaces;">Đã thu xong</span>`;
  };


  const columns = [
    { title: 'Id Hoa Don', field: 'invoiceId', hozAlign: 'center', width: 165, visible: false },
    {
      title: '',
      field: 'drag',
      hozAlign: 'center',
      width: 50,
      rowHandle: true,
      formatter: () => {
        const element = document.createElement('div')
        element.innerHTML = `
          <div class="icon-first" style="background-color: #ED6004;">
            <img width="30px" src="https://firebasestorage.googleapis.com/v0/b/rrms-b7c18.appspot.com/o/images%2Froom.png?alt=media&token=9f1a69c1-ce2e-4586-ba90-94db53443d49">
          </div>
        `
        return element
      }
    },
    { title: 'Tên phòng', field: 'roomName', hozAlign: 'center', width: 163 },
    { title: 'Tiền phòng', field: 'roomPrice', formatter: 'money', hozAlign: 'center', width: 164 },
    ...dynamicServiceColumns, 
    { title: 'Thu/Trả cọc', field: 'deposit', formatter: 'money', hozAlign: 'center', width: 164 },
    { title: 'Cộng thêm/Giảm trừ', field: 'adjustments', formatter: 'money', hozAlign: 'center', width: 164 },
    { title: 'Tổng cộng', field: 'total', formatter: 'money', hozAlign: 'center', width: 164 },
    { title: 'Cần thu', field: 'total', formatter: 'money', hozAlign: 'center', width: 164 },
    { title: 'Trạng thái', field: 'status', hozAlign: 'center', width: 164,formatter: StatusFormatter },
    {
      title: 'Action',
      field: 'Action',
      width: 92,
      formatter: (cell) => {
        const rowId = cell.getRow().getData().invoiceId
        const element = document.createElement('div')
        element.classList.add('icon-menu-action')
        element.innerHTML = `
          <svg    xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-more-vertical">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        `
        element.addEventListener('click', (e) => handleActionClick(e, rowId))
        return element
      }
    }
  ]

  const options = {
    height: "400px", 
    movableColumns: true, 
    resizableRows: true,
    movableRows: true, 
    resizableColumns: true,
    layout: "fitColumns", 
    responsiveLayout: "collapse", 
    horizontalScroll: true, 
    frozenColumns: true, 
  };

  const fetchDataInvoice = async (id) => {
    try {
      const invoiceData = invoices.find((item) => item.invoiceId === id);
      if (invoiceData) {
        const serviceDetails = invoiceData.serviceDetails.map((service) => ({
          roomServiceId: service.roomServiceId,
          serviceName: service.serviceName,
          servicePrice: service.servicePrice,
          quantity: service.quantity,
          chargetype: service.chargetype,
          totalPrice: service.totalPrice,
          isSelected: true,
        }));
  
        const status = invoiceData.paymentStatus === "PAID" ? "Đã thu xong" : "Chưa thu";
        setInvoice({ ...invoiceData, serviceDetails, status });
      } else {
        console.warn(`Invoice with ID ${id} not found in invoices list.`);
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error);
    }
  };
  
  
  
  const data = useMemo(() => {
    return invoices.map((invoice) => {
        const serviceData = {};

        (services || []).forEach((serviceName) => {
            const serviceDetail = invoice.serviceDetails?.find((s) => s.serviceName === serviceName);
            serviceData[serviceName] = serviceDetail ? serviceDetail.totalPrice : 0;
        });

        return {
            invoiceId: invoice.invoiceId,
            roomId:invoice.roomId,
            roomName: invoice.roomName,
            roomPrice: invoice.roomPrice,
            invoiceCreateMonth:invoice.invoiceCreateMonth,
            invoiceCreateDate:invoice.invoiceCreateDate,
            dueDate: invoice.dueDate,
            moveinDate:invoice.moveinDate,
            dueDateofmoveinDate:invoice.dueDateofmoveinDate,
            deposit: invoice.deposit,
            ...serviceData, 
            adjustments: invoice.additionItems?.reduce(
                (sum, item) => (item.addition ? sum + item.amount : sum - item.amount),
                0
            ),
            total: invoice.totalAmount,
            status: invoice.paymentStatus === "PAID" ? "Đã thu xong" : "Chưa thu",
        };
    });
  }, [invoices, services]);

  
  
  //nhan vao de set lay du lieu cua 1 hoa don do 
  const handleActionClick = (e, invoiceId) => {
    e.stopPropagation() // Ngừng sự kiện click để không bị bắt bởi sự kiện ngoài
    // In ra tọa độ
    // Sử dụng getBoundingClientRect để lấy vị trí chính xác của phần tử được nhấn
    const targetElement = e.currentTarget
    const rect = targetElement.getBoundingClientRect()

    // Cập nhật vị trí của menu sao cho hiển thị gần biểu tượng Action
    setMenuPosition({
      x: rect.left + window.scrollX + rect.width / 2, // Centered horizontally
      y: rect.top + window.scrollY + rect.height // Below the icon
    })
    fetchDataInvoice(invoiceId)
    setShowMenu(invoiceId) // Hiển thị menu cho hàng với roomId tương ứng
  }

  const updateInvoiceStatus = (updatedInvoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice.invoiceId === updatedInvoice.invoiceId ? updatedInvoice : invoice
      )
    );
  };
  
  //Menu thu tien r 
  const menuItems = [
    { id: 1, label: 'Xem chi tiết hóa đơn', icon: 'arrow-right-circle' },
    { id: 2, label: 'Gửi hóa đơn qua App', icon: 'share-2' },
    { id: 3, label: 'In hóa đơn', icon: 'printer' },
    { id: 4, label: 'Chia sẻ hóa đơn', icon: 'share' },
    { id: 5, label: 'Gửi hóa đơn qua Zalo', icon: 'share-2' },
    { id: 6, label: 'Xóa hóa đơn', icon: 'trash-2', textClass: 'text-danger' }
  ]
  //Menu chua thu tien 
  const menuItemsThu = [
    {
      id: 1,
      label: 'Xem chi tiết hóa đơn',
      icon: 'arrow-right-circle' 
    },
    {
      id: 2,
      label: 'Thu tiền',
      icon: 'dollar-sign', 
      textClass: 'text-success'
    },
    {
      id: 3,
      label: 'Chỉnh sửa',
      icon: 'edit-3' 
    },
    {
      id: 4,
      label: 'In hóa đơn',
      icon: 'printer' 
    },
    {
      id: 5,
      label: 'Chia sẻ hóa đơn',
      icon: 'share' 
    },
    {
      id: 6,
      label: 'Gửi hóa đơn qua App',
      icon: 'share-2' 
    },
    {
      id: 7,
      label: 'Gửi hóa đơn qua Zalo',
      icon: 'share-2',
      isImage: true
    },
    {
      id: 8,
      label: 'Hủy hóa đơn',
      icon: 'trash-2', 
      textClass: 'text-danger'
    }
  ]

  //khi nhan vao may cai muc tren menu 
  const handleItemClick = (label) => {
    //showMenu no la cai Id cua hoa don set tu khi nhan vao mo menu
    if (label === 'Xem chi tiết hóa đơn') {
      alert(`Xem chi tiet hoa don cua hoa don ${showMenu}`)
      //phai co ham o duoi trong moi khi nhan vao menu
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Gửi hóa đơn qua App') {
      alert(`gui hoa don cua hoa don ${showMenu}`)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'In hóa đơn') {
      alert(`in hoa don cua hoa don ${showMenu}`)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Chia sẻ hóa đơn') {
      alert(`chia se hoa don cua hoa don ${showMenu}`)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Gửi hóa đơn qua Zalo') {
      alert(`gui hoa don cua hoa don ${showMenu}`)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Xóa hóa đơn') {
      alert(` Xóa hóa đơn cua hoa don ${showMenu}`)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Thu tiền') {
      toggleModalCollectMoney(!toggleModalCollectMoney)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Hủy hóa đơn') {
      alert(` Hủy hóa đơn  cua hoa don ${showMenu}`)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else if (label === 'Chỉnh sửa') {
      toggleModalInvoice(!modalOpenInvoice)
      fetchDataInvoice(showMenu)
      setShowMenu(null) // Đóng menu
    } else {
      setShowMenu(null) // Đóng menu
      alert(`Action: ${label} on room ${showMenu}`)
    }
  }

  useEffect(() => {
    setIsAdmin(true)
  }, [])
  
  //xoa muc
  const handleRemove = (index) => {
    setItems(items.filter((_, i) => i !== index)) 
  }

  //them
  const handleAddItem = () => {
    setItems([...items, {}]) 
  }

  const handleFromDateChange = (selectedDates) => {
    const selectedDate = selectedDates[0]
    setFromDate(selectedDate)

    // Tính ngày "Đến ngày" là 1 tháng sau
    const nextMonthDate = new Date(selectedDate)
    nextMonthDate.setMonth(selectedDate.getMonth() + 1)

    // Chuyển thành chuỗi định dạng YYYY-MM-DD cho input
    const formattedDate = nextMonthDate.toISOString().split('T')[0]
    setToDate(formattedDate)
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    alert('Hóa đơn đã được lập thành công!')
  }
  const handleFilterChange = (e) => {
    const { id, checked } = e.target;
    setFilterStatus((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };
  
  const filteredData = useMemo(() => {
    // Lọc danh sách hóa đơn dựa trên bộ lọc trạng thái
    return invoices.filter((invoice) => {
      if (filterStatus.done && invoice.paymentStatus === "PAID") return true;
      if (filterStatus.new && invoice.paymentStatus !== "PAID") return true;
      return !filterStatus.done && !filterStatus.new; // Hiển thị tất cả nếu không có bộ lọc
    }).map((invoice) => {
      const serviceData = {};
  
      (services || []).forEach((serviceName) => {
        const serviceDetail = invoice.serviceDetails?.find((s) => s.serviceName === serviceName);
        serviceData[serviceName] = serviceDetail ? serviceDetail.totalPrice : 0;
      });
  
      return {
        invoiceId: invoice.invoiceId,
        roomId: invoice.roomId,
        roomName: invoice.roomName,
        roomPrice: invoice.roomPrice,
        invoiceCreateMonth: invoice.invoiceCreateMonth,
        invoiceCreateDate: invoice.invoiceCreateDate,
        dueDate: invoice.dueDate,
        moveinDate: invoice.moveinDate,
        dueDateofmoveinDate: invoice.dueDateofmoveinDate,
        deposit: invoice.deposit,
        ...serviceData,
        adjustments: invoice.additionItems?.reduce(
          (sum, item) => (item.addition ? sum + item.amount : sum - item.amount),
          0
        ),
        total: invoice.totalAmount,
        status: invoice.paymentStatus === "PAID" ? "Đã thu xong" : "Chưa thu",
      };
    });
  }, [invoices, services, filterStatus]);

  return (
    <div className="page-bills">
      <NavAdmin
        setmotels={setmotels}
        motels={motels}
        setIsAdmin={setIsAdmin}
        setIsNavAdmin={setIsNavAdmin}
        isNavAdmin={true}
      />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px 15px 15px 15px',
          borderRadius: '10px',
          margin: '0 10px 10px 10px'
        }}>
        <YearMonthFilter />
        <div className="header-item">
          <h4 className="title-item">
            Tất cả hóa đơn - 10/2024
            <i style={{ fontSize: '14px', fontWeight: 'normal' }}>Tất cả hóa đơn thu tiền nhà xuất hiện ở đây</i>
          </h4>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div data-bs-toggle="modal" data-bs-target="#billSeries">
              <div
                className="add-round"
                data-bs-toggle="tooltip"
                data-bs-placement="left"
                title=""
                data-bs-original-title="Tạo hóa đơn mới">
                <i className="bi bi-plus-lg" style={{ fontSize: '25px' }}></i>
              </div>
            </div>
            <Link
              to="/quan-ly/6891/cai-dat-nha-tro#bill_setting"
              className="btn btn-primary"
              data-bs-toggle="tooltip"
              data-bs-placement="left"
              title=""
              style={{
                boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, .15) !important',
                marginLeft: '25px',
                padding: '11px 20px'
              }}
              data-bs-original-title="Cài đặt hiển thị hóa đơn. Xuất, gửi hóa đơn tự động...">
              <i className="bi bi-gear-fill m-1" style={{ fontSize: '24px' }}></i>
              <span>Cài đặt hóa đơn</span>
            </Link>
            <div className="d-flex">
              <div style={{ width: '2px', borderLeft: '2px solid #ccc', margin: '3px 0px', marginLeft: '10px' }}></div>
              <button
                style={{ marginLeft: '10px', marginRight: '10px', padding: '13px 20px' }}
                id="print"
                className="btn btn-primary">
                <i className="bi bi-printer" style={{ fontSize: '24px' }}></i> In h.đơn
              </button>
              <button
                style={{ marginRight: '10px', padding: '13px 20px' }}
                id="download-excel-template-2"
                className="btn btn-primary">
                <i className="bi bi-file-earmark-text" style={{ fontSize: '24px' }}></i> Xuất excel(Rút gọn)
              </button>
              <button id="download-excel-template-1" style={{ padding: '13px 20px' }} className="btn btn-primary">
                <i className="bi bi-file-earmark-text" style={{ fontSize: '24px' }}></i> Xuất excel(Đầy đủ)
              </button>
            </div>
          </div>
        </div>
        <div className="header-table header-item">
          <div className="d-flex">
            <div className="icon">
              <i className="bi bi-funnel" style={{ fontSize: '24px' }}></i>
              <span id="filter-count">{filteredData.length}</span>
            </div>
            <div className="d-flex">
              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="checkbox" id="filter_done" 
                data-value="status" value="done" 
                checked={filterStatus.done}
                onChange={handleFilterChange} />
                <label className="form-check-label" htmlFor="filter_done">
                  Hóa đơn đã thu
                </label>
                <span className="count-filter done success">{invoices.filter((invoice) => invoice.paymentStatus === "PAID").length}</span>
              </div>

              <div className="form-check form-check-inline">
                <input className="form-check-input" 
                type="checkbox" id="filter_new" 
                data-value="status" 
                value="new"
                checked={filterStatus.new}
                onChange={handleFilterChange} />
                <label className="form-check-label" htmlFor="filter_new">
                  Hóa đơn chưa thu
                </label>
                <span className="count-filter new warning">
                  {invoices.filter((invoice) => invoice.paymentStatus !== "PAID").length}
                </span>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter_customer_debt"
                  data-value="status"
                  value="customer_debt"
                />
                <label className="form-check-label" htmlFor="filter_customer_debt">
                  Hóa đơn đang nợ
                </label>
                <span className="count-filter debt error">0</span>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter_cancel"
                  data-value="status"
                  value="cancel"
                />
                <label className="form-check-label" htmlFor="filter_cancel">
                  Hóa đơn đã hủy
                </label>
                <span className="count-filter cancel disable">0</span>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ alignItems: 'center' }}>
            <select className="sort-bill" style={{ height: '35px', borderRadius: '7px', marginRight: '10px' }}>
              <option value="room-asc">Thứ tự phòng tăng dần</option>
              <option value="room-desc">Thứ tự phòng giảm dần</option>

              <option value="date-desc">Sắp xếp theo ngày giảm dần</option>
              <option value="date-asc">Sắp xếp theo ngày tăng dần</option>
            </select>
            <i className="bi bi-bar-chart" style={{ fontSize: '24px' }}></i>
          </div>
        </div>
      </div>

      {/* Table va xu ly menu o duoi*/}
      <div className="mt-3" style={{ marginLeft: '15px', marginRight: '10px', position: 'relative',marginBottom:'50px' }}>
        <ReactTabulator
          className="my-custom-table rounded" // Thêm lớp tùy chỉnh nếu cần
          columns={columns}
          options={options}
          data={data}
          placeholder={<h1></h1>} // Sử dụng placeholder tùy chỉnh
        />
        {showMenu && invoice && invoice.status && (
          <div
            className="tabulator-menu tabulator-popup-container "
            ref={menuRef} // Gán ref đúng cách cho menu
            style={{
              position: 'absolute',
              top: menuPosition.y - 676,
              left: menuPosition.x - 350,
              transform: 'translateX(-50%)'
            }}>
            {/* menu thay doi theo trang trai */}
            {(invoice.status === 'Chưa thu' ? menuItemsThu : menuItems).map((item) => (
              <div
                key={item.id}
                // Gắn ref vào tag này
                className={`tabulator-menu-item ${item.textClass || ''}`}
                onClick={() => handleItemClick(item.label)} // Đóng menu khi chọn item
                {...(item.label === 'Thiết lập tài sản' && {
                  'data-bs-toggle': 'modal',
                  'data-bs-target': '#assetSelect'
                })}>
                {item.icon && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`feather feather-${item.icon}`}>
                    {item.icon === 'dollar-sign' && (
                      <>
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </>
                    )}
                    {item.icon === 'arrow-right-circle' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 16 16 12 12 8" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </>
                    )}
                    {item.icon === 'user' && (
                      <>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </>
                    )}
                    {item.icon === 'refresh-ccw' && (
                      <>
                        <polyline points="1 4 1 10 7 10" />
                        <polyline points="23 20 23 14 17 14" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                      </>
                    )}
                    {item.icon === 'bell' && (
                      <>
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </>
                    )}
                    {item.icon === 'settings' && (
                      <>
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </>
                    )}
                    {item.icon === 'log-out' && (
                      <>
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </>
                    )}
                    {item.icon === 'trello' && (
                      <>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <rect x="7" y="7" width="3" height="9"></rect>
                        <rect x="14" y="7" width="3" height="5"></rect>
                      </>
                    )}
                    {item.icon === 'printer' && (
                      <>
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                      </>
                    )}
                    {item.icon === 'edit-3' && (
                      <>
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </>
                    )}
                    {item.icon === 'share' && (
                      <>
                        <path d="M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </>
                    )}
                    {item.icon === 'trash-2' && (
                      <>
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m5 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </>
                    )}
                    {item.icon === 'share-2' && (
                      <>
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </>
                    )}
                    {item.icon === 'x-circle' && (
                      <>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </>
                    )}
                    {item.icon === 'truck' && (
                      <>
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </>
                    )}
                    {/* Thêm các biểu tượng khác nếu cần */}
                  </svg>
                )}
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Modal add block  */}
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="billSeries"
        tabIndex="-1"
        style={{ display: 'none' }}
        aria-modal="true"
        role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <form method="POST" className="needs-validation" id="bill-series-form" noValidate>
            <div className="modal-content">
              <div className="modal-header--sticky">
                <div className="modal-header">
                  <div
                    style={{
                      marginRight: '15px',
                      outline: 0,
                      boxShadow: 'rgba(112, 175, 237, 0.16) 0px 0px 0px 0.25rem;',
                      opacity: 1,
                      borderRadius: '100%',
                      width: '36px',
                      height: '36px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      backgroundColor: 'rgb(111, 171, 232)'
                    }}>
                    <i className="bi bi-currency-dollar" style={{ fontSize: '24px' }}></i>
                  </div>
                  <h5 className="modal-title">
                    Lập hóa đơn nhiều phòng (Lập hóa đơn nhanh)
                    <p style={{ fontSize: '14px', fontWeight: 'normal', fontStyle: 'italic', margin: '0' }}>
                      Chốt dịch vụ &amp; lập hóa đớn cho phòng
                    </p>
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="tab" id="bill-series-tab" style={{ display: 'flex', justifyContent: 'center' }}>
                  <ul className="nav nav-tabs progressbar" role="tablist">
                    <li className="nav-item">
                      <Link
                        className={`nav-link-item ${step === 1 ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        to="#list-room"
                        id="tab-list-room"
                        aria-disabled>
                        Bước 1: Chốt dịch vụ
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={`nav-link-item ${step === 2 ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        to="#create-bill"
                        id="tab-create-bill">
                        Bước 2: Lập hóa đơn
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-body">
                <div className="step-content">
                  {step === 1 && (
                    <div>
                      {' '}
                      <div id="list-room" className="">
                        <div className="row g-3">
                          <div className=" col-7">
                            <div className="room-list row g-2">Không có phòng nào để lập hóa đơn</div>
                          </div>
                          <div className="price-items-layout-container col-5">
                            <h5 className="text-center room-name-lock-price-item" style={{ display: 'none' }}></h5>
                            <div
                              className="price-item-content"
                              style={{
                                backgroundColor: '#e8f8ff',
                                border: '1px solid #e8f8ff',
                                padding: '0 10px',
                                borderradius: '10px'
                              }}>
                              <div className="text-center" style={{ margin: '20px 0' }}>
                                <i className="bi bi-inbox" style={{ fontSize: '24px' }}></i>
                                <h6>Thực hiện chốt dịch vụ</h6>
                                Vui lòng chọn một Chốt dịch vụ từ danh sách phòng để thực hiện chốt dịch vụ
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="container" id="create-bill">
                      <div className="row">
                        <div
                          className="col-5 text-center"
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#f2fffe',
                            border: '1px solid #dff8e0',
                            borderRadius: '10px'
                          }}>
                          <div>
                            <div style={{ color: 'rgb(78, 188, 237)' }}>
                              <i className="bi bi-check" style={{ fontSize: '50px' }}></i>
                            </div>
                            <div style={{ color: 'rgb(78, 188, 237)', fontWeight: '700', fontSize: '18px' }}>
                              Đã chốt <span className="count-deal-price-item">0</span> phòng
                            </div>
                            <div>Nhập các thông tin bên phải để thực hiện tạo hóa đơn!</div>
                          </div>
                        </div>
                        <div className="col-7">
                          <div className="row g-2">
                            <div className="col-6">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control "
                                    name="date"
                                    data-format="date"
                                    id="date-add-bill"
                                    placeholder="Ngày lập hóa đơn"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                    options={{
                                      locale: Vietnamese, // Cấu hình ngôn ngữ tiếng Việt
                                      plugins: [
                                        new monthSelectPlugin({
                                          shorthand: true, //defaults to false
                                          dateFormat: 'm.y' //defaults to "F Y"
                                        })
                                      ]
                                    }}
                                  />
                                  <label htmlFor="month-series">Tháng lập phiếu</label>
                                </div>
                                <label className="input-group-text" htmlFor="month">
                                  <i className="bi bi-calendar" style={{ fontSize: '24px' }}></i>
                                </label>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-floating">
                                <select
                                  id="reason_id"
                                  name="reason_id"
                                  className="form-select form-control"
                                  data-format="numeric"
                                  aria-readonly
                                  required>
                                  <option value="1">Thu tiền hàng tháng </option>
                                </select>

                                <label htmlFor="reason_id">Lý do thu tiền</label>
                              </div>
                            </div>
                          </div>
                          <div className="row g-2 mt-2">
                            <div className="col-6">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control date-flat-picker flatpickr-input active"
                                    name="date"
                                    data-format="date"
                                    id="date-add-bill"
                                    placeholder="Ngày lập hóa đơn"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                    options={{ locale: Vietnamese }}
                                  />
                                  <label htmlFor="date-add-bill">Ngày lập hóa đơn</label>
                                </div>
                                <label className="input-group-text" htmlFor="date-add-bill">
                                  <i className="bi bi-calendar" style={{ fontSize: '24px' }}></i>
                                </label>
                              </div>
                              <div className="invalid-feedback">Vui lòng nhập Ngày lập hóa đơn</div>
                            </div>

                            <div className="col-6">
                              <div className="input-group">
                                <div className="form-floating">
                                  <Flatpickr
                                    className="form-control date-flat-picker flatpickr-input"
                                    name="deadline_bill_date"
                                    id="deadline_bill_date"
                                    data-format="date"
                                    placeholder="Nhập hạn đóng tiền cho hóa đơn"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                    options={{ locale: Vietnamese }}
                                  />

                                  <label htmlFor="deadline_bill_date">Hạn đóng tiền</label>
                                </div>
                                <label className="input-group-text" htmlFor="deadline_bill_date">
                                  <i className="bi bi-calendar" style={{ fontSize: '24px' }}></i>
                                </label>
                              </div>
                              <div className="invalid-feedback">Vui lòng nhập hạn đóng tiền hóa đơn</div>
                            </div>
                          </div>
                          <div className="col-12 calculate-spent-time-layout">
                            <div className="col-12 mb-2">
                              <div className="title-item-small">
                                <b>Thông tin ngày ở</b>
                                <i className="des">Nhập thông tin từ ngày đến ngày</i>
                              </div>
                            </div>

                            {/* Số tháng, ngày  layout  */}
                            <div className="row g-2 month-amount-layout" style={{ marginTop: '5px', display: 'none' }}>
                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <Flatpickr
                                    data-format="numeric"
                                    type="text"
                                    min="0"
                                    className="form-control"
                                    value="1"
                                    name="month_amount"
                                    id="month_amount"
                                    placeholder="Nhập số tháng"
                                  />
                                  <label htmlFor="month_amount">Số tháng</label>
                                  <div className="invalid-feedback">Vui lòng nhập số tháng tính tiền</div>
                                </div>
                              </div>

                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <input
                                    data-format="numeric"
                                    type="text"
                                    min="0"
                                    className="form-control"
                                    value="0"
                                    name="day_amount"
                                    id="day_amount"
                                    placeholder="Nhập số tháng"
                                  />
                                  <label htmlFor="day_amount">Số ngày lẻ</label>
                                  <div className="invalid-feedback">Vui lòng nhập số ngày lẻ</div>
                                </div>
                              </div>
                            </div>

                            {/* Từ ngày, đến ngày  layout  */}
                            <div className="row g-2 circle-month-layout" style={{ marginTop: '5px' }}>
                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <Flatpickr
                                    value={fromDate}
                                    onChange={handleFromDateChange}
                                    options={{ locale: Vietnamese, dateFormat: 'd/m/Y' }}
                                    className="form-control date-flat-picker flatpickr-input"
                                    name="date_from"
                                    id="date_from"
                                    data-format="date"
                                    placeholder="Từ ngày"
                                    pattern="\d{1,2}\/\d{1,2}\/\d{4}"
                                  />
                                  <label htmlFor="date_from">Từ ngày</label>
                                </div>
                              </div>

                              <div className="col-6 mt-2">
                                <div className="form-floating">
                                  <input
                                    type="date"
                                    className="form-control date-flat-picker"
                                    name="date_to"
                                    id="date_to"
                                    value={toDate} // Gán giá trị từ ngày "Từ ngày" + 1 tháng
                                    readOnly // Chỉ cho phép đọc
                                  />
                                  <label htmlFor="date_to">Đến ngày</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="loz-alert info mt-2 mb-2">
                            <div className="icon flex-0">
                              <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                            </div>
                            <div className="des flex-1">
                              <b>Thông tin:</b> Các phòng/giường lập hóa đơn mặc định tính <strong>tròn 1 tháng</strong>
                            </div>
                          </div>

                          <div className="addition-layount">
                            <div className="col-12 mt-2 mb-2">
                              <div className="title-item-small">
                                <b>Cộng thêm / Giảm trừ:</b>
                                <i className="des">Ví dụ cộng thêm ngày tết, giảm trừ covid...</i>
                              </div>
                            </div>
                            <div className="addition-item" id="addition-item">
                              <div className="loz-alert warning" style={{ marginBottom: '10px', marginTop: '10px' }}>
                                <div className="icon flex-0">
                                  <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                                </div>
                                <div className="des flex-1">
                                  Chú ý: Cộng thêm / giảm trừ không nên là tiền cọc. Hãy chọn lý do có tiền cọc để nếu
                                  cần
                                </div>
                              </div>
                              {items.map((_, index) => (
                                <AdditionItem key={index} index={index} onRemove={handleRemove} />
                              ))}
                            </div>
                            <div className="col-12">
                              <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', textAlign: 'end' }}>
                                <button
                                  type="button"
                                  id="addition-add"
                                  className="btn btn-secondary"
                                  onClick={handleAddItem}
                                  style={{ width: '100%' }}>
                                  <i className="bi bi-plus" style={{ fontSize: '24px' }}></i>
                                  Thêm mục cộng thêm / giảm trừ
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer--sticky mt-3">
                <div className="modal-footer">
                  <div className="row g-0" style={{ width: '100%' }}>
                    <div className="col-12">
                      <div className="loz-alert warning" style={{ marginBottom: '10px', marginTop: '0px' }}>
                        <div className="icon flex-0">
                          <i className="bi bi-info-circle" style={{ fontSize: '24px' }}></i>
                        </div>
                        <div className="des flex-1">
                          Để gửi hóa đơn tự đơn qua Zalo cho khách bạn phải tạo từng hóa đơn một. Việc gửi tự động cho
                          khách khi lập hóa đơn nhanh chỉ áp dụng khi khách thuê đang dùng app RRMS
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div>
                        <span style={{ fontSize: '16px', color: '#4ebced' }}>
                          <b className="count-deal-price-item badge " style={{ backgroundColor: '#4ebced' }}>
                            0
                          </b>{' '}
                          phòng đã được chốt dịch vụ và sẵn sàng lập hóa đơn
                        </span>
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        <i className="bi bi-x" style={{ fontSize: '17px' }}></i>
                        Đóng
                      </button>
                      {step === 2 && (
                        <button type="button" className="btn btn-primary m-1" onClick={handlePreviousStep}>
                          <i className="bi bi-arrow-left" style={{ fontSize: '17px' }}></i> Bước 1: Chốt dịch vụ
                        </button>
                      )}
                      {/* Nút chuyển đến bước tiếp theo hoặc nút lập hóa đơn (tùy theo bước hiện tại) */}
                      {step === 1 ? (
                        <button type="button" className="btn btn-primary m-1" onClick={handleNextStep}>
                          Bước 2: Lập hóa đơn <i className="bi bi-arrow-right" style={{ fontSize: '17px' }}></i>
                        </button>
                      ) : (
                        <button type="button" className="btn btn-primary m-1" onClick={handleSubmit}>
                          Lập hóa đơn <i className="bi bi-plus" style={{ fontSize: '17px' }}></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ModalEditInvoice
        modalOpen={modalOpenInvoice}
        toggleModal={toggleModalInvoice}
        invoice={invoice}
        onUpdateInvoice={(updatedInvoice) => {
            setInvoices((prevInvoices) => prevInvoices.map(inv => 
                inv.invoiceId === updatedInvoice.invoiceId ? updatedInvoice : inv
            ));
        }}
      />
      <ModalCollectMoneyInvoice
        modalOpen={modalOpenCollectMoney}
        toggleModal={toggleModalCollectMoney}
        invoice={invoice}
        fetchInvoices={() => fetchInvoices(motelId)}
        updateInvoiceStatus={updateInvoiceStatus}
      />
    </div>
  )
}

export default InvoiceManager