import React from "react";
import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Pagination,
    Rating,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { fontSize } from "@mui/system";
const AdminManagerGroup = () => {
    return (

        <div className="container" style={{ marginBottom: '20px' }}>
            <Typography sx={{ fontSize: '30px', textAlign: 'center' }}>Manager Group</Typography>
            <hr />
            <div className="row">
                <div className="col-lg-6" style={{ borderRadius: '10px', boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)' }}>
                    <form className="row g-3" style={{ margin: '10px' }}>
                        <div className="col-12">
                            <img style={{ borderRadius: '50%', height: '100px', width: '100px', objectFit: 'cover' }} src="https://thanhnien.mediacdn.vn/Uploaded/ngocthanh/2016_03_23/9x01_YGEO.jpg" alt="" />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">UserName</label>
                            <input type="text" className="form-control" />

                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Fullname</label>
                            <input type="text" className="form-control" />

                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Email</label>
                            <div className="input-group">
                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                <input type="text" className="form-control" />

                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="form-label">CCCD</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Phone</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Birthday</label>
                            <input type="date" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Confim Password</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Gender</label>
                            <div style={{ marginLeft: '30px' }}>
                                <label htmlFor="" className="form-label me-2">Nam</label>
                                <input className="form-check-input me-2" type="radio" name="flexRadioDefault" />
                                <label htmlFor="" className="form-label me-2">Nu</label>
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                            </div>
                        </div>
                        <div className="col-12" style={{ marginBottom: '10px' }}>
                            <button className="btn btn-success me-2" type="submit">Create</button>
                            <button className="btn btn-warning me-2" type="submit">Update</button>
                            <button className="btn btn-danger me-2" type="submit">Delete</button>
                            <button className="btn btn-primary me-2" type="submit">Reset</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6 table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">CCCD</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Birthday</th>
                                <th scope="col">Gender</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>NV01</td>
                                <td>Nguyen Van A</td>
                                <td>012345678910</td>
                                <td>0987654321</td>
                                <td>01/01/2000</td>
                                <td>Nam</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>NV01</td>
                                <td>Nguyen Van A</td>
                                <td>012345678910</td>
                                <td>0987654321</td>
                                <td>01/01/2000</td>
                                <td>Nam</td>
                            </tr>
                            <tr>
                                <th scope="row">1</th>
                                <td>NV01</td>
                                <td>Nguyen Van A</td>
                                <td>012345678910</td>
                                <td>0987654321</td>
                                <td>01/01/2000</td>
                                <td>Nam</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminManagerGroup