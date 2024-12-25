"use client"
import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
} from 'chart.js'
import CategoryCard from './CategoryCard'

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale)

const PieChart = () => {
    const data = {
        datasets: [
            {
                data: [350, 450, 300, 500],
                backgroundColor: ['#FF5733', '#3498DB', '#F1C40F', '#2ECC71'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const, // Position the legend at the bottom
                align: 'center' as const,    // Center-align the legend
                labels: {
                    boxWidth: 10,           // Adjust box width for the legend items
                    padding: 23,            // Add space between the chart and the legend
                },
            },
        },
    }

    return (
        <>
            <div className="flex flex-col items-center ">
                {/* Pie Chart - Responsive Chart Container */}
                <div className="mt-2 flex justify-center w-full max-w-[260px] px-1 md:max-w-[200px] lg:max-w-[300px]">
                    <Pie data={data} options={options} />
                </div>

                {/* Title Below Chart */}
                <span className="mt-4 text-sm font-medium text-slate-500">
                    Product Sale Distribution by Category
                </span>
            </div>

            {/* Category Grid Section */}
            <div className="mt-6 text-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <CategoryCard color="lime" title="Red" salesIncrease={23} />
                    <CategoryCard color="blue" title="Blue" salesIncrease={15} />
                    <CategoryCard color="yellow" title="Yellow" salesIncrease={10} />
                    <CategoryCard color="green" title="Green" salesIncrease={30} />
                </div>
            </div>

            {/* Button Section */}
            <div className="flex items-center justify-end mt-6">
                <button className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md shadow-md hover:bg-purple-600 transition">
                    Cek Detail
                </button>
            </div>
        </>
    )
}

export default PieChart
