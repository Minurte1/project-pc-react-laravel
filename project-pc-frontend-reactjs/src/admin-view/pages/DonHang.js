import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import DonHangModal from "./Modal/DonHangModal";

const DonHang = () => {
  const api = process.env.URL_NODE;
  const [listUsers, setListUsers] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);
  const [listDonhang, setListDonhang] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
  const [showModal, setShowModal] = useState(false);
  const [selectedDonHang, setSelectedDonHang] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // Lưu giá trị của dropdown lọc trạng thái

  useEffect(() => {
    fetchDonhang();
    fetchUsers();
    fetchSanPham();
  }, []);

  const fetchDonhang = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/list-don-hang2`
    );
    const dataWithIdHD = response?.data?.listHoaDon?.map((user, index) => ({
      ...user,
      TONG_DOANH_THU2: user.TONG_DOANH_THU + " VNĐ",
      id: `HD-${index + 1}-${user.MAHD}`,
    }));
    setListDonhang(dataWithIdHD || []);
    setFilteredData(dataWithIdHD || []);
  };

  const fetchUsers = async () => {
    const response = await axios.get(`http://localhost:8000/api/list-user`);
    const dataWithId = response?.data?.data?.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setListUsers(dataWithId || []);
  };

  const fetchSanPham = async () => {
    const response = await axios.get(`http://localhost:8000/api/list-san-pham`);
    const dataWithId = response?.data?.data?.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setListSanPham(dataWithId || []);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    // Lọc dữ liệu dựa trên giá trị tìm kiếm và trạng thái lọc
    const filtered = listDonhang.filter((donhang) => {
      const matchesSearch =
        donhang.TEN_KHACH_HANG?.toLowerCase()?.includes(value) ||
        donhang.SDT_KH?.toLowerCase()?.includes(value) ||
        donhang.SDT_LIEN_HE_KH?.toLowerCase()?.includes(value) ||
        donhang.GHI_CHU_HOA_DON?.toLowerCase()?.includes(value) ||
        donhang.DIA_CHI?.toLowerCase()?.includes(value) ||
        donhang.DIA_CHI_SHIP?.toLowerCase()?.includes(value);

      return matchesSearch;
    });

    setFilteredData(filtered);
  };

  const handleStatusChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterStatus(event.target.value);
    const filtered = listDonhang.filter((donhang) => {
      const matchesSearch =
        donhang.GHI_CHU_HOA_DON?.toLowerCase()?.includes(value);

      return matchesSearch;
    });
    setFilteredData(filtered);
  };

  const handleShowModal = (donhang) => {
    setSelectedDonHang(donhang);
    setShowModal(true);
  };

  const handleDelete = async (MAHD) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (!isConfirmed) {
      return; // Hủy nếu người dùng không xác nhận
    }

    const response = await axios.post(
      `http://localhost:8000/api/xoa-don-hang/${MAHD}`
    );
    enqueueSnackbar(`${response.data.message}`, { variant: "info" });
    fetchDonhang();
  };

  const columns = [
    { field: "id", headerName: "Mã", width: 100 },
    { field: "TEN_KHACH_HANG", headerName: "Tên", width: 150 },
    { field: "SDT_LIEN_HE_KH", headerName: "Số điện thoại", width: 150 },
    { field: "DIA_CHI_SHIP", headerName: "Địa chỉ nhân hàng", width: 150 },
    { field: "GHI_CHU_HOA_DON", headerName: "Trạng thái", width: 150 },
    { field: "TONG_DOANH_THU2", headerName: "Doanh thu (VNĐ)", width: 150 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => (
        <>
          <Link
            to={{
              pathname: `/admin/chi-tiet-don-hang/${params.row.MAHD}`,
              state: { detailData: params.row },
            }}
            className="btn btn-info btn-sm"
          >
            Xem thêm
          </Link>
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
      <h5 className="card-title mb-4">Quản lý đơn hàng</h5>
      <div className="mb-3">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Tìm kiếm ..."
          className="form-control"
        />
      </div>

      {/* Dropdown Lọc Trạng Thái */}
      <div className="mb-3">
        <label>Lọc theo trạng thái:</label>
        <select
          className="form-control"
          value={filterStatus}
          onChange={handleStatusChange}
        >
          <option value=" ">Tất cả</option>
          <option value="Đang chờ thanh toán">Đang chờ thanh toán</option>
          <option value="Đơn thanh toán thành công">
            Đơn thanh toán thành công
          </option>
          <option value="Đơn hàng đã hủy">Đơn hàng đã hủy</option>
        </select>
      </div>

      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid rows={filteredData} columns={columns} pageSize={5} />
      </div>

      <DonHangModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setSelectedDonHang("");
        }}
        donhang={selectedDonHang}
        listUsers={listUsers}
        listSanPham={listSanPham}
        handleSubmit={fetchDonhang}
      />
    </div>
  );
};

export default DonHang;
