import { Typography, Button } from '@mui/material';  
import houseImage from "";

const Banner = () => {  
    return (  
        <div className="banner">  
            <img src={houseImage} alt="House" className="banner-image" />  
            <Typography variant="h2" className="banner-title">Phần mềm quản lý nhà cho thuê</Typography>  
            <Typography variant="body1" className="banner-subtitle">Hiệu quả - Chuyên nghiệp - Tránh sai sót...</Typography>  
            <div className="banner-buttons">  
                <Button variant="contained" color="primary">Giới thiệu phần mềm</Button>  
                <Button variant="outlined" color="secondary">Tư vấn dịch vụ</Button>  
            </div>  
        </div>  
    );  
};  

export default Banner;