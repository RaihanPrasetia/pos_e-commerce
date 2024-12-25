import InfoCard from '@/components/dashboard/InfoCard'
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
        </div>
    )
}
