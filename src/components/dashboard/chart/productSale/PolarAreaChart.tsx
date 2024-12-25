"use client"
import React from 'react'
import { PolarArea } from 'react-chartjs-2'
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

export default function PolarAreaChart() {
    const data = {
        datasets: [
            {
                data: [300, 200, 100, 400, 350],
                backgroundColor: ['#FF5733', '#3498DB', '#F1C40F', '#2ECC71', '#8E44AD'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                font: {
                    size: 16,
                },
            },
            legend: {
                position: 'bottom' as const, // Moves the legend to the bottom
                align: 'center' as const, // Center-align the legend
                labels: {
                    boxWidth: 10, // Adjust the box width if needed
                    padding: 23, // Adjust padding to separate the legend from the chart
                },
            },
        },
    }

    return (
        <>
            <div className="flex flex-col items-center -mt-8">
                <PolarArea options={options} data={data} />
                <span className="mt-4 text-sm font-medium text-slate-500">
                    Product Sale Distribution by Category
                </span> {/* Label below chart */}
            </div>

            {/* Category Grid Section */}
            <div className="mt-4 text-center">
                <div className="grid grid-cols-2 gap-4">
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
