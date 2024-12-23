"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon, PlusIcon, ListBulletIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'; // Import Hero Icons
import { useRouter } from 'next/navigation';
import Pagination from '@/components/card/CardFooter';
// Example product data
const products = [
    { id: 1, name: 'Product A', category: 'Category 1', price: '$20', code: 'P001', qty: 10, status: 'Available', imageUrl: 'https://picsum.photos/50' },
    { id: 2, name: 'Product B', category: 'Category 2', price: '$30', code: 'P002', qty: 5, status: 'Out of stock', imageUrl: 'https://picsum.photos/50' },
    { id: 3, name: 'Product C', category: 'Category 3', price: '$40', code: 'P003', qty: 8, status: 'Available', imageUrl: 'https://picsum.photos/50' },
    { id: 4, name: 'Product D', category: 'Category 4', price: '$50', code: 'P004', qty: 12, status: 'Available', imageUrl: 'https://picsum.photos/50' },
    { id: 5, name: 'Product E', category: 'Category 5', price: '$60', code: 'P005', qty: 3, status: 'Out of stock', imageUrl: 'https://picsum.photos/50' },
    { id: 6, name: 'Product F', category: 'Category 6', price: '$70', code: 'P006', qty: 15, status: 'Available', imageUrl: 'https://picsum.photos/50' },
];

export default function ListProduct() {
    const [pagination, setPagination] = useState(5); // Pagination options
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]); // Selected products state
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sort order state
    const [sortedBy, setSortedBy] = useState<string>('name'); // Sorted column state
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);


    const navigateToAddProduct = () => {
        router.push('/products/new-product');
    };
    const navigateToCategory = () => {
        router.push('/products/category');
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectProduct = (productId: number) => {
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
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort products based on the sortOrder and sortedBy
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a[sortedBy as keyof typeof a] > b[sortedBy as keyof typeof b] ? 1 : -1;
        } else {
            return a[sortedBy as keyof typeof a] < b[sortedBy as keyof typeof b] ? 1 : -1;
        }
    });

    const totalPages = Math.ceil(sortedProducts.length / pagination);



    return (
        <div className="card shadow-xl border-2-gray-500 rounded-xl overflow-hidden pb-6 bg-white">
            {/* Card Header */}
            <div className="card-head p-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-500">List Product</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={navigateToCategory}
                        className="flex items-center px-4 border shadow-lg py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-lg transition hover:brightness-110"
                    >
                        <ListBulletIcon className="h-5 w-5 mr-1" />
                        Category
                    </button>
                    <button
                        onClick={navigateToAddProduct}
                        className="flex items-center px-4 border shadow-lg py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-700 rounded-lg transition "
                    >
                        <PlusIcon className="h-5 w-5 mr-1" /> {/* Add Icon */}
                        Product
                    </button>
                </div>
            </div>

            {/* Card Sub-Header: Pagination and Search */}
            <div className="card-sub-head p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500">Show</span>
                    <select
                        value={pagination}
                        onChange={(e) => setPagination(Number(e.target.value))}
                        className="px-2 py-1 rounded-lg bg-gray-100 text-gray-500 focus:ring-1 focus:ring-gray-500"
                    >
                        <option value={5} className="text-gray-700">5</option>
                        <option value={10} className="text-gray-700">10</option>
                        <option value={20} className="text-gray-700">20</option>
                    </select>
                    <span className="text-gray-500">items per page</span>
                </div>

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-4 py-1 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
            </div>

            {/* Card Body */}
            <div className="card-body">
                <table className="min-w-full bg-gray-50">
                    <thead>
                        <tr>
                            {['name', 'category', 'price', 'code', 'qty', 'status'].map((column) => (
                                <th key={column} className="py-2 px-4 text-left text-sm font-semibold text-gray-400">
                                    <div className="flex justify-between items-center">
                                        <span>{column.charAt(0).toUpperCase() + column.slice(1)}</span>
                                        <button onClick={() => handleSort(column)} className="ml-2">
                                            {sortedBy === column && sortOrder === 'asc' ? (
                                                <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                </th>
                            ))}
                            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-400 w-px">Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {sortedProducts
                            .slice((currentPage - 1) * pagination, currentPage * pagination)
                            .map((product) => (
                                <tr key={product.id} className="border-t">
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-4 items-center">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => handleSelectProduct(product.id)}
                                            />
                                            <Image src={product.imageUrl} alt={product.name} width={10} height={10} className="w-10 h-10 rounded" />
                                            <span className="text-sm font-semibold text-gray-500">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 text-sm text-gray-500 w-px">{product.category}</td>
                                    <td className="py-2 px-4 text-sm text-gray-500 w-px">{product.price}</td>
                                    <td className="py-2 px-4 text-sm text-gray-500 w-px">{product.code}</td>
                                    <td className="py-2 px-4 text-sm text-gray-500 w-px">{product.qty}</td>
                                    <td className="py-2 px-4 text-sm w-52 text-center">
                                        <span
                                            className={`text-sm font-semibold text-gray-500 rounded-md px-3 py-1 ${product.status === 'Available'
                                                ? 'bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500 text-white'
                                                : 'bg-gradient-to-br from-orange-500  via-red-600 to-orange-700 text-white'
                                                }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>


                                    <td className="py-2 px-4 text-sm space-x-3 flex">
                                        <button
                                            className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-md transition hover:brightness-110"
                                            onClick={() => console.log('Edit clicked')}
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>

                                        {/* Tombol Delete */}
                                        <button
                                            className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md transition hover:brightness-110"
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
            <div className="card-footer px-4 flex justify-center items-center py-2 mt-4 space-x-2">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

        </div>
    );
}
