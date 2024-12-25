import { ReceiptRefundIcon } from '@heroicons/react/20/solid'
import React from 'react'

export default function RefundsCard() {
    return (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 w-full flex flex-col items-start justify-between shadow-mui-customShadow shadow-orange-200/20 rounded-2xl h-full transform transition duration-300 ">
            <div className="p-2 bg-orange-100 text-orange-600 border border-orange-200 shadow-inner rounded-full">
                <ReceiptRefundIcon className="w-6 h-6" />
            </div>
            <div>
                <p className="flex items-center font-medium text-xl">
                    123
                    <span className="px-2 py-0 bg-red-50 text-red-600 ml-2 rounded-lg text-[10px] font-bold shadow-sm">
                        -5%
                    </span>
                </p>
                <span className="text-slate-500 font-mono font-medium">Refunds</span>
            </div>
        </div>
    )
}
