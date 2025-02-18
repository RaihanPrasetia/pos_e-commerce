import { TaxType } from '@/type/taxTypes'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TaxFilter from '../tax/TaxFilter';
import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import TaxTableList from '../tax/TaxTableList';
import Pagination from '../pagination/Pagination';
import Swal from 'sweetalert2';
import ButttonIcon from '../Button/ButttonIcon';
import { getTaxs } from '@/libs/service/taxService';
import AddTaxDrawer from '../tax/AddTaxDrawer';
import EditTaxDrawer from '../tax/EditTaxDrawer';
import TaxInfo from '../tax/TaxInfo';

function StoreTax() {
    const [taxs, setTaxs] = useState<TaxType[]>([]);
    const [pagination, setPagination] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortedBy, setSortedBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [selectedTaxs, setSelectedTaxs] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTax, setCurrentTax] = useState<TaxType | undefined>(undefined);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);


    useEffect(() => {
        const fetchTaxs = async () => {
            try {
                const tax = await getTaxs()
                setTaxs(tax)
            } catch (error) {
                console.error("Error fetch taxs :", error)
            }
        }
        fetchTaxs()
    }, [])

    const handleEditTax = (tax: TaxType) => {
        setCurrentTax(tax);
        setIsEditModalOpen(true);
    };

    const handleUpdateTax = async (tax: TaxType) => {
        try {
            setTaxs((prev) =>
                prev.map((t) =>
                    t.id === tax.id
                        ? tax
                        : t
                )
            );
        } catch (error) {
            console.error("Error update category")
        }
    }


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleAddTax = async (formData: TaxType) => {
        try {
            // Kirim data ke API

            // Update state hanya jika API sukses
            setTaxs((prevTax) => [...prevTax, formData]);

            // Notifikasi sukses
            Swal.fire({
                title: "Success!",
                text: `Category "${formData.name}" has been added.`,
                icon: "success",
                confirmButtonText: "OK",
            });

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to add category:", error);

            // Notifikasi error
            Swal.fire({
                title: "Error!",
                text: "Failed to add category. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    const handleDeleteTax = (id: string, name: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure you want to delete ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCategories = taxs.filter((tax) => tax.id !== id);
                setTaxs(updatedCategories);
                Swal.fire({
                    title: 'Deleted!',
                    text: `${name} has been deleted.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    const handleDeleteSelectedTaxs = () => {
        if (selectedTaxs.length > 0) {
            const updatedTaxs = taxs.filter(
                (tax) => !selectedTaxs.includes(tax.id)
            );
            setTaxs(updatedTaxs);
            setSelectedTaxs([]);
            alert('Selected taxs have been deleted.');
        }
    };

    const handleSelectAllTaxs = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedTaxs(taxs.map((tax) => tax.id));
        } else {
            setSelectedTaxs([]);
        }
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedBy(column);
        setSortOrder(newSortOrder);
    };


    const handleSelectTax = (id: string) => {
        setSelectedTaxs((prev) =>
            prev.includes(id)
                ? prev.filter((taxId) => taxId !== id)
                : [...prev, id]
        );
    };
    const sortedTaxs = taxs
        .filter((tax) =>
            tax.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if ((a[sortedBy as keyof TaxType] as string) < (b[sortedBy as keyof TaxType] as string)) return sortOrder === 'asc' ? -1 : 1;
            if ((a[sortedBy as keyof TaxType] as string) > (b[sortedBy as keyof TaxType] as string)) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(sortedTaxs.length / pagination);
    return (
        <Grid item xs={12} sm={8} gap={4} className='space-y-4'>
            {/* Tax info */}
            <TaxInfo />

            <Card>
                <CardContent className='space-y-4 shadow-mui-customShadow'>
                    <div className='flex w-full justify-between items-center'>
                        <Typography variant='h6' fontWeight="bold">List Tax</Typography>
                        <ButttonIcon
                            onClick={() => setIsModalOpen(true)}
                            icons={<PlusIcon className="h-4 w-4 mr-1" />}
                            title='Add Tax' />
                    </div>
                    <TaxFilter pagination={pagination} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setPagination={setPagination} />

                    {selectedTaxs.length > 0 && (
                        <div className="flex justify-between items-center mb-4 px-4">
                            <span className="text-sm font-semibold text-slate-500">
                                {`${selectedTaxs.length} item(s) selected`}
                            </span>
                            <button
                                onClick={handleDeleteSelectedTaxs}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-sm rounded-md shadow-md hover:brightness-110"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete All
                            </button>
                        </div>
                    )}

                    <TaxTableList
                        taxs={taxs}
                        pagination={pagination}
                        currentPage={currentPage}
                        handleEditTax={handleEditTax}
                        handleSelectAllTaxs={handleSelectAllTaxs}
                        handleSelectTaxs={handleSelectTax}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                        selectedTaxs={selectedTaxs}
                        sortedBy={sortedBy}
                        sortedTaxs={sortedTaxs}
                        handleDeleteTax={handleDeleteTax}
                    />

                    <div className="card-footer px-4 flex justify-end items-center py-2 mt-4 space-x-2">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </CardContent>
            </Card>

            <AddTaxDrawer
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddTax}
            />

            <EditTaxDrawer
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleUpdateTax}
                tax={currentTax || undefined}
            />
        </Grid>
    )
}

export default StoreTax
