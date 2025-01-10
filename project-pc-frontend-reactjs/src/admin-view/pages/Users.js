import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import KhachHangModal from "./Modal/KhachHangModal";
const Users = () => {
  const api = process.env.URL_NODE;
  const [listUsers, setListUsers] = useState([]);
  const [listPhanQuyen, setListPhanQuyen] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [selectedKhachHang, setSelectedKhachHang] = useState("");
  useEffect(() => {
    fetchUsers();
    fetchListPhanQuyen();
  }, []);
  const fetchUsers = async () => {
    const response = await axios.get(`http://localhost:8000/api/list-user`);
    const dataWithId = response?.data?.data?.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setListUsers(dataWithId || []);
    setFilteredData(dataWithId || []); // Cập nhật dữ liệu khi tải
  };
  const fetchListPhanQuyen = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/list-phan-quyen`
    );
    const dataWithId = response?.data?.data?.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setListPhanQuyen(dataWithId || []);
  };
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    // Lọc dữ liệu dựa trên giá trị tìm kiếm
    const filtered = listUsers.filter((user) => {
      return (
        user.TEN_KHACH_HANG?.toLowerCase()?.includes(value) ||
        "" ||
        user.TEN_DANG_NHAP?.toLowerCase()?.includes(value) ||
        "" ||
        user.SDT_KH?.toLowerCase()?.includes(value) ||
        "" ||
        user.DIA_CHI?.toString()?.includes(value) ||
        ""
      );
    });

    setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
  };

  const handleSave = () => {
    fetchUsers();
  };

  const handleShowModal = (khachhang) => {
    setSelectedKhachHang(khachhang);
    setShowModal(true);
  };

  const handleDelete = async (MA_KH) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa ?");
    if (!isConfirmed) {
      return; // Hủy nếu người dùng không xác nhận
    }

    const response = await axios.post(
      `http://localhost:8000/api/xoa-khach-hang/${MA_KH}`
    );

    enqueueSnackbar(`${response.data.message}`, { variant: "info" });
    fetchUsers();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "TEN_KHACH_HANG", headerName: "Tên", width: 150 },
    { field: "TEN_DANG_NHAP", headerName: "Email", width: 150 },
    { field: "SDT_KH", headerName: "Điện thoại", width: 150 },
    { field: "DIA_CHI", headerName: "Địa chỉ", width: 150 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <>
          <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={() => handleShowModal(params.row)}
          >
            Sửa
          </button>
          <button
            className="btn btn-danger btn-sm mx-1"
            onClick={() => handleDelete(params.row.MA_KH)}
          >
            Xóa
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="mt-2">
      <h5 className="card-title mb-4">Quản lý người dùng</h5>
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
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setShowModal(true)}
      >
        Thêm
      </button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={filteredData} columns={columns} pageSize={5} />
      </div>
      <KhachHangModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedKhachHang("");
        }}
        khachhang={selectedKhachHang}
        listPhanQuyen={listPhanQuyen}
        handleSubmit={handleSave}
      />
    </div>
  );
};

export default Users;
