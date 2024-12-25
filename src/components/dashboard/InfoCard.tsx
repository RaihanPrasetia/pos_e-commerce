import React from 'react'
import SalesCard from './infoItems/SalesCard'
import RefundsCard from './infoItems/RefundsCard'
import EarningsCard from './infoItems/EarningsCard'

export default function InfoCard() {
    return (
        <div className="grid grid-cols-3 justify-between items-center col-span-6 gap-6 max-h-[200px]">
            {/* Sales Card */}
            <SalesCard />

            {/* Refunds Card */}
            <RefundsCard />

            {/* Earnings Card */}
            <EarningsCard />
        </div>
    )
}
