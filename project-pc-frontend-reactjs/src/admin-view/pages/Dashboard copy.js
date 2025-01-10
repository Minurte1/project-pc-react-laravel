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
    const [pieDataBieuDoDoanhThuTheLoai, setPieDataBieuDoDoanhThuTheLoai] = useState(null);
    const [doughnutDataDoanhThu, setDoughnutDataDoanhThu] = useState({});

    useEffect(() => {
        fetchDoanhThu();
        fetchDoanhThuTheLoai()
    }, []);
    const fetchDoanhThu = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/list-danh-thu`
        );
        const dataWithId = response?.data?.data?.map((user, index) => ({
            ...user,
            id: index + 1,
        }));
        console.log("dataWithId: ", dataWithId)

        // Lọc các sản phẩm có TONG_DOANH_THU > 0
        const filteredData = dataWithId.filter(item => item.TONG_DOANH_THU > 0);

        // Chuyển đổi dữ liệu cho biểu đồ tròn
        // const pieData = {
        //     labels: filteredData.map(item => item.TENSP), // Nhãn là tên sản phẩm
        //     datasets: [
        //         {
        //             data: filteredData.map(item => item.TONG_DOANH_THU), // Dữ liệu là tổng doanh thu
        //             backgroundColor: filteredData.map(() => {
        //                 // Màu ngẫu nhiên cho mỗi sản phẩm
        //                 const r = Math.floor(Math.random() * 128);
        //                 const g = Math.floor(Math.random() * 128);
        //                 const b = Math.floor(Math.random() * 128);
        //                 return `rgb(${r}, ${g}, ${b})`;
        //             }),
        //         },
        //     ],
        // };

        // setDoughnutDataDoanhThu(pieData); // Cập nhật dữ liệu cho biểu đồ tròn
        setListDoanhThu(dataWithId || []);
        // Chuyển đổi dữ liệu để vẽ biểu đồ
        const transformedData = transformDataForBarChart(dataWithId);
        setBarDataDoanhThu(transformedData);
    };
    const fetchDoanhThuTheLoai = async () => {
        const response = await axios.get(
            `http://localhost:8000/api/list-danh-thu-the-loai`
        );
        const dataWithId = response?.data?.data?.map((user, index) => ({
            ...user,
            id: index + 1,
        }));
        // Biểu đồ tròn (Pie Chart)
        // Chuyển đổi dữ liệu thành định dạng cho Pie Chart
        // setDoughnutDataDoanhThu({
        //     labels: dataWithId?.map(item => item.TENTL), // Lấy tên thể loại
        //     datasets: [
        //         {
        //             data: dataWithId.map(item => item.TONG_DOANH_THU), // Lấy tổng doanh thu
        //             backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Màu sắc cho từng phần
        //         },
        //     ],
        // });
    };
    // Chuyển đổi dữ liệu để phù hợp với Bar Chart
    const transformDataForBarChart = (dataWithId) => {
        const labels = dataWithId.map((item) => item.TENSP); // Lấy tên sản phẩm làm nhãn
        const datasets = [
            {
                label: "Tổng Doanh Thu", // Tiêu đề biểu đồ
                data: dataWithId.map((item) => item.TONG_DOANH_THU), // Lấy tổng doanh thu
                backgroundColor: dataWithId.map(() => {
                    // Tạo màu ngẫu nhiên với độ sáng tối hơn
                    const r = Math.floor(Math.random() * 128);  // Giới hạn từ 0 đến 127 cho màu đỏ
                    const g = Math.floor(Math.random() * 128);  // Giới hạn từ 0 đến 127 cho màu xanh lá
                    const b = Math.floor(Math.random() * 128);  // Giới hạn từ 0 đến 127 cho màu xanh dương
                    return `rgb(${r},${g},${b})`;  // Trả về màu với độ sáng thấp
                }),
            },
        ];

        return { labels, datasets };
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
        { field: "TONG_DOANH_THU", headerName: "Tổng doanh thu", width: 150 },
    ];

    return (
        <div className="row mt-3">
            <div className="col-md-6">
                <h2>Doanh thu theo loại</h2>
                {pieDataBieuDoDoanhThuTheLoai && <Pie data={pieDataBieuDoDoanhThuTheLoai} />}
            </div>
            <div className="col-md-6">
                <h2>Doughnut Chart</h2>
                <Doughnut data={doughnutDataDoanhThu} />
            </div>
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