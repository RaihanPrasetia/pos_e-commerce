import { CustomerType } from '@/type/cutomersType'
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid'
import React from 'react'

interface CustomerTableListProps {
    customers: CustomerType[]
    selectedCustomers: string[]
    handleSelectAllCustomers: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSelectCustomers: (id: string) => void
    handleSort: (key: string) => void
    sortedBy: string
    sortOrder: string
    sortedCustomers: CustomerType[]
    currentPage: number
    pagination: number
    handleEditCustomer: (customer: CustomerType) => void
    handleDeleteCustomer: (id: string, name: string) => void
}

function CustomerTableList({ customers, selectedCustomers, handleSelectAllCustomers, handleSelectCustomers, handleSort, sortedBy, sortOrder, sortedCustomers, currentPage, pagination, handleEditCustomer, handleDeleteCustomer }: CustomerTableListProps) {
    return (
        <div className="card-body px-4 flex-grow">
            {customers.length === 0 ? (
                <p className="text-gray-500">No customers added yet.</p>
            ) : (
                <table className="min-w-full bg-white rounded-md">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 w-10 text-left text-sm font-semibold text-gray-400">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    checked={selectedCustomers.length === customers.length && customers.length > 0}
                                    onChange={handleSelectAllCustomers}
                                />
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                <div className="flex justify-between items-center">
                                    <span>Customer Name</span>
                                    <button
                                        onClick={() => handleSort('name')}
                                        className="ml-2"
                                    >
                                        {sortedBy === 'name' && sortOrder === 'asc' ? (
                                            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                <div className="flex justify-between items-center">
                                    <span>Email</span>
                                    <button
                                        onClick={() => handleSort('email')}
                                        className="ml-2"
                                    >
                                        {sortedBy === 'email' && sortOrder === 'asc' ? (
                                            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                <div className="flex justify-between items-center">
                                    <span>Phone</span>
                                    <button
                                        onClick={() => handleSort('phone')}
                                        className="ml-2"
                                    >
                                        {sortedBy === 'phone' && sortOrder === 'asc' ? (
                                            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                <div className="flex justify-between items-center">
                                    <span>City</span>
                                    <button
                                        onClick={() => handleSort('city')}
                                        className="ml-2"
                                    >
                                        {sortedBy === 'city' && sortOrder === 'asc' ? (
                                            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400 w-px">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedCustomers
                            .slice((currentPage - 1) * pagination, currentPage * pagination)
                            .map((customer) => (
                                <tr key={customer.id} className="border-b">
                                    <td className="py-2 px-4 text-sm">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4"
                                            checked={selectedCustomers.includes(String(customer.id))}
                                            onChange={() => handleSelectCustomers(String(customer.id))}
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-4 items-center">
                                            <span className="text-sm font-semibold text-gray-500">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-sm text-gray-500">{customer.email}</span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-sm text-gray-500">{customer.phone}</span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-sm text-gray-500">{customer.city}</span>
                                    </td>
                                    <td className="py-2 px-4 text-sm space-x-3 flex">
                                        <button
                                            className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md transition hover:brightness-110"
                                            onClick={() => handleEditCustomer(customer)}
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md shadow-md transition hover:brightness-110"
                                            onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CustomerTableList
