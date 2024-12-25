import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import ItemSold from './profitInfo/ItemSold'
import Profit from './profitInfo/Profit'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ExpenseChart() {
    const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Expense',
                data: [200, 300, 400, 500, 250, 450, 300],
                backgroundColor: 'rgba(109, 103, 228, 0.6)', // Blue color for the bars
                borderColor: 'rgba(109, 103, 228, 0.3)', // Darker blue border
                borderWidth: 1,
                barThickness: 20, // Set a smaller bar thickness
                borderRadius: 10, // Rounded top corners
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Position the legend at the top
            },
            title: {
                display: true,
                text: 'Daily Expense Chart',
                font: {
                    size: 18,
                },
                color: '#6D67E4', // Title color (blue)
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis grid
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#3F51B5', // X-axis label color (blue)
                },
            },
            y: {
                grid: {
                    color: 'rgba(186, 164, 233, 0.5)', // Light grid color
                    borderDash: [4, 4], // Dashed line pattern
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#3F51B5', // Y-axis label color (blue)
                    callback: function (value: number | string) {
                        return `$${value}`; // Format values with '$'
                    },
                },
            },
        },
    }

    return (
        <>
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6  rounded-xl ">
                <Bar data={data} options={options} />
            </div>
            <div className='grid grid-cols-4 justify-between items-center mt-4 gap-6'>
                <div className='col-span-3 flex items-center space-x-4'>
                    {/* Item Sold */}
                    <ItemSold
                        value={200}
                        percentage="+20%"
                        title="Item Sold"
                    />

                    {/* Profit */}
                    <Profit
                        value="$400"
                        percentage="+5%"
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
