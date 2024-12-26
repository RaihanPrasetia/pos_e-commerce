import DailyActivity from '@/components/dashboard/DailyActivity'
import InfoCard from '@/components/dashboard/InfoCard'
import MarketingReport from '@/components/dashboard/MarketingReport'
import Payment from '@/components/dashboard/Payment'
import ProductSale from '@/components/dashboard/ProductSale'
import SalesProfit from '@/components/dashboard/SalesProfit'
import WellcomeCard from '@/components/dashboard/WellcomeCard'
import React from 'react'

export default function page() {
    return (
        <div className='grid grid-cols-12 gap-30'>
            {/* Wellcome Card */}
            <WellcomeCard />

            {/* Info Card */}
            <InfoCard />

            {/* Sales Profit */}
            <SalesProfit />

            {/* Product Sale */}
            <ProductSale />

            {/* Marketing Report */}
            <MarketingReport />

            {/* Payment Report */}
            <Payment />

            {/* Daily Activity */}

            <DailyActivity />
        </div>
    )
}
