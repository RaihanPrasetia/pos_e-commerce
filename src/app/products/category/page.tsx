"use client";
import Pagination from '@/components/pagination/Pagination';
import EditCategoryModal from '@/components/category/EditCategoryModal';
import AddCategoryForm from '@/components/category/AddCategoryForm';
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import SelectInput from '@/components/form/SelectInput';
import { CategoryType } from '@type/categoryTypes';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { initialCategories } from '@/libs/fake-db/categoryDb';

export default function ListCategory() {
    const [categories, setCategories] = useState<CategoryType[]>(initialCategories);
    const [pagination, setPagination] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortedBy, setSortedBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditCategory = (category: CategoryType) => {
        setCurrentCategory(category);
        setIsEditModalOpen(true);
    };

    const handleSaveCategory = (formData: {
        updatedName: string;
        description: string;
        isActive: boolean;
        parentId: string;
    }) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === currentCategory?.id
                    ? { ...cat, name: formData.updatedName, description: formData.description, isActive: formData.isActive, parentId: formData.parentId }
                    : cat
            )
        );
        setIsEditModalOpen(false);
    };

    const handleAddCategory = (formData: { categoryName: string; description: string; isActive: boolean; parentId: string }) => {
        const newId = uuidv4();
        setCategories([
            ...categories,
            {
                id: newId,
                name: formData.categoryName,
                description: formData.description,
                isActive: formData.isActive,
                parentId: formData.parentId
            }
        ]);
        Swal.fire({
            title: 'Success!',
            text: `Category "${formData.categoryName}" has been added.`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
        setIsModalOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectAllCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedCategories(categories.map((category) => category.id));
        } else {
            setSelectedCategories([]);
        }
    };

    const handleSelectCategory = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((categoryId) => categoryId !== id)
                : [...prev, id]
        );
    };

    const handleDeleteSelectedCategories = () => {
        if (selectedCategories.length > 0) {
            const updatedCategories = categories.filter(
                (category) => !selectedCategories.includes(String(category.id))
            );
            setCategories(updatedCategories);
            setSelectedCategories([]);
            Swal.fire({
                title: 'Deleted!',
                text: 'Selected categories have been deleted.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedBy(column);
        setSortOrder(newSortOrder);
    };

    const handleDeleteCategory = (id: string, name: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure you want to delete ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCategories = categories.filter((category) => category.id !== id);
                setCategories(updatedCategories);
                Swal.fire({
                    title: 'Deleted!',
                    text: `${name} has been deleted.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    const sortedCategories = categories
        .filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if ((a[sortedBy as keyof CategoryType] as string) < (b[sortedBy as keyof CategoryType] as string)) return sortOrder === 'asc' ? -1 : 1;
            if ((a[sortedBy as keyof CategoryType] as string) > (b[sortedBy as keyof CategoryType] as string)) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(sortedCategories.length / pagination);

    return (
        <>
            <div className='flex items-end justify-between mb-6'>
                <div>
                    <h1 className='text-2xl text-slate-600 font-medium mb-2'>List Category</h1>
                    <span className='text-lg text-slate-500'>Orders placed across your store</span>
                </div>
                <div className='flex space-x-4'>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center p-3 text-xs font-semibold text-white bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md transition hover:brightness-110"
                    >
                        <PlusIcon className="h-4 w-4 mr-1" />
                        Add Category
                    </button>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="card min-h-[450px] shadow-mui-customShadow w-full h-full border-2-gray-500 rounded-md overflow-hidden pb-6 bg-white flex flex-col">

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
                            placeholder="Search Categories..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                    </div>

                    {selectedCategories.length > 0 && (
                        <div className="flex justify-between items-center mb-4 px-4">
                            <span className="text-sm font-semibold text-slate-500">
                                {`${selectedCategories.length} item(s) selected`}
                            </span>
                            <button
                                onClick={handleDeleteSelectedCategories}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-sm rounded-md shadow-md hover:brightness-110"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete All
                            </button>
                        </div>
                    )}

                    <div className="card-body px-4 flex-grow">
                        {categories.length === 0 ? (
                            <p className="text-gray-500">No categories added yet.</p>
                        ) : (
                            <table className="min-w-full bg-white rounded-md">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2 px-4 w-10 text-left text-sm font-semibold text-gray-400">
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4"
                                                checked={selectedCategories.length === categories.length && categories.length > 0}
                                                onChange={handleSelectAllCategories}
                                            />
                                        </th>
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
                                        <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                            <div className="flex justify-between items-center">
                                                <span>Description</span>
                                                <button
                                                    onClick={() => handleSort('description')}
                                                    className="ml-2"
                                                >
                                                    {sortedBy === 'description' && sortOrder === 'asc' ? (
                                                        <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                                                    ) : (
                                                        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                                    )}
                                                </button>
                                            </div>
                                        </th>
                                        <th className="py-2 px-4 text-left font-semibold text-sm text-gray-400">
                                            <div className="flex justify-between items-center">
                                                <span>Parent Category</span>
                                                <button
                                                    onClick={() => handleSort('parentId')}
                                                    className="ml-2"
                                                >
                                                    {sortedBy === 'parentId' && sortOrder === 'asc' ? (
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
                                    {sortedCategories
                                        .slice((currentPage - 1) * pagination, currentPage * pagination)
                                        .map((category) => (
                                            <tr key={category.id} className="border-b">
                                                <td className="py-2 px-4 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4"
                                                        checked={selectedCategories.includes(category.id)}
                                                        onChange={() => handleSelectCategory(category.id)}
                                                    />
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="flex space-x-4 items-center">
                                                        <span className="text-sm font-semibold text-gray-500">{category.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <span className="text-sm text-gray-500">{category.description}</span>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <span className="text-sm text-gray-500">
                                                        {categories.find((cat) => cat.id === category.parentId)?.name || "None"}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 text-sm w-52 text-center">
                                                    <div className=' flex items-center space-x-2'>
                                                        <span
                                                            className={`status-badge ${category.isActive
                                                                ? 'status-active'
                                                                : 'status-inactive'
                                                                }`}
                                                        >
                                                        </span>

                                                        <span className='text-slate-400 font-medium'>{category.isActive ? 'Active' : 'Inactive'}</span>
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4 text-sm space-x-3 flex">
                                                    <button
                                                        className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md transition hover:brightness-110"
                                                        onClick={() => handleEditCategory(category)}
                                                    >
                                                        <PencilSquareIcon className="h-4 w-4" />
                                                        <span>Edit</span>
                                                    </button>

                                                    <button
                                                        className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md shadow-md transition hover:brightness-110"
                                                        onClick={() => handleDeleteCategory(category.id, category.name)}
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

                <AddCategoryForm
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={({ categoryName, description, isActive, parentId }) => handleAddCategory({ categoryName, description, isActive, parentId })}
                    parentOptions={categories} // List Parent Categories
                />

                <EditCategoryModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    category={currentCategory ? currentCategory : undefined}
                    onSave={handleSaveCategory}
                    parentOptions={categories} // List Parent Categories
                />
            </div>
        </>
    );
}