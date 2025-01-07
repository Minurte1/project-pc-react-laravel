import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const api = process.env.URL_NODE;
  const [listUsers, setListUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
  useEffect(() => {
    // Giả lập API call để lấy danh sách người dùng
    const fetchUsers = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/list-user`
      );
      const dataWithId = response?.data?.data?.map((user, index) => ({
        ...user,
        id: index + 1,
      }));
      setListUsers(dataWithId || []);
      setFilteredData(dataWithId || []); // Cập nhật dữ liệu khi tải
    };

    fetchUsers();
  }, []);
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    // Lọc dữ liệu dựa trên giá trị tìm kiếm
    const filtered = listUsers.filter((user) => {
      return (
        (user.TEN_KHACH_HANG?.toLowerCase()?.includes(value) || '') ||
        (user.TEN_DANG_NHAP?.toLowerCase()?.includes(value) || '') ||
        (user.SDT_KH?.toLowerCase()?.includes(value) || '') ||
        (user.DIA_CHI?.toString()?.includes(value) || '')
      );
    });

    setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
  };
  const handleDelete = (MA_KH) => {
    enqueueSnackbar(`Chưa làm xong, xóa mã KH ${MA_KH}`, { variant: "error" });
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
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(params.row.MA_KH)}
        >
          Xóa
        </button>
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
          placeholder="Tìm kiếm sản phẩm..."
          className="form-control"
        />
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={filteredData} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Users;
