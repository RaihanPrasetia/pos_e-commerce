"use client"
import React, { useState } from "react";
import ProfitChart from "./chart/ProfitChart";
import ExpenseChart from "./chart/ExpenseChart";

const SalesProfit = () => {
    const [activeTab, setActiveTab] = useState("profit");

    return (
        <div className="w-full p-4 md:p-6 bg-white rounded-md shadow-mui-customShadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <h1 className="text-lg md:text-xl font-semibold font-mono text-slate-500 text-center md:text-left">
                    Sales Profit
                </h1>
                <div className="flex rounded-full sm:w-max items-center p-1 bg-slate-200 gap-2 mt-2 md:mt-0">
                    <button
                        className={`py-1 px-4 text-sm font-mono font-medium rounded-full ${activeTab === "profit" ? "bg-white shadow" : "bg-slate-200 text-slate-500"
                            }`}
                        onClick={() => setActiveTab("profit")}
                    >
                        Profit
                    </button>
                    <button
                        className={`py-1 px-4 text-sm font-mono font-medium rounded-full ${activeTab === "expense" ? "bg-white shadow" : "bg-slate-200 text-slate-500"
                            }`}
                        onClick={() => setActiveTab("expense")}
                    >
                        Expense
                    </button>
                </div>
            </div>
            <div>{activeTab === "profit" ? <ProfitChart /> : <ExpenseChart />}</div>
        </div>
    );
}

export default SalesProfit