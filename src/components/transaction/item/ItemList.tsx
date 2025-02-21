import { TransactionItem } from '@/type/transactionType';
import { IconButton } from '@mui/material';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import React from 'react';

interface ItemListProp {
    itemData: TransactionItem[];
    setSelectProduct: (data: TransactionItem[]) => void;
}

const ItemList = ({ itemData, setSelectProduct }: ItemListProp) => {
    const handleUpdateQuantity = (productId: string, type: 'increase' | 'decrease') => {
        const updatedItems = itemData.map((product) =>
            product.productId === productId
                ? { ...product, qty: type === 'increase' ? product.qty + 1 : Math.max(product.qty - 1, 1) }
                : product
        );
        setSelectProduct(updatedItems);
    };

    const handleRemoveItem = (productId: string) => {
        const filteredItems = itemData.filter((product) => product.productId !== productId);
        setSelectProduct(filteredItems);
    };

    return (
        <div className="w-full flex flex-col space-y-4 ">
            {itemData.map((product) => (
                <div className="w-full flex justify-between items-center bg-white border p-4 rounded-md shadow-md" key={product.productId}>
                    <div className="flex items-center space-x-4">
                        <Image
                            height={64}
                            width={64}
                            src={product.imageUrl}
                            alt={product.name}
                            className="rounded-full bg-utama p-2"
                        />
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">{product.name}</span>
                            <span className="font-medium text-md">$ {product.price}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <IconButton size="small" onClick={() => handleUpdateQuantity(product.productId, 'decrease')}>
                            <FaMinus className='text-white bg-utama p-1 rounded-full' />
                        </IconButton>
                        <span className="font-semibold text-lg">{product.qty}</span>
                        <IconButton size="small" onClick={() => handleUpdateQuantity(product.productId, 'increase')}>
                            <FaPlus className='text-white bg-utama p-1 rounded-full' />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleRemoveItem(product.productId)}>
                            <FaTrash />
                        </IconButton>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
