"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'; // Import Hero Icons
import { useRouter } from 'next/navigation';
import Pagination from '@/components/pagination/Pagination';
import SelectInput from '@/components/form/SelectInput';
import { ProductType } from '@type/productTypes';
import { getProduct } from '@service/productService';

export default function ListProduct() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [pagination, setPagination] = useState(5); // Pagination options
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]); // Selected products state
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sort order state
    const [sortedBy, setSortedBy] = useState<string>('name'); // Sorted column state
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = getProduct();
                if (response) (
                    setProducts(response)
                )
                else (
                    setProducts([])
                )
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProduct();
    }, []);

    const handleToEdit = (productId: string) => {
        // Navigate to the edit product page with the product ID
        router.push(`/products/edit-product?id=${productId}`);
    };

    const navigateToAddProduct = () => {
        router.push('/products/new-product');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectProduct = (productId: string) => {
        setSelectedProducts((prevSelectedProducts) =>
            prevSelectedProducts.includes(productId)
                ? prevSelectedProducts.filter((id) => id !== productId) // Unselect product
                : [...prevSelectedProducts, productId] // Select product
        );
    };

    // Sort products by column
    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortedBy(column);
    };

    // Filter products based on search term
    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products based on the sortOrder and sortedBy
    const sortedProducts = filteredProducts?.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortedBy as keyof typeof a] > b[sortedBy as keyof typeof b] ? 1 : -1;
        } else {
            return a[sortedBy as keyof typeof a] < b[sortedBy as keyof typeof b] ? 1 : -1;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / pagination);

    return (
        <>
            <div className='flex items-end justify-between mb-6'>
                <div>
                    <h1 className='text-2xl text-slate-600 font-medium mb-2'>List Product</h1>
                    <span className='text-lg text-slate-500'>Orders placed across your store</span>
                </div>
                <div className='flex space-x-4'>
                    <button
                        onClick={navigateToAddProduct}
                        className="flex items-center px-4 border shadow-lg py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-700 rounded-md transition "
                    >
                        <PlusIcon className="h-5 w-5 mr-1" /> {/* Add Icon */}
                        Product
                    </button>
                </div>
            </div>
            <div className="card shadow-mui-customShadow min-h-[560.8px] border-2-slate-500 rounded-md overflow-hidden px-4 pb-6 bg-white flex flex-col">

                {/* Card Sub-Header: Pagination and Search */}
                <div className="card-head p-4 flex items-center justify-between">
                    {/* Select for Pagination */}
                    <div className="flex items-center space-x-2">
                        <span className="text-slate-500">Show</span>
                        <SelectInput
                            label=""
                            name="pagination"
                            value={String(pagination)}
                            onChange={(e) => setPagination(Number(e.target.value))}
                            options={['5', '10', '20']}
                            px={2}
                            py={1}
                        />
                        <span className="text-gray-500 text-nowrap">items per page</span>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-4 py-1 rounded-md border border-slate-300 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-500"
                    />
                </div>

                {/* Card Body with flex-grow */}
                <div className="card-body flex-grow">
                    <div className="flex justify-between items-center mb-4 px-4">
                        {/* Jumlah item terpilih */}
                        <div>
                            <span className="text-sm font-semibold text-slate-500">
                                {selectedProducts.length > 0
                                    ? `${selectedProducts.length} item(s) selected`
                                    : ''}
                            </span>
                        </div>

                        {/* Tombol delete semua */}
                        {selectedProducts.length > 0 && (
                            <button
                                onClick={() => {
                                    // Aksi untuk menghapus item yang dipilih
                                    setSelectedProducts([]);
                                    console.log('Delete all selected items');
                                }}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-sm rounded-md shadow-md hover:brightness-110"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete All
                            </button>
                        )}
                    </div>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-left text-sm font-semibold text-slate-400 w-px">
                                    {/* Checkbox Select All */}
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4"
                                        checked={selectedProducts.length === products.length && products.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedProducts(products.map((product) => product.id));
                                            } else {
                                                setSelectedProducts([]);
                                            }
                                        }}
                                    />
                                </th>
                                {['name', 'category', 'price', 'code', 'isActive'].map((column) => (
                                    <th key={column} className="py-2 px-4 text-left text-sm font-semibold text-slate-400">
                                        <div className="flex justify-between items-center">
                                            <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                                            <button onClick={() => handleSort(column)} className="ml-2">
                                                {sortedBy === column && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-slate-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-slate-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                ))}
                                <th className="py-2 px-4 text-left text-sm font-semibold text-slate-400 w-px">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts
                                .slice((currentPage - 1) * pagination, currentPage * pagination)
                                .map((product) => (
                                    <tr key={product.id} className="border-t">
                                        <td className="py-2 px-4 text-sm text-slate-500 w-px">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => handleSelectProduct(product.id)}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <div className="flex space-x-4 items-center">
                                                <Image src={product.imageUrl} alt={product.name} width={52} height={52} className="w-10 h-10 rounded-full" />
                                                <span className="text-sm font-semibold text-slate-500">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-2 px-4 text-sm text-slate-500">{product.category.name}</td>
                                        <td className="py-2 px-4 text-sm text-slate-500">{product.price}</td>
                                        <td className="py-2 px-4 text-sm text-slate-500">{product.code}</td>
                                        <td className="py-2 px-4 text-sm w-52 text-center">
                                            <div className='flex space-x-2 items-center'>
                                                <span
                                                    className={`status-badge ${product.isActive
                                                        ? 'status-active'
                                                        : 'status-inactive'
                                                        }`}
                                                >
                                                </span>

                                                <span className='text-slate-400 font-medium'>
                                                    {product.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="py-2 px-4 text-sm space-x-3 flex">
                                            <button
                                                className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-md transition hover:brightness-110"
                                                onClick={() => handleToEdit(product.id)}
                                            >
                                                <PencilSquareIcon className="h-4 w-4" />
                                                <span>Edit</span>
                                            </button>

                                            {/* Tombol Delete */}
                                            <button
                                                className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md shadow-md transition hover:brightness-110"
                                                onClick={() => console.log('Delete clicked')}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                <span>Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {/* Card Footer */}
                <div className="card-footer px-4 flex justify-end items-center py-2 mt-4 space-x-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </>
    );
}