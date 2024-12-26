"use client"
import React from 'react'
import PaymentChart from './marketingReportItem/PaymentChart'

const Payment: React.FC = () => {
    // Sample data to pass to the PaymentChart component
    const generateData = () => {
        // Create an array for 7 days starting from Sunday
        const data = [
            { day: "Sunday", cod: 10, transfer: 32 },
            { day: "Monday", cod: 50, transfer: 12 },
            { day: "Tuesday", cod: 32, transfer: 24 },
            { day: "Wednesday", cod: 12, transfer: 54 },
            { day: "Thursday", cod: 27, transfer: 33 },
            { day: "Friday", cod: 28, transfer: 27 },
            { day: "Saturday", cod: 17, transfer: 10 },
        ];

        return data.reverse(); // Reverse the order to ensure it starts with Sunday
    };

    const data = generateData();

    return (
        <div id="payment-container" className="col-span-3 p-6 bg-white h-max rounded-md shadow-mui-customShadow">
            <h1 className="text-xl font-semibold font-mono text-slate-500">Marketing Report</h1>
            <div>
                <PaymentChart data={data} />
            </div>
        </div>
    )
}

export default Payment;
