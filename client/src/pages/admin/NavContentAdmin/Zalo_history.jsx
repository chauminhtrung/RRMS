import { useEffect } from 'react';  
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';  
import NavAdmin from '~/layouts/admin/NavbarAdmin';  
import YearMonthFilter from './YearMonthFilter'; 
import DescriptionIcon from '@mui/icons-material/Description'; 
// import { ReactTabulator } from 'react-tabulator'; 

const Zalo_history = ({ setIsAdmin, setIsNavAdmin, isNavAdmin, motels, setmotels }) => {  

  useEffect(() => {  
    setIsAdmin(true);  
  }, [setIsAdmin]);  

  return (  
    <div style={{backgroundColor:'rgb(228, 238, 245)'}}>  
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
          padding: '15px',  
          borderRadius: '10px',  
          margin: '0 10px 10px 10px',  
        }}  
      >  
        <YearMonthFilter />  
        
      </div> 
      <div style={{marginLeft:'15px',marginRight:'10px'}}>
        <Box className="header-item">  
            <h4 className="title-item">
              Lịch sử gửi hóa đơn qua zalo cho khách thuê
              <i className="des">Lịch sử gửi hóa đơn qua zalo cho khách thuê</i>
            </h4>  
          <Box display="flex" alignItems="center" style={{ width: '20%' }}>  
            <FormControl variant="outlined" fullWidth>  
              <InputLabel id="category-filter">Lọc theo phòng</InputLabel>  
              <Select  
                labelId="category-filter"  
                id="category-filter"  
                name="category"  
                label="Lọc theo phòng"  
              >  
                <MenuItem value="">  
                  Tất cả  
                </MenuItem>  
                {/* Thêm các mục MenuItem khác tại đây nếu cần */}  
              </Select>  
            </FormControl>   
          </Box>  
        </Box> 
      </div>

      <div className="header-table header-item" style={{ padding: '10px 10px',marginLeft:'15px',marginRight:'10px' }}>
        <div className="d-flex">
          <div className="icon">
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
              className="feather feather-filter">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span id="filter-count">0</span>
          </div>
          <div className="d-flex" style={{ flexWrap: 'wrap' }}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="is_active"
                data-value="status"
                value="is_active"
              />
              <label className="form-check-label" htmlFor="is_active">
                Đã gửi thành công
              </label>
              <span className="count-filter active success">0</span>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="checkbox"
                id="is_empty"
                data-value="status"
                value="is_empty"
              />
              <label className="form-check-label" htmlFor="is_empty">
                Đã gửi thất bại
              </label>
              <span className="count-filter empty error">0</span>
            </div>
          </div>
        </div>
        <Box display="flex" justifyContent="flex-end">  
          <Button  
            variant="contained"  
            color="primary"  
            sx={{ marginLeft: 1 }}  
            href="/quan-ly/7040/cai-dat-nha-tro#bill_setting"  
            startIcon={<DescriptionIcon />}  
          >  
            Bật/tắt tính năng gửi hóa đơn qua ZALO  
          </Button>  
        </Box>
      </div>
      {/* <div style={{ position: 'relative', height: '100%',marginLeft:'15px',marginRight:'10px' }}>
        <ReactTabulator
          className="my-custom-table"
          columns={columns}
          data={data}
          options={options}
          placeholder={<h1></h1>} /
        /> */}
        {/*{data.length === 0 && (
          <div className="custom-placeholder">
            <img
              src="https://quanlytro.me/images/empty-box-4085812-3385481.webp"
              alt="Không có dữ liệu"
              className="placeholder-image"
            />
            <div className="placeholder-text">Bạn chưa gửi tin nhắn Zalo nào</div>
          </div>
        )}*/}
      {/* </div> */}
    </div>  
  );  
};  

export default Zalo_history;