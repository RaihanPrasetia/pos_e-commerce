"use client"
import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

interface PieChartComponentProps {
    data: { name: string; value: number }[];
    height: number;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, height }) => {
    // Series data for the pie chart
    const seriesData = [
        {
            data: data.map((entry, index) => ({
                id: index,      // Ensure unique ID for each entry
                value: entry.value,
            })),
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 10,
            startAngle: -45,
            endAngle: 250,
            cx: height / 2,
            cy: height / 2, // Center Y coordinate
        },
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Pie Chart */}
            <PieChart
                className="flex w-full p-8 justify-center items-center"
                width={height}
                height={height}
                series={seriesData}
            />

            {/* Labels Below the Chart */}
            <div className="flex justify-center p-2 space-x-4">
                {data.map((entry, index) => (
                    <div key={index} className="flex flex-col text-center items-center">
                        <span className='text-[10px]'>{entry.name} </span>
                        <span className='text-[10px]'>{entry.value} </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChartComponent;
