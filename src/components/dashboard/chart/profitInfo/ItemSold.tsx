import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface ItemSoldProps {
    value: number | string; // Value that can be a number or string
    percentage: string; // Percentage value
    title: string; // Title that will be shown in the span
}

export default function ItemSold({ value, percentage, title }: ItemSoldProps) {
    return (
        <div className='text-slate-500 flex items-center space-x-4 bg-slate-100 py-2 px-5 rounded-tw'>
            <div className='p-2 rounded-full bg-gray-200'>
                <ShoppingCartIcon className='w-6 h-6' />
            </div>
            <div className='space-y-2'>
                <p className="flex items-center font-medium text-2xl">
                    {value}
                    <span className="px-2 py-0 bg-gray-50 text-gray-600 ml-2 rounded-lg text-[10px] font-bold shadow-sm">
                        {percentage}
                    </span>
                </p>
                <span className=' font-medium text-sm text-slate-500'>{title}</span>
            </div>
        </div>
    )
}
