"use client";


import dynamic from 'next/dynamic'

// Dynamically import components with server-side rendering disabled (only rendered on client-side)
const General = dynamic(() => import('@/components/product/edit/General'), { ssr: false })
const ProductImage = dynamic(() => import('@/components/product/edit/ProductImage'), { ssr: false })
const Varian = dynamic(() => import('@/components/product/edit/Varian'), { ssr: false })
const ProductThumbnail = dynamic(() => import('@/components/product/edit/ProductThumbnail'), { ssr: false })
const Organize = dynamic(() => import('@/components/product/edit/Organize'), { ssr: false })

export default function EditProduct() {
    return (
        <div className="flex items-start justify-between gap-8">
            <div className="w-3/5 space-y-8">
                <General />
                <ProductImage />
                <Varian />
            </div>
            <div className="w-2/5 space-y-8">
                <ProductThumbnail />
                <Organize />
            </div>
        </div>
    )
}
