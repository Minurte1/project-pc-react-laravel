import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import {
    Bar,
    Line,
    Pie,
    Doughnut,
    Radar,
    Bubble,
    Scatter,
    Chart,
    PolarArea,
} from "react-chartjs-2";
import "chart.js/auto"; // Đăng ký tự động

const Dashboard = () => {
    const [listDoanhThu, setListDoanhThu] = useState([]);
    const [barDataDoanhThu, setBarDataDoanhThu] = useState(null);

    useEffect(() => {
        fetchDoanhThu();
    }, []);
    const fetchDoanhThu = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/list-danh-thu`
        );
        const dataWithId = response?.data?.data?.map((user, index) => ({
            ...user,
            TONG_DOANH_THU2: user.TONG_DOANH_THU + " VNĐ",
            id: index + 1,
        }));
        setListDoanhThu(dataWithId || []);
        // Chuyển đổi dữ liệu để vẽ biểu đồ
        const transformedData = transformDataForBarChart(dataWithId);
        setBarDataDoanhThu(transformedData);
    };
    // Chuyển đổi dữ liệu để phù hợp với Bar Chart
    const transformDataForBarChart = (dataWithId) => {
        const labels = dataWithId.map((item) => item.TENSP); // Lấy tên sản phẩm làm nhãn
        const datasets = [
            {
                label: "Tổng Doanh Thu", // Tiêu đề biểu đồ
                data: dataWithId.map((item) => item.TONG_DOANH_THU), // Lấy tổng doanh thu
                backgroundColor: dataWithId.map(
                    () =>
                        `#${Math.floor(Math.random() * 16777215).toString(16)}` // Màu ngẫu nhiên cho mỗi cột
                ),
            },
        ];

        return { labels, datasets };
    };

    // Biểu đồ tròn (Pie Chart)
    const pieData = {
        labels: ["Red", "Blue", "Yellow", "Green"],
        datasets: [
            {
                data: [300, 50, 100, 75],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    // Biểu đồ bánh rán (Doughnut Chart)
    const doughnutData = {
        labels: ["Red", "Blue", "Yellow", "Green"],
        datasets: [
            {
                data: [300, 50, 100, 75],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "TENSP", headerName: "Tên", width: 200 },
        {
            field: "ANHSP", headerName: "Ảnh", width: 150, renderCell: (params) => (
                <img
                    src={`http://localhost:8000/images/${params.row.ANHSP}`}
                    alt="Ảnh sản phẩm"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                />
            )
        },
        { field: "DON_GIA", headerName: "Đơn giá (VNĐ)", width: 200 },
        { field: "TENTL", headerName: "Loại", width: 150 },
        { field: "TONG_DOANH_THU2", headerName: "Tổng doanh thu", width: 150 },
    ];

    return (
        <div className="row mt-3">
            {/* <div className="col-md-6">
                <h2>Pie Chart</h2>
                <Pie data={pieData} />
            </div>
            <div className="col-md-6">
                <h2>Doughnut Chart</h2>
                <Doughnut data={doughnutData} />
            </div> */}
            <div className="col-md-12 mt-3">
                <h2>Doanh thu sản phẩm</h2>
                {barDataDoanhThu && <Bar data={barDataDoanhThu} />}
            </div>
            <h5 className="card-title my-4">Bảng doanh thu sản phẩm</h5>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={listDoanhThu} columns={columns} pageSize={5} />
            </div>
        </div>
    );
};

export default Dashboard;