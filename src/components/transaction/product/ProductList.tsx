import { ProductType } from '@/type/productTypes'
import React from 'react'
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material'
import Image from 'next/image'

interface ProductListProp {
    productData: ProductType[]
}

const ProductList: React.FC<ProductListProp> = ({ productData }) => {
    return (
        <Grid container spacing={2}>
            {productData.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                    <Card className='h-full flex flex-col items-center justify-between'>
                        <Image
                            height={120}
                            src={product.imageUrl} // Assuming product has an imageUrl property
                            alt={product.name}
                            width={120}
                        />
                        <CardContent className='flex-grow flex items-center flex-col justify-end'>
                            <span className='text-md font-semibold text-nowrap'>
                                {product.name}
                            </span>
                            <Typography variant="body2" color="textSecondary">
                                {product.code}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductList