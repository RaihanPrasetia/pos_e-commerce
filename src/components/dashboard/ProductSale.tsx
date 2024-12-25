"use client"
import { Bars3CenterLeftIcon } from '@heroicons/react/20/solid'
import React, { useState } from 'react'
import PolarAreaChart from './chart/productSale/PolarAreaChart'
import PieChart from './chart/productSale/PieChart'

export default function ProductSale() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [chartType, setChartType] = useState<'polarArea' | 'pie'>('polarArea')

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const changeChartType = (type: 'polarArea' | 'pie') => {
        setChartType(type)
        setDropdownOpen(false) // Close the dropdown after selection
    }

    return (
        <div id="sales-profit-container" className="col-span-4 p-6 bg-white h-max rounded-md shadow-mui-customShadow">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold font-mono text-slate-500">Product Sale</h1>
                <div className="relative">
                    <button onClick={toggleDropdown} className="text-slate-500">
                        <Bars3CenterLeftIcon className="h-5 w-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md text-sm">
                            <ul className="py-2">
                                <li
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => changeChartType('polarArea')}
                                >
                                    Polar Area
                                </li>
                                <li
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => changeChartType('pie')}
                                >
                                    Pie
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Chart Component */}
            <div>
                {chartType === 'polarArea' ? (
                    <PolarAreaChart />
                ) : (
                    <PieChart />
                )}
            </div>
        </div>
    )
}
