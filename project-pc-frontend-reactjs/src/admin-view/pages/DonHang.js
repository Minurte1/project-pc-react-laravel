import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const DonHang = () => {
    const api = process.env.URL_NODE;
    const [listDonhang, setListDonhang] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
    useEffect(() => {
        // Giả lập API call để lấy danh sách người dùng
        const fetchDonhang = async () => {
            const response = await axios.get(
                `http://localhost:8000/api/list-don-hang`
            );
            const dataWithId = response?.data?.data?.map((user, index) => ({
                ...user,
                id: index + 1,
            }));
            setListDonhang(dataWithId || []);
            setFilteredData(dataWithId || []); // Cập nhật dữ liệu khi tải
        };
        fetchDonhang();
    }, []);

    const handleDelete = (MAHD) => {
        enqueueSnackbar(`Chưa làm xong, xóa hóa đơn ${MAHD}`, { variant: "error" });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "TEN_KHACH_HANG", headerName: "Tên", width: 150 },
        {
            field: "ANHSP",
            headerName: "Ảnh",
            width: 150,
            renderCell: (params) => (
                <img
                    src={`http://localhost:8000/images/${params.row.ANHSP}`}
                    alt="Ảnh sản phẩm"
                    style={{ width: 50, height: 50, objectFit: "cover" }} // Điều chỉnh kích thước ảnh
                />
            ),
        },
        { field: "TENSP", headerName: "Sản phẩm", width: 150 },
        { field: "TENTL", headerName: "Loại", width: 150 },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(params.row.MAHD)}
                >
                    Xóa
                </button>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <h5 className="card-title mb-4">Quản lý người dùng</h5>

            <div style={{ height: 400, width: "100%" }}>
                <DataGrid rows={listDonhang} columns={columns} pageSize={5} />
            </div>
        </div>
    );
};

export default DonHang;
