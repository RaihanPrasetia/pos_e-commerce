import General from '@/components/product/edit/General'
import Organize from '@/components/product/edit/Organize'
import ProductImage from '@/components/product/edit/ProductImage'
import ProductThumbnail from '@/components/product/edit/ProductThumbnail'
import Varian from '@/components/product/edit/Varian'
import React from 'react'

export default function EditProduct() {
    return (
        <div className='flex items-start justify-between gap-8 '>
            <div className='w-3/5 space-y-8'>
                <General />
                <ProductImage />
                <Varian />
            </div>
            <div className='w-2/5 space-y-8'>
                <ProductThumbnail />
                <Organize />
            </div>
        </div>
    )
}
