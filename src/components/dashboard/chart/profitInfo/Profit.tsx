import { CurrencyDollarIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface ProfitProps {
    value: number | string; // Value to display
    percentage: string; // Percentage value (e.g. +15%)
    title: string; // Title displayed below the value (e.g. Profit)
}

export default function Profit({ value, percentage, title }: ProfitProps) {
    return (
        <div className='text-slate-500 flex items-center space-x-4 bg-lime-50 py-2 px-5 rounded-tw'>
            <div className='p-2 rounded-full bg-lime-200'>
                <CurrencyDollarIcon className='w-6 h-6' />
            </div>
            <div className='space-y-2'>
                <p className="flex items-center font-medium text-2xl">
                    {value}
                    <span className="px-2 py-0 bg-lime-50 text-green-600 ml-2 rounded-lg text-[10px] font-bold shadow-sm">
                        {percentage}
                    </span>
                </p>
                <span className=' font-medium text-sm text-slate-500'>{title}</span>
            </div>
        </div>
    )
}
