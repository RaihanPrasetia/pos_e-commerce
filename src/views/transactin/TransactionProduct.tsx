import { getProduct } from '@/libs/service/productService'
import { ProductType } from '@/type/productTypes'
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import ProductHead from '@/components/transaction/product/ProductHead'
import ProductFilter from '@/components/transaction/product/ProductFilter'
import { Divider } from '@mui/material'
import ProductList from '@/components/transaction/product/ProductList'
import { TransactionItem } from '@/type/transactionType'
interface TransactionProductProp {
    setSelectedItem: (item: TransactionItem[]) => void
    selectedProducts: TransactionItem[]
}

const TransactionProduct = ({ setSelectedItem, selectedProducts }: TransactionProductProp) => {
    const [productData, setProductData] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProduct()
                setProductData(result.products)
            } catch (error) {
                console.error("Error fetch product data :", error)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [])

    const filteredProductData = productData.filter(product => {
        const matchesCategory = category ? product.categoryId === category : true
        const matchesSearchTerm = searchTerm ?
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.code.toLowerCase().includes(searchTerm.toLowerCase()) : true
        return matchesCategory && matchesSearchTerm
    })

    if (loading) {
        return (
            <div className='w-full h-[90vh] flex justify-center items-center'>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className='flex flex-col space-y-2 h-[85vh]'>
            {/* Product Head */}
            <ProductHead />

            <Divider className='bg-utama p-0.5' />

            {/* Product Filter */}
            <ProductFilter setCategory={setCategory} setSearchTerm={setSearchTerm} />

            <Divider className='bg-utama p-0.5' />

            {/* Render filtered product data here */}
            <div className='mt-2 h-full flex-grow overflow-hidden overflow-y-auto p-2'>
                <ProductList selectedProducts={selectedProducts} productData={filteredProductData} setSelectProduct={setSelectedItem} />
            </div>

            <Divider className='bg-utama p-0.5' />

        </div>
    )
}

export default TransactionProduct