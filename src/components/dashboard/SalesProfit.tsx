"use client"
import React, { useState } from 'react'

import ProfitChart from './chart/ProfitChart'
import ExpenseChart from './chart/ExpenseChart'

export default function SalesProfit() {
    const [activeTab, setActiveTab] = useState('profit')

    // This hook makes sure that when you click, it won't scroll the page to the top
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        // Ensure no scrolling reset occurs after clicking a tab
        const container = document.getElementById("sales-profit-container");
        if (container) {
            container.scrollIntoView({ behavior: "smooth", block: "start" }); // keep the current scroll position
        }
    };

    return (
        <div id="sales-profit-container" className="col-span-8 p-6 bg-white h-max rounded-md shadow-mui-customShadow">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold font-mono text-slate-500">Sales Profit</h1>
                <div className="flex rounded-full items-center p-1 bg-slate-200 gap-2">
                    <button
                        className={`py-1 px-4 text-sm font-mono font-medium flex justify-center items-center rounded-full ${activeTab === 'profit' ? 'bg-white shadow' : 'bg-slate-200 text-slate-500'
                            }`}
                        onClick={() => handleTabClick('profit')}
                    >
                        Profit
                    </button>
                    <button
                        className={`py-1 px-4 flex justify-center text-sm font-mono font-medium items-center rounded-full ${activeTab === 'expense' ? 'bg-white shadow' : 'bg-slate-200 text-slate-500'
                            }`}
                        onClick={() => handleTabClick('expense')}
                    >
                        Expense
                    </button>
                </div>
            </div>
            <div>
                {activeTab === 'profit' ? <ProfitChart /> : <ExpenseChart />}
            </div>
        </div>
    )
}
