"use client";
import ButttonIcon from '@/components/Button/ButttonIcon';
import Content from '@/components/content/Content';
import ContentBody from '@/components/content/ContentBody';
import { ContentHead } from '@/components/content/ContentHead';
import CustomerFilter from '@/components/customer/CustomerFilter';
import CustomerTableList from '@/components/customer/CustomerTableList';
import Pagination from '@/components/pagination/Pagination';
import { initialCustomers } from '@/libs/fake-db/customerDb';
import { CustomerType } from '@/type/cutomersType';
import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CustomerLayout = () => {
    const router = useRouter();
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers);
    const [pagination, setPagination] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortedBy, setSortedBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleToAddCustomer = () => {
        router.push('/customers/add');
    };

    const handleToEditCustomer = (customer: CustomerType) => {
        router.push(`/customers/edit/${customer.id}`);
    };

    const handleDeleteCustomer = (id: string, name: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure you want to delete ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCategories = customers.filter((customer) => customer.id !== id);
                setCustomers(updatedCategories);
                Swal.fire({
                    title: 'Deleted!',
                    text: `${name} has been deleted.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    const handleDeleteSelectedCustomers = () => {
        if (selectedCustomers.length > 0) {
            const updatedCustomers = customers.filter(
                (customer) => !selectedCustomers.includes(customer.id)
            );
            setCustomers(updatedCustomers);
            setSelectedCustomers([]);
            alert('Selected customers have been deleted.');
        }
    };

    const handleSelectAllCustomers = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedCustomers(customers.map((customer) => customer.id));
        } else {
            setSelectedCustomers([]);
        }
    };

    const handleSelectCustomer = (id: string) => {
        setSelectedCustomers((prev) =>
            prev.includes(id)
                ? prev.filter((customerId) => customerId !== id)
                : [...prev, id]
        );
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedBy(column);
        setSortOrder(newSortOrder);
    };

    const sortedCustomers = customers
        .filter((customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if ((a[sortedBy as keyof CustomerType] as string) < (b[sortedBy as keyof CustomerType] as string)) return sortOrder === 'asc' ? -1 : 1;
            if ((a[sortedBy as keyof CustomerType] as string) > (b[sortedBy as keyof CustomerType] as string)) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });


    const totalPages = Math.ceil(sortedCustomers.length / pagination);

    return (
        <Content>
            <ContentHead title='Customer' subTitle='List of all customers'>
                <ButttonIcon
                    onClick={handleToAddCustomer}
                    icons={<PlusIcon className="h-4 w-4 mr-1" />}
                    title='Add Customer' />
            </ContentHead>
            <ContentBody className='min-h-[450px] flex flex-col justify-between'>
                {/* Table Filter */}
                <CustomerFilter pagination={pagination} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setPagination={setPagination} />

                {selectedCustomers.length > 0 && (
                    <div className="flex justify-between items-center mb-4 px-4">
                        <span className="text-sm font-semibold text-slate-500">
                            {`${selectedCustomers.length} item(s) selected`}
                        </span>
                        <button
                            onClick={handleDeleteSelectedCustomers}
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-sm rounded-md shadow-md hover:brightness-110"
                        >
                            <TrashIcon className="h-5 w-5 mr-2" />
                            Delete All
                        </button>
                    </div>
                )}

                {/* Table */}
                <CustomerTableList
                    customers={customers}
                    pagination={pagination}
                    currentPage={currentPage}
                    handleEditCustomer={handleToEditCustomer}
                    handleSelectAllCustomers={handleSelectAllCustomers}
                    handleSelectCustomers={handleSelectCustomer}
                    sortOrder={sortOrder}
                    handleSort={handleSort}
                    selectedCustomers={selectedCustomers}
                    sortedBy={sortedBy}
                    sortedCustomers={sortedCustomers}
                    handleDeleteCustomer={handleDeleteCustomer}
                />

                <div className="card-footer px-4 flex justify-end items-center py-2 mt-4 space-x-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </ContentBody>
        </Content>
    );
};

export default CustomerLayout;
