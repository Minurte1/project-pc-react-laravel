import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";

const Dashboard = () => {
  const earningsChartRef = useRef(null); // Ref to store the earnings chart instance
  const revenueChartRef = useRef(null); // Ref to store the revenue chart instance
  const [monthlyData, setMonthlyData] = useState([]); // State to store monthly earnings data
  const [revenueData, setRevenueData] = useState([]); // State to store revenue data for doughnut chart
  const [averageEarnings, setAverageEarnings] = useState(0); // State to store average earnings

  useEffect(() => {
    if (earningsChartRef.current) {
      earningsChartRef.current.destroy();
    }

    const earningsCtx = document
      .getElementById("earningsChart")
      .getContext("2d");

    // Tạo mảng để lưu doanh thu hàng tháng
    const monthlyEarnings = Array(12).fill(0);
    monthlyData.forEach((item) => {
      const monthIndex = new Date(item.bookingMonth + "-01").getMonth(); // Lấy chỉ số tháng từ bookingMonth
      monthlyEarnings[monthIndex] = parseFloat(item.totalFeeSum); // Cập nhật doanh thu vào tháng tương ứng
    });

    // Tạo biểu đồ earnings
    earningsChartRef.current = new Chart(earningsCtx, {
      type: "line",
      data: {
        labels: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12",
        ],
        datasets: [
          {
            label: "Thu nhập",
            data: monthlyEarnings, // Sử dụng dữ liệu doanh thu hàng tháng
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Tạo biểu đồ doughnut
    if (revenueChartRef.current) {
      revenueChartRef.current.destroy();
    }

    const revenueCtx = document.getElementById("revenueChart").getContext("2d");

    // Tạo mảng dữ liệu cho biểu đồ doughnut từ revenueData
    const revenueLabels = revenueData.map((item) => item.hotelName); // Giả sử revenueData có trường `source`
    const revenueValues = revenueData.map((item) => item.totalRoomTypes); // Giả sử revenueData có trường `amount`

    revenueChartRef.current = new Chart(revenueCtx, {
      type: "doughnut",
      data: {
        labels: revenueLabels,
        datasets: [
          {
            label: "top",
            data: revenueValues, // Dữ liệu từ API cho biểu đồ doughnut
            backgroundColor: ["#36a2eb", "#4bc0c0", "#ffcd56"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    return () => {
      if (earningsChartRef.current) {
        earningsChartRef.current.destroy();
      }
      if (revenueChartRef.current) {
        revenueChartRef.current.destroy();
      }
    };
  }, [monthlyData, revenueData]); // Chạy lại khi monthlyData hoặc revenueData thay đổi

  useEffect(() => {
    // Tính toán doanh thu trung bình khi monthlyData thay đổi
    const calculateAverageEarnings = () => {
      const monthlyEarnings = Array(12).fill(0);

      monthlyData.forEach((item) => {
        const monthIndex = new Date(item.bookingMonth + "-01").getMonth(); // Lấy chỉ số tháng từ bookingMonth
        monthlyEarnings[monthIndex] = parseFloat(item.totalFeeSum) || 0; // Cập nhật doanh thu vào tháng tương ứng
      });

      // Tính tổng doanh thu và số tháng
      const totalEarnings = monthlyEarnings.reduce(
        (sum, earnings) => sum + earnings,
        0
      );
      const averageEarningsValue = (totalEarnings / 12).toFixed(2); // Chia cho 12 tháng

      setAverageEarnings(averageEarningsValue); // Cập nhật giá trị trung bình vào state
    };

    calculateAverageEarnings();
  }, [monthlyData]);

  return (
    <>
      <div className="container-fluid p-4">
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card p-3 dashboard-card card-earnings-monthly d-flex">
              <div>
                <h5 className="card-title-earnings-monthly">
                  Thu nhập trung bình một tháng
                </h5>
                <h4>
                  {parseFloat(averageEarnings).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  VNĐ
                </h4>
              </div>
              <div>
                <i className="fas fa-calendar-alt card-title-earnings-monthly"></i>
              </div>{" "}
              {/* FontAwesome icon */}
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 dashboard-card card-earnings-annual">
              <div>
                <h5 className="card-title-earnings-annual">Tổng thu nhập</h5>

                <h4>
                  {monthlyData
                    .reduce(
                      (sum, item) => sum + parseFloat(item.totalFeeSum),
                      0
                    )
                    .toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                  VNĐ
                </h4>
              </div>
              <div>
                <i className="fas fa-dollar-sign card-title-earnings-annual"></i>
              </div>{" "}
              {/* FontAwesome icon */}
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 dashboard-card card-tasks">
              <div>
                <h5 className="card-title-tasks">Tasks</h5>
                <h3>50%</h3>
              </div>
              <div>
                <i className="fas fa-tasks card-title-tasks"></i>
              </div>{" "}
              {/* FontAwesome icon */}
            </div>
          </div>
          <div className="col-md-3">
            <div className="card p-3 dashboard-card card-pending-requests">
              <div>
                <h5 className="card-title-pending-requests">
                  Pending Requests
                </h5>
                <h3>18</h3>
              </div>
              <div>
                <i className="fas fa-comments card-title-pending-requests"></i>
              </div>{" "}
              {/* FontAwesome icon */}
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="card p-4">
              <h5>Biểu đồ thu nhập</h5>
              <canvas id="earningsChart"></canvas>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-4">
              <h5>Top khách sạn</h5>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
