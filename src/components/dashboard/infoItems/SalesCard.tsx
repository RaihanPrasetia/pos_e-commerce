import { ScaleIcon } from '@heroicons/react/20/solid'
import React from 'react'

export default function SalesCard() {
    return (
        <div className="bg-gradient-to-br from-lime-50 to-green-50 p-6 w-full flex flex-col items-start justify-between shadow-lg shadow-pink-200/50 rounded-2xl h-full transform transition duration-300 ">
            <div className="p-2 bg-lime-100 text-lime-500 border border-green-200 shadow-inner rounded-full">
                <ScaleIcon className="w-6 h-6" />
            </div>
            <div>
                <p className="flex items-center font-medium text-xl">
                    2358
                    <span className="px-2 py-0 bg-green-50 text-green-600 ml-2 rounded-lg text-[10px] font-bold shadow-sm">
                        +23%
                    </span>
                </p>
                <span className="text-slate-500 font-mono font-medium">Sales</span>
            </div>
        </div>
    )
}
