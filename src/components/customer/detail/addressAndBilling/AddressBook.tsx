"use client";

import { getAddressCustomer } from '@/libs/service/addressService';
import { AddressType } from '@/type/addressTypes';
import { BuildingOffice2Icon, ChevronDoubleDownIcon, ChevronDoubleRightIcon, HomeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Grid, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AddAddressDrawer from './AddAddressDrawer';
import Swal from 'sweetalert2';

const LocationTypeStyle = ({ name, idx }: { name: string, idx: number }) => {
    return (
        <div className='w-full space-x-2 flex items-center justify-start'>
            {name === "home" ? <HomeIcon className='w-8 h-8 text-slate-700  rounded-full' /> : <BuildingOffice2Icon className='w-8 h-8 text-slate-700  rounded-full' />}
            <Typography variant='body1' fontWeight="bold" className='text-slate-700'>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            {idx === 0 && <span className='px-3 py-1 bg-green-200 text-sm text-green-600 font-medium rounded-md'>Default Address</span>}

        </div>
    )
}

const AddressBook = () => {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");
    const [addressCustomer, setAddressCustomer] = useState<AddressType[]>([]);
    const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);
    const [isOpenShow, setIsOpenShow] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const id = String(customerId);
                const result = await getAddressCustomer(id);
                setAddressCustomer(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCustomer();
    }, [customerId]);

    const handleAddAddress = async (formData: AddressType) => {
        try {
            // Kirim data ke API

            // Update state hanya jika API sukses
            setAddressCustomer((prevAddress) => [...prevAddress, formData]);

            // Notifikasi sukses
            Swal.fire({
                title: "Success!",
                text: `Category "${formData.location}" has been added.`,
                icon: "success",
                confirmButtonText: "OK",
            });

            setIsOpenAddDrawer(false);
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

    const toggleShow = (locationType: string) => {
        setIsOpenShow((prevState) => ({
            ...prevState,
            [locationType]: !prevState[locationType],
        }));
    };

    const groupedAddresses = addressCustomer.reduce((acc, address) => {
        if (!acc[address.locationType]) {
            acc[address.locationType] = [];
        }
        acc[address.locationType].push(address);
        return acc;
    }, {} as { [key: string]: AddressType[] });

    return (
        <>
            <Grid item xs={12}>
                <div className='p-6 bg-white rounded-md space-y-4 shadow-mui-customShadow'>
                    <div className='flex items-center justify-between'>
                        <Typography variant='h6' className='font-bold'>Address Book</Typography>
                        <button
                            onClick={() => setIsOpenAddDrawer(true)}
                            className="flex items-center hover:text-blue-600 px-4 border-2 border-blue-500 py-2 text-sm font-semibold text-blue-500 rounded-md transition hover:bg-blue-100"
                        >
                            Add Address New
                        </button>
                    </div>

                    {addressCustomer.length > 0 ? (
                        Object.keys(groupedAddresses).map((locationType, index) => (
                            <div key={index} className='mt-4'>
                                <div className='flex items-start space-x-4'>

                                    <button
                                        className={`p-1 rounded-full hover:bg-slate-100 ${isOpenShow[locationType] ? "bg-utama text-white" : "bg-transparent"}`}
                                        onClick={() => toggleShow(locationType)}
                                    >
                                        {isOpenShow[locationType] ? <ChevronDoubleDownIcon className='w-6 h-6 ' /> : <ChevronDoubleRightIcon className='w-6 h-6 ' />}
                                    </button>

                                    <div className='w-full'>

                                        {/* Location Style */}
                                        <LocationTypeStyle name={locationType} idx={index} />

                                        {isOpenShow[locationType] && (
                                            <>
                                                {groupedAddresses[locationType].map((address, idx) => (
                                                    <div key={idx} className='flex items-center border-b p-2 border-slate-400 justify-between w-full'>
                                                        <div className='w-full'>
                                                            <div className='flex space-x-4 items-center'>
                                                                <Typography variant='body1' fontWeight="bold">{address.country}</Typography>
                                                                <span
                                                                    className={`status-badge m-0 ${address.isActive
                                                                        ? 'status-active'
                                                                        : 'status-inactive'
                                                                        }`}
                                                                >
                                                                </span>
                                                            </div>
                                                            <Typography variant='body2'>{address.location}</Typography>
                                                            <Typography variant='body2'>Phone : {address.phoneNumber}</Typography>
                                                            <Typography variant='body2'>{new Date(address.createdDt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography>
                                                        </div>
                                                        <div className='flex space-x-4 w-full justify-end'>
                                                            <button
                                                                className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-br from-pink-500 to-purple-700 rounded-md shadow-md transition hover:brightness-110"
                                                            >
                                                                <PencilSquareIcon className="h-4 w-4" />
                                                                <span>Edit</span>
                                                            </button>

                                                            <button
                                                                className="flex items-center px-3 py-2 space-x-1 text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md shadow-md transition hover:brightness-110"
                                                            >
                                                                <TrashIcon className="h-4 w-4" />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                ))}
                                            </>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='mt-4'>
                            <Typography variant='body1'>Add new a address</Typography>
                        </div>
                    )}
                </div>
            </Grid>
            <AddAddressDrawer isOpen={isOpenAddDrawer} onClose={() => setIsOpenAddDrawer(false)} onSubmit={handleAddAddress} />
        </>
    );
};

export default AddressBook;