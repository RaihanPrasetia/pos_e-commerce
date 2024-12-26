"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { CreditCardIcon } from '@heroicons/react/20/solid';
import { BiTransferAlt } from 'react-icons/bi';

// Register necessary components for chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface PaymentProps {
    data: {
        day: string;
        cod: number;
        transfer: number;
    }[];
}

const PaymentChart: React.FC<PaymentProps> = ({ data = [] }) => {
    if (data.length === 0) {
        return (
            <div id="payment-container" className="col-span-3 p-6 bg-white h-max rounded-md shadow-mui-customShadow">
                <h1 className="text-xl font-semibold font-mono text-slate-500">Payment Method</h1>
                <div>No data available</div>
            </div>
        );
    }

    // Calculate the total COD and Transfer for all days combined
    const totalCod = data.reduce((acc, entry) => acc + entry.cod, 0);
    const totalTransfer = data.reduce((acc, entry) => acc + entry.transfer, 0);
    const totalAmount = totalCod + totalTransfer;

    // Calculate percentage based on the total COD/Transfer
    const codPercentage = ((totalCod / totalAmount) * 100).toFixed(1);
    const transferPercentage = ((totalTransfer / totalAmount) * 100).toFixed(1);

    // Chart data with stack-based bars, showing individual values for each day
    const chartData = {
        labels: data.map((entry) => entry.day), // X-axis labels for days
        datasets: [
            {
                label: 'COD',
                data: data.map((entry) => entry.cod), // Show COD for each day
                backgroundColor: '#7F56D9', // Soft Purple color
                stack: 'Stack 0', // Stack grouping for COD
                barThickness: 15, // Make the bars smaller
                borderRadius: 10, // Make the bars fully rounded
                datalabels: {
                    display: true,
                    align: 'top',
                    anchor: 'end',
                },
            },
            {
                label: 'Transfer',
                data: data.map((entry) => entry.transfer), // Show Transfer for each day
                backgroundColor: '#4C6FF3', // Soft Indigo color
                stack: 'Stack 0', // Stack grouping for Transfer
                barThickness: 15, // Make the bars smaller
                borderRadius: 10, // Make the bars fully rounded
                datalabels: {
                    display: true,
                    align: 'top',
                    anchor: 'end',
                },
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Corrected position value type
            },
            tooltip: {
                mode: 'index' as const, // Use one of the valid options (e.g., "index")
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    display: false, // Hides the x-axis labels (Sunday, Monday, etc.)
                },
            },
            y: {
                stacked: true,
                ticks: {
                    display: false, // Hides the y-axis labels
                },
            },
        },
    };

    return (
        <div className="flex flex-col w-full items-center justify-center space-y-4">
            <Bar data={chartData} options={chartOptions} height={300} />
            {/* Custom Labels for Total Percentage */}
            <div className="w-full mt-4">
                <div className="text-center w-full">
                    <span className="text-lg text-slate-600">Total Payment Method</span>
                    <div className="mt-4 flex flex-col items-center justify-between">
                        <div className="flex items-center justify-center space-x-2 ">
                            <CreditCardIcon className="h-4 w-4 text-purple-600" />
                            <span className="text-sm font-medium text-slate-500 font-mono">COD:</span>
                            <div className="text-[10px] text-purple-600 font-semibold">{`${codPercentage}%`}</div>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            <BiTransferAlt className="h-4 w-4 text-indigo-600" />
                            <span className="text-sm font-medium text-slate-500 font-mono">Transfer:</span>
                            <div className="text-[10px] text-indigo-600 font-semibold">{`${transferPercentage}%`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentChart;
