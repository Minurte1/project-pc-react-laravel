import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import SanPhamModal from "./Modal/SanPhamModal"
import { selectAll } from "@testing-library/user-event/dist/cjs/event/index.js";
const DonHang = () => {
    const api = process.env.URL_NODE;
    const [listSanPham, setListSanPham] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [listTheLoai, setListTheLoai] = useState([]);
    const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm

    const [showModal, setShowModal] = useState(false);
    const [selectedSanPham, setSelectedSanPham] = useState("");

    useEffect(() => {
        fetchSanPham();
        fetchTheLoai();
    }, []);

    const fetchSanPham = async () => {
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
    const fetchTheLoai = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/list-the-loai`
        );
        const dataWithId = response?.data?.data?.map((user, index) => ({
            ...user,
            id: index + 1,
        }));
        setListTheLoai(dataWithId || []);
    };

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

    const handleShowModal = (sanpham) => {
        setSelectedSanPham(sanpham);
        setShowModal(true)
    };

    const handleDeleteSanPham = async (MASP) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (!isConfirmed) {
            return; // Hủy nếu người dùng không xác nhận
        }

        const response = await axios.post(`http://localhost:8000/api/xoa-san-pham//${MASP}`, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        enqueueSnackbar(`${response.message}`, { variant: "info" });
        fetchSanPham();
    };

    const handleSaveSanPham = () => {
        const fetchSanPham = async () => {
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
        fetchSanPham();
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
        { field: "NHA_SAN_XUAT", headerName: "Nhà sản xuất", width: 150 },
        { field: "CHIP", headerName: "Chip", width: 150 },
        { field: "MAIN", headerName: "Main", width: 150 },
        { field: "VGA", headerName: "VGA", width: 150 },
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
                <>
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleShowModal(params.row)}
                    >
                        Sửa
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={() => handleDeleteSanPham(params.row.MASP)}
                    >
                        Xóa
                    </button>
                </>
            ),
        },
    ];

    return (
        <>
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
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => setShowModal(true)}
                >
                    Thêm
                </button>

                <div style={{ height: 1000, width: "100%" }}>
                    <DataGrid rows={filteredData} columns={columns} pageSize={5} />
                </div>
            </div>
            <SanPhamModal
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setSelectedSanPham("");
                }}
                sanpham={selectedSanPham}
                listTheLoai={listTheLoai}
                handleSubmit={handleSaveSanPham}
            />
        </>
    );
};

export default DonHang;
