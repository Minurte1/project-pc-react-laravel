import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    const rows = [
        { id: 1, product: 'Gaming PC', price: 1500, stock: 10 },
        { id: 2, product: 'Workstation PC', price: 2000, stock: 5 },
        { id: 3, product: 'Mini PC', price: 800, stock: 20 },
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'product', headerName: 'Product', width: 150 },
        { field: 'price', headerName: 'Price ($)', width: 110 },
        { field: 'stock', headerName: 'Stock', width: 110 },
    ];

    const chartData = {
        labels: ['Gaming PC', 'Workstation PC', 'Mini PC'],
        datasets: [
            {
                label: 'Stock Levels',
                data: [10, 5, 20],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className='container'>
            <div className='row'>
                <h2>Dashboard</h2>
                <p>Welcome to the PC Store Dashboard!</p>

                <div style={{ height: 300, width: '100%', marginBottom: '20px' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </div>

                <div style={{ width: '100%', height: 400 }}>
                    <Bar data={chartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;