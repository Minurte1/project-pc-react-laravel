import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"; // Import useLocation và useParams
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import ChiTietDonhangModal from "./Modal/ChiTietDonhangModal"
const ChiTietDonHang = () => {
    const api = process.env.URL_NODE;
    const location = useLocation(); // Lấy location từ react-router-dom
    const { mahd } = useParams();  // Lấy MAHD từ URL params

    const [listSanPham, setListSanPham] = useState([]);
    const [listDonhangChiTiet, setListDonhangChiTiet] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
    const [showModal, setShowModal] = useState(false);
    const [selectedChiTietDonHang, setSelectedChiTietDonHang] = useState("");
    useEffect(() => {
        fetchDonhang();
        fetchSanPham();
    }, []);

    const fetchDonhang = async () => {
        const response = await axios.post(`http://localhost:8000/api/get-chi-tiet-don-hang/${mahd}`);
        const dataWithIdHD = response?.data?.data?.map((user, index) => ({
            ...user,
            id: `HDCT-${index + 1}-${user.MAHD}`,
        }));
        setFilteredData(dataWithIdHD || []); // Cập nhật dữ liệu khi tải
        setListDonhangChiTiet(dataWithIdHD || []);
    };
    const fetchSanPham = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/list-san-pham`
        );
        const dataWithId = response?.data?.data?.map((user, index) => ({
            ...user,
            id: index + 1,
        }));
        setListSanPham(dataWithId || []);
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        // Lọc dữ liệu dựa trên giá trị tìm kiếm
        const filtered = listDonhangChiTiet.filter((donhang) => {
            return (
                (donhang.TENSP?.toLowerCase()?.includes(value) || '') ||
                (donhang.TENTL?.toLowerCase()?.includes(value) || '') ||
                (donhang.VGA?.toLowerCase()?.includes(value) || '') ||
                (donhang.CHIP?.toLowerCase()?.includes(value) || '') ||
                (donhang.ROM?.toLowerCase()?.includes(value) || '') ||
                (donhang.RAM?.toLowerCase()?.includes(value) || '') ||
                (donhang.NHA_SAN_XUAT?.toLowerCase()?.includes(value) || '') ||
                (donhang.MO_TA_TL?.toLowerCase()?.includes(value) || '') ||
                (donhang.MAIN?.toLowerCase()?.includes(value) || '') ||
                (donhang.GHI_CHU_TL?.toLowerCase()?.includes(value) || '') ||
                (donhang.GHI_CHU_SP?.toLowerCase()?.includes(value) || '')
            );
        });

        setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
    };

    const handleShowModal = (chitietdonhang) => {
        setSelectedChiTietDonHang(chitietdonhang);
        setShowModal(true)
    };

    const handleSaveSanPham = () => {
        fetchDonhang();
    };

    const handleDelete = async (MAHD) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (!isConfirmed) {
            return; // Hủy nếu người dùng không xác nhận
        }

        // xóa

        // enqueueSnackbar(`${response.data.message}`, { variant: "info" });
        fetchDonhang();
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
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
                        onClick={() => handleDelete(params.row.MASP)}
                    >
                        Xóa
                    </button>
                </>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <h5 className="card-title mb-4">Quản lý hóa đơn số HD-{mahd}</h5>
            {/* Ô tìm kiếm */}
            <div className="mb-3">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearch}
                    placeholder="Tìm kiếm ..."
                    className="form-control"
                />
            </div>
            <div style={{ height: 'auto', width: "100%" }}>
                <DataGrid rows={filteredData} columns={columns} pageSize={5} />
            </div>
            <ChiTietDonhangModal
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setSelectedChiTietDonHang("");
                }}
                chitietdonhang={selectedChiTietDonHang}
                mahd={mahd}
                listSanPham={listSanPham}
                handleSubmit={handleSaveSanPham}
            />
        </div>
    );
};

export default ChiTietDonHang;
