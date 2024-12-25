import { CurrencyDollarIcon } from '@heroicons/react/20/solid'
import React from 'react'

export default function EarningsCard() {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 w-full flex flex-col items-start justify-between shadow-mui-customShadow shadow-blue-200/20 rounded-2xl h-full transform transition duration-300 ">
            <div className="p-2 bg-blue-100 text-blue-600 border border-blue-200 shadow-inner rounded-full">
                <CurrencyDollarIcon className="w-6 h-6" />
            </div>
            <div>
                <p className="flex items-center font-medium text-xl">
                    $12,340
                    <span className="px-2 py-0 bg-green-50 text-green-600 ml-2 rounded-lg text-[10px] font-bold shadow-sm">
                        +15%
                    </span>
                </p>
                <span className="text-slate-500 font-mono font-medium">Earnings</span>
            </div>
        </div>
    )
}
