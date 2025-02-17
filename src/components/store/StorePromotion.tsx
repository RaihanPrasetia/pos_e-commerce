import { PromotionType } from '@/type/promotionTypes'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PromotionFilter from '../promotion/PromotionFilter';
import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import PromotionTableList from '../promotion/PromotionTableList';
import Pagination from '../pagination/Pagination';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import ButttonIcon from '../Button/ButttonIcon';
import { getPromotions } from '@/libs/service/promotionService';

function StorePromotion() {
    const router = useRouter();
    const [promotions, setPromotions] = useState<PromotionType[]>([]);
    const [pagination, setPagination] = useState<number>(5);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortedBy, setSortedBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const promotion = await getPromotions()
                setPromotions(promotion)
            } catch (error) {
                console.error("Error fetch promotions :", error)
            }
        }
        fetchPromotions()
    }, [])


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDeletePromotion = (id: string, name: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Are you sure you want to delete ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCategories = promotions.filter((promotion) => promotion.id !== id);
                setPromotions(updatedCategories);
                Swal.fire({
                    title: 'Deleted!',
                    text: `${name} has been deleted.`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        });
    };

    const handleDeleteSelectedPromotions = () => {
        if (selectedPromotions.length > 0) {
            const updatedPromotions = promotions.filter(
                (promotion) => !selectedPromotions.includes(promotion.id)
            );
            setPromotions(updatedPromotions);
            setSelectedPromotions([]);
            alert('Selected promotions have been deleted.');
        }
    };

    const handleSelectAllPromotions = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedPromotions(promotions.map((promotion) => promotion.id));
        } else {
            setSelectedPromotions([]);
        }
    };

    const handleSort = (column: string) => {
        const newSortOrder = sortedBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortedBy(column);
        setSortOrder(newSortOrder);
    };

    const handleToAddPromotion = () => {
        router.push('/customers/add');
    };

    const handleToEditPromotion = (promotionId: string) => {
        router.push(`/customers/edit?promotionId=${promotionId}`);
    };
    const handleSelectPromotion = (id: string) => {
        setSelectedPromotions((prev) =>
            prev.includes(id)
                ? prev.filter((promotionId) => promotionId !== id)
                : [...prev, id]
        );
    };
    const sortedPromotions = promotions
        .filter((promotion) =>
            promotion.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if ((a[sortedBy as keyof PromotionType] as string) < (b[sortedBy as keyof PromotionType] as string)) return sortOrder === 'asc' ? -1 : 1;
            if ((a[sortedBy as keyof PromotionType] as string) > (b[sortedBy as keyof PromotionType] as string)) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    const totalPages = Math.ceil(sortedPromotions.length / pagination);
    return (
        <Grid item xs={12} sm={8}>
            <Card>
                <CardContent className='space-y-4 shadow-mui-customShadow'>

                    <div className='flex w-full justify-between items-center'>
                        <Typography variant='h6' fontWeight="bold">List Promotion</Typography>
                        <ButttonIcon
                            onClick={handleToAddPromotion}
                            icons={<PlusIcon className="h-4 w-4 mr-1" />}
                            title='Add Promotion' />
                    </div>
                    <PromotionFilter pagination={pagination} handleSearchChange={handleSearchChange} searchTerm={searchTerm} setPagination={setPagination} />

                    {selectedPromotions.length > 0 && (
                        <div className="flex justify-between items-center mb-4 px-4">
                            <span className="text-sm font-semibold text-slate-500">
                                {`${selectedPromotions.length} item(s) selected`}
                            </span>
                            <button
                                onClick={handleDeleteSelectedPromotions}
                                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold text-sm rounded-md shadow-md hover:brightness-110"
                            >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete All
                            </button>
                        </div>
                    )}

                    <PromotionTableList
                        promotions={promotions}
                        pagination={pagination}
                        currentPage={currentPage}
                        handleEditPromotion={handleToEditPromotion}
                        handleSelectAllPromotions={handleSelectAllPromotions}
                        handleSelectPromotions={handleSelectPromotion}
                        sortOrder={sortOrder}
                        handleSort={handleSort}
                        selectedPromotions={selectedPromotions}
                        sortedBy={sortedBy}
                        sortedPromotions={sortedPromotions}
                        handleDeletePromotion={handleDeletePromotion}
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
        </Grid>
    )
}

export default StorePromotion
