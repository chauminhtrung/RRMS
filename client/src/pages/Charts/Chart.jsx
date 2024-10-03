import { Box, Typography, Breadcrumbs,Container,Grid,FormControl,MenuItem,InputLabel,Select ,TextField,Button,Divider  } from '@mui/material';  
import "./Chart.css";
import { BarChart } from '@mui/x-charts/BarChart';
//test
const RealEstateBanner = () => {  
    return (  
        <div>  
            <Container> 
                <Breadcrumbs className="breadcrumb ms-5">  
                    <a className="breadcrumb-item" href="/">Home</a>  
                    <Typography className="breadcrumb-item active">Tham khảo giá</Typography>  
                </Breadcrumbs>  
                <Grid container spacing={2}>  
                    <Grid item xl={7} md={12} className="d-flex align-content-center text-center">  
                        <div className="align-self-center align-baseline">  
                            <Typography variant="h3" className="title" fontWeight="bold">  
                                Toàn cảnh biến động giá trọ tháng 8  
                            </Typography>  
                            <article>  
                                <Typography variant="h4" className="title-descrip">  
                                    <span className="wrap">Số liệu được tính dựa trên giá thực tế các phòng trọ được đăng </span>  
                                </Typography>  
                            </article>  
                        </div>  
                    </Grid>  
                    <Grid item xl={5} md={12} className="image-slider text-center">  
                        <img  
                            className="img-bannerChart"  
                            style={{ width: '100%', height: 'auto', maxWidth: '526px' }}  
                            src="https://quanlynhatro.com/files/1649324952624eb39854d84.jpg"  
                        />  
                    </Grid>  
                </Grid>  
                <Box className="wrapper-banner">  
                    <Box className="container-banner">  
                        <Box className="about">  
                            <AboutItem  
                                iconClass="bi bi-graph-up-arrow"  
                                text="Giá thực tế đang giao dịch trên thị trường"  
                            />  
                            <AboutItem  
                                iconClass="bi bi-geo-alt"  
                                text="Chi tiết đến từng phường / huyện 5 thành phố lớn"  
                            />  
                            <AboutItem  
                                iconClass="bi bi-building"  
                                text="Phân loại riêng biệt nhà đất, chung cư"  
                            />  
                        </Box>  
                    </Box>  
                </Box> 
             

                <Box sx={{ flexGrow: 1 }}>
                    <Typography className="align-content-center text-center mt-5" variant="h3">Xem giá nhà trọ</Typography>  
                    <Typography className="align-content-center text-center mt-1 mb-3">Chọn khu vực và loại bất động sản mà bạn muốn xem giá</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={3} >
                            <FormControl fullWidth>  
                                <InputLabel id="property-type-label">Chọn loại hình (Nhà ở, Căn hộ...)</InputLabel>  
                                <Select  
                                    labelId="property-type-label"  
                                    defaultValue=""  
                                    className="select"  
                                >  
                                    <MenuItem value="" disabled>Chọn loại hình (Nhà ở, Căn hộ...)</MenuItem>  
                                    <MenuItem value="Nhà ở">Nhà ở</MenuItem>  
                                    <MenuItem value="Căn hộ">Căn hộ/Chung cư</MenuItem>  
                                    <MenuItem value="Đất">Đất</MenuItem>  
                                </Select>  
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={3}>
                            <FormControl fullWidth>  
                                <InputLabel id="area-label">Chọn khu vực (Tỉnh/thành, quận...)</InputLabel>  
                                <Select  
                                    labelId="area-label"  
                                    defaultValue=""  
                                    className="select"  
                                >  
                                    <MenuItem value="" disabled>Chọn khu vực (Tỉnh/thành, quận...)</MenuItem>  
                                    <MenuItem value="Tp Hồ Chí Minh">Tp Hồ Chí Minh</MenuItem>  
                                </Select>  
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={3}>
                            <TextField  
                                variant="outlined"  
                                className="select"  
                                placeholder="Nhập tên đường bạn muốn"  
                                fullWidth  
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={3}>
                            <Button sx={{ padding: '15px 87px'}} variant="contained">Xem giá ngay</Button>
                        </Grid>
                    </Grid>
                </Box>
 


                <Box className="chart-container mt-5">  
                    <Typography variant="h4" className="align-content-center text-center mb-3">  
                        Biểu đồ doanh thu  
                    </Typography>  
                    <BarChart  
                        series={[  
                        { data: [100, 44, 24, 34,35, 44, 24, 34,35, 44, 24, 34] },  
                        ]}  
                        height={390}  
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4','Q5', 'Q6', 'Q7', 'Q8','Q9', 'Q10', 'Q11', 'Q12'], scaleType: 'band' }]}  
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}  
                        colors={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']}
                    />  
                </Box>    

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Box className="cardWrapper" flex="1" m={1}>  
                                <Typography variant="h5" className="DashBoardIndexTitle">  
                                    Quận 1  
                                </Typography>  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá trung bình tháng 8</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">40,0/m2</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 7/2024</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">4,5%</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 8/2023</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">18,1%</Typography>  
                                </Box>  

                                <Box className="LoadDetail__Wrapper">  
                                    <Button variant="outlined" className="buttonDetail">Xem chi tiết  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">  
                                        <g fill="none" fillRule="evenodd">  
                                        <path stroke="#38699F" strokeLinecap="round" strokeWidth="1.5" d="M1.125 3L6.75 8 1.125 13" transform="translate(1 1)" />  
                                        <path stroke="#FFF" strokeWidth=".1" d="M0 0H9V16H0z" opacity=".01" transform="translate(1 1)" />  
                                        </g>  
                                    </svg>  
                                    </Button>  
                                </Box>  
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Box className="cardWrapper" flex="1" m={1}>  
                                <Typography variant="h5" className="DashBoardIndexTitle">  
                                    Quận 2  
                                </Typography>  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá trung bình tháng 8</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">40,0/m2</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 7/2024</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">4,5%</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 8/2023</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">18,1%</Typography>  
                                </Box>  

                                <Box className="LoadDetail__Wrapper">  
                                    <Button variant="outlined" className="buttonDetail">Xem chi tiết  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">  
                                        <g fill="none" fillRule="evenodd">  
                                        <path stroke="#38699F" strokeLinecap="round" strokeWidth="1.5" d="M1.125 3L6.75 8 1.125 13" transform="translate(1 1)" />  
                                        <path stroke="#FFF" strokeWidth=".1" d="M0 0H9V16H0z" opacity=".01" transform="translate(1 1)" />  
                                        </g>  
                                    </svg>  
                                    </Button>  
                                </Box>  
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Box className="cardWrapper" flex="1" m={1}>  
                                <Typography variant="h5" className="DashBoardIndexTitle">  
                                    Quận 3  
                                </Typography>  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá trung bình tháng 8</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">40,0/m2</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 7/2024</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">4,5%</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 8/2023</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">18,1%</Typography>  
                                </Box>  

                                <Box className="LoadDetail__Wrapper">  
                                    <Button variant="outlined" className="buttonDetail">Xem chi tiết  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">  
                                        <g fill="none" fillRule="evenodd">  
                                        <path stroke="#38699F" strokeLinecap="round" strokeWidth="1.5" d="M1.125 3L6.75 8 1.125 13" transform="translate(1 1)" />  
                                        <path stroke="#FFF" strokeWidth=".1" d="M0 0H9V16H0z" opacity=".01" transform="translate(1 1)" />  
                                        </g>  
                                    </svg>  
                                    </Button>  
                                </Box>  
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Box className="cardWrapper" flex="1" m={1}>  
                                <Typography variant="h5" className="DashBoardIndexTitle">  
                                    Quận 4  
                                </Typography>  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá trung bình tháng 8</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">40,0/m2</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 7/2024</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">4,5%</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 8/2023</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">18,1%</Typography>  
                                </Box>  

                                <Box className="LoadDetail__Wrapper">  
                                    <Button variant="outlined" className="buttonDetail">Xem chi tiết  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">  
                                        <g fill="none" fillRule="evenodd">  
                                        <path stroke="#38699F" strokeLinecap="round" strokeWidth="1.5" d="M1.125 3L6.75 8 1.125 13" transform="translate(1 1)" />  
                                        <path stroke="#FFF" strokeWidth=".1" d="M0 0H9V16H0z" opacity=".01" transform="translate(1 1)" />  
                                        </g>  
                                    </svg>  
                                    </Button>  
                                </Box>  
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Box className="cardWrapper" flex="1" m={1}>  
                                <Typography variant="h5" className="DashBoardIndexTitle">  
                                    Quận 5  
                                </Typography>  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá trung bình tháng 8</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">40,0/m2</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 7/2024</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">4,5%</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 8/2023</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">18,1%</Typography>  
                                </Box>  

                                <Box className="LoadDetail__Wrapper">  
                                    <Button variant="outlined" className="buttonDetail">Xem chi tiết  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">  
                                        <g fill="none" fillRule="evenodd">  
                                        <path stroke="#38699F" strokeLinecap="round" strokeWidth="1.5" d="M1.125 3L6.75 8 1.125 13" transform="translate(1 1)" />  
                                        <path stroke="#FFF" strokeWidth=".1" d="M0 0H9V16H0z" opacity=".01" transform="translate(1 1)" />  
                                        </g>  
                                    </svg>  
                                    </Button>  
                                </Box>  
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Box className="cardWrapper" flex="1" m={1}>  
                                <Typography variant="h5" className="DashBoardIndexTitle">  
                                    Quận 6  
                                </Typography>  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá trung bình tháng 8</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">40,0/m2</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 7/2024</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">4,5%</Typography>  
                                </Box>  
                                <Divider className="DashBoardIndexCard__Line" />  
                                
                                <Box className="DashBoardIndexRow">  
                                    <Typography className="DashBoardIndexCard__Text">Giá so với tháng 8/2023</Typography>  
                                    <Typography className="DashBoardIndexCard__Text">18,1%</Typography>  
                                </Box>  

                                <Box className="LoadDetail__Wrapper">  
                                    <Button variant="outlined" className="buttonDetail">Xem chi tiết  
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18">  
                                        <g fill="none" fillRule="evenodd">  
                                        <path stroke="#38699F" strokeLinecap="round" strokeWidth="1.5" d="M1.125 3L6.75 8 1.125 13" transform="translate(1 1)" />  
                                        <path stroke="#FFF" strokeWidth=".1" d="M0 0H9V16H0z" opacity=".01" transform="translate(1 1)" />  
                                        </g>  
                                    </svg>  
                                    </Button>  
                                </Box>  
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>            
        </div>  
    );  
};  

const AboutItem = ({ text, iconClass }) => {  
    return (  
        <Box className="about-item">  
            <i className={iconClass} style={{ fontSize: '56px', marginBottom: '8px' }}></i>  
            <Typography>{text}</Typography>  
        </Box>  
    );  
}

export default RealEstateBanner;