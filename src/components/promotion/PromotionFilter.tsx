import React from 'react'
import SelectInput from '../form/SelectInput'

interface PromotionFilterProps {
    pagination: number
    setPagination: (value: number) => void
    searchTerm: string
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PromotionFilter = ({ pagination, setPagination, searchTerm, handleSearchChange }: PromotionFilterProps) => {
    return (
        <div className="card-head p-4 flex items-center justify-between">
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
                placeholder="Search Promotion..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
        </div>
    )
}

export default PromotionFilter
