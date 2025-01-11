import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    // Giả lập API call để lấy danh sách người dùng
    fetchDonhang();
    fetchUsers();
    fetchSanPham();
  }, []);
  const fetchDonhang = async () => {
    const response = await axios.get(`http://localhost:8000/api/list-don-hang`);
    const dataWithId = response?.data?.data?.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setListDonhang(dataWithId || []);
    setFilteredData(dataWithId || []); // Cập nhật dữ liệu khi tải
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

    // Lọc dữ liệu dựa trên giá trị tìm kiếm
    const filtered = listDonhang.filter((donhang) => {
      return (
        donhang.TEN_KHACH_HANG?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.TENSP?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.TENTL?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.SDT_KH?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.SDT_LIEN_HE_KH?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.NHA_SAN_XUAT?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.MO_TA_TL?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.GHI_CHU_TL?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.GHI_CHU_SP?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.GHI_CHU_HOA_DON?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.GHI_CHU_CTHD?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.DIA_CHI?.toLowerCase()?.includes(value) ||
        "" ||
        donhang.DIA_CHI_SHIP?.toLowerCase()?.includes(value) ||
        ""
      );
    });

    setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
  };

  const handleShowModal = (donhang) => {
    setSelectedDonHang(donhang);
    setShowModal(true);
  };

  const handleSaveSanPham = () => {
    fetchDonhang();
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "TEN_KHACH_HANG", headerName: "Tên khách hàng", width: 150 },
    { field: "GHI_CHU_KH", headerName: "Loại khách", width: 150 },
    { field: "DIA_CHI_SHIP", headerName: "Địa chỉ giao hàng", width: 150 },
    { field: "SDT_LIEN_HE_KH", headerName: "Số điện thoại", width: 150 },
    { field: "GHI_CHU_HOA_DON", headerName: "Trạng thái hóa đơn", width: 150 },
    {
      field: "ANHSP",
      headerName: "Ảnh sản phẩm",
      width: 150,
      renderCell: (params) => (
        <img
          src={`http://localhost:8000/images/${params.row.ANHSP}`}
          alt="Ảnh sản phẩm"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    { field: "SO_LUONG", headerName: "Số lượng", width: 150 },
    { field: "GIAM_GIA", headerName: "Giảm giá", width: 150 },
    { field: "DON_GIA", headerName: "Đơn giá", width: 150 },
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
          {/* <button
                        className="btn btn-danger btn-sm mx-1"
                        onClick={() => handleDelete(params.row.MAHD)}
                    >
                        Xóa
                    </button> */}
        </>
      ),
    },
  ];

  const rows = listDonhang.flatMap((item) =>
    item.chiTiet.map((ct) => ({
      id: ct.MA_CTHD, // Mỗi chi tiết sẽ có một ID riêng
      MA_KH: item.MA_KH,
      SDT_KH: item.SDT_KH,
      TEN_KHACH_HANG: item.TEN_KHACH_HANG,
      DIA_CHI_SHIP: item.DIA_CHI_SHIP,
      SDT_LIEN_HE_KH: item.SDT_LIEN_HE_KH,
      GHI_CHU_HOA_DON: item.GHI_CHU_HOA_DON,
      SO_LUONG: ct.SO_LUONG,
      GIAM_GIA: ct.GIAM_GIA,
      DON_GIA: ct.DON_GIA,
      ANHSP: ct.ANHSP,
      GHI_CHU_CTHD: ct.GHI_CHU_CTHD,
    }))
  );

  return (
    <div className="mt-2">
      <h5 className="card-title mb-4">Quản lý đơn hàng</h5>
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
      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
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
        handleSubmit={handleSaveSanPham}
      />
    </div>
  );
};

export default DonHang;
