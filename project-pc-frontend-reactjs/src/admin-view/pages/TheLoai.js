import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const TheLoai = () => {
    const api = process.env.URL_NODE;
    const [listTheLoai, setListTheLoai] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState(""); // Lưu giá trị tìm kiếm
    useEffect(() => {
        // Giả lập API call để lấy danh sách người dùng
        const fetchUsers = async () => {
            const response = await axios.get(
                `http://localhost:8000/api/list-the-loai`
            );
            const dataWithId = response?.data?.data?.map((user, index) => ({
                ...user,
                id: index + 1,
            }));
            setListTheLoai(dataWithId || []);
            setFilteredData(dataWithId || []); // Cập nhật dữ liệu khi tải
        };

        fetchUsers();
    }, []);
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        // Lọc dữ liệu dựa trên giá trị tìm kiếm
        const filtered = listTheLoai.filter((user) => {
            return (
                (user.TENTL?.toLowerCase()?.includes(value) || '') ||
                (user.MO_TA_TL?.toLowerCase()?.includes(value) || '')
            );
        });

        setFilteredData(filtered); // Cập nhật dữ liệu sau khi lọc
    };
    const handleDelete = (MATL) => {
        enqueueSnackbar(`Chưa làm xong, xóa mã ${MATL}`, { variant: "error" });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "TENTL", headerName: "Tên", width: 150 },
        { field: "MO_TA_TL", headerName: "Email", width: 150 },
        {
            field: "actions",
            headerName: "Hành động",
            width: 150,
            renderCell: (params) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(params.row.MATL)}
                >
                    Xóa
                </button>
            ),
        },
    ];

    return (
        <div className="mt-2">
            <h5 className="card-title mb-4">Quản lý loại sản phẩm</h5>
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

export default TheLoai;
