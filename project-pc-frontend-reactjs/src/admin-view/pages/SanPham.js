import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const DonHang = () => {
    const api = process.env.URL_NODE;
    const [listSanPham, setListSanPham] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm

    useEffect(() => {
        // Giả lập API call để lấy danh sách người dùng
        const fetchDonhang = async () => {
            const response = await axios.get(
                `http://localhost:8000/api/list-san-pham`
            );
            const dataWithId = response?.data?.data?.map((user, index) => ({
                ...user,
                id: index + 1,
            }));
            setListSanPham(dataWithId || []);
            setFilteredData(dataWithId || []); // Cập nhật dữ liệu khi tải
        };
        fetchDonhang();
    }, []);

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        // Lọc dữ liệu dựa trên giá trị tìm kiếm
        const filtered = listSanPham.filter((product) => {
            return (
                product.TENSP.toLowerCase().includes(value) ||
                product.TENTL.toLowerCase().includes(value) ||
                product.NHA_SAN_XUAT.toLowerCase().includes(value) ||
                product.MASP.toString().includes(value) // Thêm tìm kiếm theo mã sản phẩm
            );
        });

        setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
    };

    const handleDelete = (MASP) => {
        // Logic xóa sản phẩm
        console.log(`Xóa sản phẩm với mã ${MASP}`);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        // { field: "MASP", headerName: "Mã SP", width: 150 },
        { field: "TENSP", headerName: "Sản phẩm", width: 150 },
        {
            field: "ANHSP", headerName: "Ảnh", width: 150, renderCell: (params) => (
                <img
                    src={`http://localhost:8000/images/${params.row.ANHSP}`}
                    alt="Ảnh sản phẩm"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                />
            )
        },
        { field: "TENTL", headerName: "Loại", width: 150 },
        { field: "DON_GIA", headerName: "Đơn giá", width: 150 },
        { field: "TON_KHO_SP", headerName: "Tồn kho", width: 100 },
        { field: "CHIP", headerName: "Chip", width: 150 },
        { field: "MAIN", headerName: "Main", width: 150 },
        { field: "VGA", headerName: "VGA", width: 150 },
        { field: "NHA_SAN_XUAT", headerName: "Nhà sản xuất", width: 150 },
        { field: "RAM", headerName: "RAM", width: 150 },
        { field: "ROM", headerName: "ROM", width: 150 },
        // { field: "GHI_CHU_SP", headerName: "Ghi chú SP", width: 200 },
        // { field: "MO_TA_TL", headerName: "Mô tả loại", width: 200 },
        // { field: "GHI_CHU_TL", headerName: "Ghi chú loại", width: 200 },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(params.row.MASP)}
                >
                    Xóa
                </button>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <h5 className="card-title mb-4">Quản lý sản phẩm</h5>
            {/* Ô tìm kiếm */}
            <div className="mb-3">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Tìm kiếm sản phẩm..."
                    className="form-control"
                />
            </div>
            <div style={{ height: 1000, width: "100%" }}>
                <DataGrid rows={filteredData} columns={columns} pageSize={5} />
            </div>
        </div>
    );
};

export default DonHang;
