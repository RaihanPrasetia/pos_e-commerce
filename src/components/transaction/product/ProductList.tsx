import { ProductType } from '@/type/productTypes';
import React from 'react';
import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { TransactionItem } from '@/type/transactionType';

interface ProductListProp {
    productData: ProductType[];
    setSelectProduct: (data: TransactionItem[]) => void;
    selectedProducts: TransactionItem[];
}

const ProductList: React.FC<ProductListProp> = ({ productData, setSelectProduct, selectedProducts }) => {
    const handleCreateItem = (item: ProductType) => {
        const existingProduct = selectedProducts.find((product) => product.productId === item.id);

        if (existingProduct) {
            // Jika produk sudah ada, update qty-nya
            const updatedProducts = selectedProducts.map((product) =>
                product.productId === item.id
                    ? { ...product, qty: product.qty + 1 }
                    : product
            );
            setSelectProduct(updatedProducts);
        } else {
            // Jika produk belum ada, tambahkan produk baru ke dalam array
            const newProduct: TransactionItem = {
                name: item.name,
                price: item.price,
                qty: 1,
                imageUrl: item.imageUrl,
                productId: item.id,
            };
            setSelectProduct([...selectedProducts, newProduct]);
        }
    };

    return (
        <Grid container spacing={2}>
            {productData.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={product.id}>
                    <Card className="h-full flex flex-col p-0" >
                        <CardActionArea onClick={() => handleCreateItem(product)} className='cursor-pointer'>
                            <div className="flex justify-center p-4">
                                <Image
                                    height={120}
                                    width={120}
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="rounded-lg"
                                />
                            </div>
                            <CardContent className="text-center flex h-max flex-col justify-center items-center">
                                <span className="font-semibold text-sm text-nowrap">
                                    {product.name}
                                </span>
                                <Typography variant="body2" color="textSecondary">
                                    {product.code}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
