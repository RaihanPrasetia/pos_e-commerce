"use client"
import Pagination from '@/components/pagination/Pagination';
import EditCategoryModal from '@/components/category/EditCategoryModal';
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

// Defining the interface for Category type
interface Category {
    id: number;
    name: string;
    isChecked?: boolean; // Adding isChecked for the checkbox state
}

const initialCategories: Category[] = [
    { id: 1, name: 'Category A' },
    { id: 2, name: 'Category B' },
    { id: 3, name: 'Category C' },
    { id: 4, name: 'Category D' },
    { id: 5, name: 'Category E' },
    { id: 6, name: 'Category F' },
];

export default function ListCategory() {
    const [categoryName, setCategoryName] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [pagination, setPagination] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortedBy, setSortedBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

    const handleEditCategory = (category: Category) => {
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };

    const handleSaveCategory = (updatedName: string) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === currentCategory?.id ? { ...cat, name: updatedName } : cat
            )
        );
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (categoryName.trim() === '') {
            alert('Category name cannot be empty.');
            return;
        }

        const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1;

        setCategories([...categories, { id: newId, name: categoryName }]);
        alert(`Category "${categoryName}" has been added.`);
        setCategoryName('');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectCategory = (id: number) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((categoryId) => categoryId !== id)
                : [...prev, id]
        );
    };

    const handleDeleteSelectedCategories = () => {
        if (selectedCategories.length > 0) {
            // Filter out the selected categories
            const updatedCategories = categories.filter(
                (category) => !selectedCategories.includes(category.id)
            );
            setCategories(updatedCategories);
            setSelectedCategories([]); // Clear the selected categories
            alert('Selected categories have been deleted.');
        }
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedBy(column);
        setSortOrder(newSortOrder);
    };

    const sortedCategories = categories
        .filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if ((a[sortedBy as keyof Category] as string) < (b[sortedBy as keyof Category] as string)) return sortOrder === 'asc' ? -1 : 1;
            if ((a[sortedBy as keyof Category] as string) > (b[sortedBy as keyof Category] as string)) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(sortedCategories.length / pagination);

    return (
        <div className="flex gap-4">
            <div className="card min-h-[508px] shadow-mui-customShadow w-full h-full  border-2-gray-500 rounded-md overflow-hidden pb-6 bg-white flex flex-col">
                <div className="card-head p-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-500">List Categories</h2>

                    {/* Delete Selected Categories Button */}
                    <button
                        onClick={handleDeleteSelectedCategories}
                        disabled={selectedCategories.length === 0} // Disable the button if no categories are selected
                        className="flex space-x-3 items-center p-3 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md shadow-md transition hover:brightness-110 disabled:bg-gray-400"
                    >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete Selected
                    </button>
                </div>

                <div className="card-sub-head p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-500">Show</span>
                        <select
                            value={pagination}
                            onChange={(e) => setPagination(Number(e.target.value))}
                            className="px-2 py-1 rounded-md bg-gray-100 text-gray-500 focus:ring-1 focus:ring-gray-500"
                        >
                            <option value={5} className="text-gray-700">5</option>
                            <option value={10} className="text-gray-700">10</option>
                            <option value={20} className="text-gray-700">20</option>
                        </select>
                        <span className="text-gray-500">items per page</span>
                    </div>

                    <input
                        type="text"
                        placeholder="Search Categories..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
                    />
                </div>

                <div className="card-body px-4 flex-grow">
                    {categories.length === 0 ? (
                        <p className="text-gray-500">No categories added yet.</p>
                    ) : (
                        <table className="min-w-full bg-white rounded-md">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 px-4 w-10 text-left text-sm font-semibold text-gray-400">#</th>
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                        <div className="flex justify-between items-center">
                                            <span>Category Name</span>
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
                                    <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400 w-px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedCategories
                                    .slice((currentPage - 1) * pagination, currentPage * pagination)
                                    .map((category, index) => (
                                        <tr key={category.id} className="border-b">
                                            <td className="py-2 px-4 text-sm space-x-3">{index + 1}</td>
                                            <td className="py-2 px-4">
                                                <div className="flex space-x-4 items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4"
                                                        checked={selectedCategories.includes(category.id)}
                                                        onChange={() => handleSelectCategory(category.id)}
                                                    />
                                                    <span className="text-sm font-semibold text-gray-500">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 text-sm space-x-3 flex">
                                                <button
                                                    className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-md transition hover:brightness-110"
                                                    onClick={() => handleEditCategory(category)}
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                    <span>Edit</span>
                                                </button>

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
                    )}
                </div>

                <div className="card-footer px-4 flex justify-end items-center py-2 mt-4 space-x-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>


            <div className="card w-1/2 h-full shadow-mui-customShadow border-2-gray-500 rounded-md overflow-hidden pb-6 bg-white">
                <div className="card-head p-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-500">Add Category</h2>
                </div>

                <div className="card-body px-4">
                    <form onSubmit={handleSubmit} className="space-y-4 ">
                        <div className="w-full">
                            <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-400">
                                Category Name
                            </label>
                            <input
                                type="text"
                                id="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Enter category name"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-semibold rounded-md shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Add Category
                        </button>
                    </form>
                </div>
            </div>

            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                categoryName={currentCategory?.name || ''}
                onSave={handleSaveCategory}
            />

        </div>
    );
}
