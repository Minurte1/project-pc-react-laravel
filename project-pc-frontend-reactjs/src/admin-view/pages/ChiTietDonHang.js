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
                (donhang.TEN_KHACH_HANG?.toLowerCase()?.includes(value) || '') ||
                (donhang.SDT_KH?.toLowerCase()?.includes(value) || '') ||
                (donhang.SDT_LIEN_HE_KH?.toLowerCase()?.includes(value) || '') ||
                (donhang.GHI_CHU_HOA_DON?.toLowerCase()?.includes(value) || '') ||
                (donhang.DIA_CHI?.toLowerCase()?.includes(value) || '') ||
                (donhang.DIA_CHI_SHIP?.toLowerCase()?.includes(value) || '')
            );
        });

        setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
    };

    const handleShowModal = (donhang) => {
        selectedChiTietDonHang(donhang);
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
        { field: "id", headerName: "Mã", width: 100 },
        { field: "TEN_KHACH_HANG", headerName: "Tên", width: 150 },
        { field: "SDT_LIEN_HE_KH", headerName: "Số điện thoại", width: 150 },
        { field: "GHI_CHU_KH", headerName: "Loại khách", width: 150 },
        { field: "DIA_CHI_SHIP", headerName: "Địa chỉ nhân hàng", width: 150 },
        { field: "GHI_CHU_HOA_DON", headerName: "Trạng thái", width: 150 },
        {
            field: "actions",
            headerName: "Hành động",
            width: 250,
            renderCell: (params) => (
                <>
                    <button
                        type="button"
                        className="btn btn-warning btn-sm mx-1"
                        onClick={() => handleShowModal(params.row)}
                    >
                        Sửa
                    </button>

                    <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDelete(params.row.MAHD)}
                    >
                        Xóa
                    </button>
                </>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <h5 className="card-title mb-4">Quản lý chi tiết đơn hàng</h5>
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
            <ChiTietDonhangModal
                show={showModal}
                handleClose={() => {
                    setShowModal(false);
                    setSelectedChiTietDonHang("");
                }}
                chitietdonhang={setSelectedChiTietDonHang}
                mahd={mahd}
                listSanPham={listSanPham}
                handleSubmit={handleSaveSanPham}
            />
        </div>
    );
};

export default ChiTietDonHang;
