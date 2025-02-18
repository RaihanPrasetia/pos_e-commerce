import { TaxType } from '@/type/taxTypes'
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid'
import { Avatar, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

interface TaxTableListProps {
    taxs: TaxType[]
    selectedTaxs: string[]
    handleSelectAllTaxs: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSelectTaxs: (id: string) => void
    handleSort: (key: string) => void
    sortedBy: string
    sortOrder: string
    sortedTaxs: TaxType[]
    currentPage: number
    pagination: number
    handleEditTax: (tax: TaxType) => void
    handleDeleteTax: (id: string, name: string) => void
}

function TaxTableList({ taxs, selectedTaxs, handleSelectAllTaxs, handleSelectTaxs, handleSort, sortedBy, sortOrder, sortedTaxs, currentPage, pagination, handleEditTax, handleDeleteTax }: TaxTableListProps) {
    const router = useRouter();

    const handleNavigateToTax = (id: string) => {
        router.push(`/taxs/detail?taxId=${id}`);
    };

    return (
        <div className="card-body px-4 flex-grow">
            {taxs.length === 0 ? (
                <p className="text-gray-500">No taxs added yet.</p>
            ) : (
                <table className="min-w-full bg-white rounded-md">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 w-10 text-left text-sm font-semibold text-gray-400">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4"
                                    checked={selectedTaxs.length === taxs.length && taxs.length > 0}
                                    onChange={handleSelectAllTaxs}
                                />
                            </th>
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                <div className="flex justify-between items-center">
                                    <span>Tax Name</span>
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
                                    <span>Value</span>
                                    <button
                                        onClick={() => handleSort('value')}
                                        className="ml-2"
                                    >
                                        {sortedBy === 'value' && sortOrder === 'asc' ? (
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
                            <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400 w-px">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedTaxs
                            .slice((currentPage - 1) * pagination, currentPage * pagination)
                            .map((tax) => (
                                <tr key={tax.id} className="border-b">
                                    <td className="py-2 px-4 text-sm">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4"
                                            checked={selectedTaxs.includes(String(tax.id))}
                                            onChange={() => handleSelectTaxs(String(tax.id))}
                                        />
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-4 items-center">
                                            <Typography
                                                variant='body2'
                                                className="text-sm font-semibold text-gray-500 cursor-pointer text-utama-hover"
                                                onClick={() => handleNavigateToTax(tax.id)}
                                            >
                                                {tax.name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4">
                                        <span className="text-sm text-gray-500">{tax.value}</span>
                                    </td>
                                    <td className="py-2 px-4 text-sm w-52 text-center">
                                        <div className=' flex items-center space-x-2'>
                                            <span
                                                className={`status-badge ${tax.isActive
                                                    ? 'status-active'
                                                    : 'status-inactive'
                                                    }`}
                                            >
                                            </span>

                                            <span className='text-slate-400 font-medium'>{tax.isActive ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 text-sm space-x-3 flex">
                                        <button
                                            className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md transition hover:brightness-110"
                                            onClick={() => handleEditTax(tax)}
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md shadow-md transition hover:brightness-110"
                                            onClick={() => handleDeleteTax(tax.id, tax.name)}
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

export default TaxTableList
