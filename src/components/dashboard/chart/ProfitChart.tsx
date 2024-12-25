"use client"
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import ItemSold from './profitInfo/ItemSold'
import Profit from './profitInfo/Profit'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function ProfitChart() {
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Profit 2023',
                data: [
                    678, 1200, 678, 1700, 985, 2034, 1987, 2200, 2300, 1800, 2100, 2500
                ],
                borderColor: 'rgba(139, 92, 246, 0.8)',
                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                tension: 0.4,
                pointBorderColor: 'rgba(139, 92, 246, 1)',
                pointBackgroundColor: '#FFFFFF',
                pointHoverBackgroundColor: 'rgba(139, 92, 246, 0.8)',
                pointHoverBorderColor: 'rgba(115, 71, 217, 1)',
                pointRadius: 6,
                pointHoverRadius: 9,
            },
            {
                label: 'Profit 2022',
                data: [
                    500, 1400, 783, 700, 1700, 1200, 1400, 1600, 1500, 1700, 1800, 1900
                ],
                borderColor: 'rgba(255, 159, 64, 0.8)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                tension: 0.4,
                pointBorderColor: 'rgba(255, 159, 64, 1)',
                pointBackgroundColor: '#FFFFFF',
                pointHoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
                pointHoverBorderColor: 'rgba(255, 129, 0, 1)',
                pointRadius: 6,
                pointHoverRadius: 9,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                titleFont: { family: 'Arial, sans-serif', size: 14 },
                bodyFont: { family: 'Arial, sans-serif', size: 12 },
                borderColor: '#DAD5FA',
                borderWidth: 1,
                displayColors: false,
            },
            title: {
                display: true,
                text: 'Monthly Profit Comparison (2022 vs 2023)',
                font: { size: 16 },
                color: 'rgba(75, 49, 152, 0.8)', // Judul ungu
            },
            legend: {
                position: 'top' as const, // Explicitly cast as 'top' for type correctness
                labels: {
                    // Direct color usage instead of function
                    color: 'rgba(139, 92, 246, 0.8)', // Default legend label color
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    font: { size: 12 },
                    color: 'rgba(75, 49, 152, 0.8)', // Label ungu
                },
            },
            y: {
                grid: {
                    color: 'rgba(186, 164, 233, 0.5)',
                    borderDash: [4, 4],
                },
                ticks: {
                    font: { size: 12 },
                    color: 'rgba(75, 49, 152, 0.8)', // Label ungu
                    callback: function (value: number | string) {
                        return `$${value}`; // Format as currency
                    },
                },
            },
        },
    }

    return (
        <>
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl">
                <Line data={data} options={options} />
            </div>
            <div className='grid grid-cols-4 justify-between items-center mt-4 gap-6'>
                <div className='col-span-3 flex items-center space-x-4'>
                    {/* Item Sold */}
                    <ItemSold
                        value={2358}
                        percentage="+23%"
                        title="Item Sold"
                    />

                    {/* Profit */}
                    <Profit
                        value="$2358"
                        percentage="+15%"
                        title="Profit"
                    />

                </div>
                {/* Button Detail */}
                <div className='col-span-1 flex items-center justify-end space-x-4'>
                    <button className='px-6 py-3 bg-purple-500 rounded-md font-semibold hover:brightness-110 text-white'>
                        Cek Detail
                    </button>
                </div>
            </div>
        </>
    )
}
