"use client"

import SelectInput from '@/components/form/SelectInput'
import Pagination from '@/components/pagination/Pagination'
import { getOrderByCustomerId } from '@/libs/service/orderService'
import { OrderType } from '@/type/orderTypes'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const CustumerOrder = () => {
    const [orderByCustomer, setOrderByCustomer] = useState<OrderType[]>([])
    const [pagination, setPagination] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortedBy, setSortedBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const searchParams = useSearchParams();
    const id = searchParams.get("customerId");


    useEffect(() => {
        const fetchOrderByCustomer = async () => {
            try {
                const response = await getOrderByCustomerId(String(id))
                if (response) {
                    setOrderByCustomer(response)
                }
            } catch (error) {
                console.error("Error fetch order by customer :", error)
            }
        }
        fetchOrderByCustomer()
    }, [id])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedBy(column);
        setSortOrder(newSortOrder);
    };

    const sortedOrders = orderByCustomer
        .filter((order) =>
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.payment?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if ((a[sortedBy as keyof OrderType] as string) < (b[sortedBy as keyof OrderType] as string)) return sortOrder === 'asc' ? -1 : 1;
            if ((a[sortedBy as keyof OrderType] as string) > (b[sortedBy as keyof OrderType] as string)) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(sortedOrders.length / pagination);

    return (
        <Grid item xs={12} sm={12}>
            <Card>
                <CardContent className="flex flex-col flex-grow min-h-[450px]">
                    <Typography variant='h6' className='font-bold mb-4'>Orders Placed</Typography>
                    <div className="card-head mb-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500">Show</span>
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

                        <input
                            type="text"
                            placeholder="Search Orders..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                    </div>
                    <div className="flex-grow overflow-auto">

                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Order Number</span>
                                            <button
                                                onClick={() => handleSort('orderNumber')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'orderNumber' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Payment Method</span>
                                            <button
                                                onClick={() => handleSort('paymentMethod')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'paymentMethod' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Payment Status</span>
                                            <button
                                                onClick={() => handleSort('paymentStatus')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'paymentStatus' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Status</span>
                                            <button
                                                onClick={() => handleSort('isActive')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'isActive' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Order Date</span>
                                            <button
                                                onClick={() => handleSort('orderDate')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'orderDate' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Qty</span>
                                            <button
                                                onClick={() => handleSort('qty')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'qty' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Total</span>
                                            <button
                                                onClick={() => handleSort('total')}
                                                className="ml-2"
                                            >
                                                {sortedBy === 'total' && sortOrder === 'asc' ? (
                                                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                ) : (
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {orderByCustomer.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-4 text-center text-gray-500">No Orders added yet.</td>
                                    </tr>
                                ) : (
                                    <>
                                        {sortedOrders
                                            .slice((currentPage - 1) * pagination, currentPage * pagination)
                                            .map((order) => (
                                                <tr key={order.id} className="border-b">
                                                    <td className="py-2 w-52">
                                                        <div className="flex space-x-4 items-center">
                                                            <span className="text-sm font-semibold text-gray-500">{order.orderNumber}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <span className="text-sm text-gray-500">{order.payment?.name}</span>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <div className=' flex items-center text-sm space-x-2'>
                                                            <span
                                                                className={`status-badge ${order.paymentStatus === "Completed"
                                                                    ? 'status-active'
                                                                    : order.paymentStatus === "Refunded" ? "status-inactive" : 'status-default'
                                                                    }`}
                                                            >
                                                            </span>

                                                            <span className='text-slate-400'>{order.paymentStatus}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 text-sm text-center">
                                                        <div className=' flex items-center space-x-2'>
                                                            <span
                                                                className={`status-badge ${order.status
                                                                    ? 'status-active'
                                                                    : 'status-inactive'
                                                                    }`}
                                                            >
                                                            </span>

                                                            <span className='text-slate-400'>{order.status ? 'Paid' : 'Unpaid'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <span className="text-sm text-gray-500">
                                                            {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(order.orderDate))}
                                                        </span>
                                                    </td>

                                                    <td className="py-2 px-4">
                                                        <span className="text-sm text-gray-500">{order.qty}</span>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <span className="text-sm text-gray-500">${order.total}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className="card-footer px-4 flex justify-end items-center py-2 mt-auto space-x-2">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CustumerOrder
