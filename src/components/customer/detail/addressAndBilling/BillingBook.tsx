import { getBillings } from '@/libs/service/billingService';
import { BillingType, CvcType } from '@/type/billingTypes';
import { ChevronDoubleDownIcon, ChevronDoubleRightIcon, HomeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Grid, Typography } from '@mui/material'
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BillingTypeStyle = ({ name, idx }: { name: string, idx: number }) => {
    return (
        <div className='w-full space-x-2 flex items-center justify-start'>
            {name === "Mastercard" && <Image src="/assets/img/logos/mastercard.png" alt={name} width={30} height={30} className='object-cover rounded-full' /> ||
                name === "Visa" && <Image src="/assets/img/logos/visa.png" alt={name} width={30} height={30} className='object-cover rounded-full' /> ||
                name === "Paypal" && <Image src="/assets/img/logos/paypal.png" alt={name} width={30} height={30} className='object-cover rounded-full' /> ||
                name === "American Express" && <Image src="/assets/img/logos/american-express.png" alt={name} width={30} height={30} className='object-cover rounded-full' />}
            <Typography variant='body1' fontWeight="bold" className='text-slate-700'>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            {idx === 0 && <span className='px-3 py-1 bg-green-200 text-sm text-green-600 font-medium rounded-md'>Default Billing</span>}
        </div>
    )
}

const CvcStyle = ({ name }: { name: CvcType }) => {
    const getBgColor = () => {
        switch (name) {
            case "approved":
                return "bg-green-200 text-green-600"; // Hijau untuk approved
            case "declined":
                return "bg-red-200 text-red-600"; // Merah untuk declined
            case "pending":
                return "bg-yellow-200 text-yellow-600"; // Kuning untuk pending
            default:
                return "";
        }
    };

    return (
        <Typography
            variant="body2"
            p={2}
            className={`rounded-md px-4 py-1 text-sm w-max font-medium ${getBgColor()}`}
        >
            {name}
        </Typography>
    );
};



const BillingBook = () => {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");
    const [billingCustomer, setBillingCustomer] = useState<BillingType[]>([]);
    const [isOpenAddDrawer, setIsOpenAddDrawer] = useState(false);
    const [isOpenShow, setIsOpenShow] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const id = String(customerId);
                const result = await getBillings(id);
                setBillingCustomer(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCustomer();
    }, [customerId]);

    const toggleShow = (type: string) => {
        setIsOpenShow((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const groupedBillinges = billingCustomer.reduce((acc, billing) => {
        if (!acc[billing.type]) {
            acc[billing.type] = [];
        }
        acc[billing.type].push(billing);
        return acc;
    }, {} as { [key: string]: BillingType[] });

    return (
        <Grid item xs={12}>
            <div className='p-6 bg-white rounded-md space-y-4 shadow-mui-customShadow'>
                <div className='flex items-center justify-between'>
                    <Typography variant='h6' className='font-bold'>Billing Book</Typography>
                    <button
                        onClick={() => setIsOpenAddDrawer(true)}
                        className="flex items-center hover:text-blue-600 px-4 border-2 border-blue-500 py-2 text-sm font-semibold text-blue-500 rounded-md transition hover:bg-blue-100"
                    >
                        Add Billing
                    </button>
                </div>
                {billingCustomer.length > 0 ? (
                    Object.keys(groupedBillinges).map((type, index) => (
                        <div key={index} className='mt-4'>
                            <div className='flex items-start space-x-4'>

                                <button
                                    className={`p-1 rounded-full hover:bg-slate-100 ${isOpenShow[type] ? "bg-utama text-white" : "bg-transparent"}`}
                                    onClick={() => toggleShow(type)}
                                >
                                    {isOpenShow[type] ? <ChevronDoubleDownIcon className='w-6 h-6 ' /> : <ChevronDoubleRightIcon className='w-6 h-6 ' />}
                                </button>

                                <div className='w-full'>

                                    {/* Type Style */}
                                    <BillingTypeStyle name={type} idx={index} />

                                    {isOpenShow[type] && (
                                        <>
                                            {groupedBillinges[type].map((billing, idx) => (
                                                <div key={idx} className='flex items-center border-b p-2 border-slate-400 justify-between w-full'>
                                                    <div className='w-full flex items-start space-x-10'>
                                                        <div className='w-full'>
                                                            <div className='flex space-x-4 items-center'>
                                                                <Typography variant='body1' fontWeight="bold">{billing.owner?.ownerName}</Typography>
                                                            </div>
                                                            <Typography variant='body2'>Number : {billing.number}</Typography>
                                                            <Typography variant='body2'>Type : {billing.type}</Typography>
                                                            <Typography variant='body2'>Exp : {new Date(billing.exp).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</Typography>
                                                        </div>
                                                        <div className='w-full'>
                                                            <Typography variant='body2'>Country : {billing.owner?.ownerCountry}</Typography>
                                                            <Typography variant='body2' noWrap>Email : {billing.owner?.ownerEmail}</Typography>
                                                            <Typography variant='body2'>Phone Number : {billing.owner?.ownerPhone}</Typography>
                                                            <CvcStyle name={billing.cvc} />
                                                        </div>
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
                        <Typography variant='body1'>Add new a billing</Typography>
                    </div>
                )}
            </div>
        </Grid>
    )
}

export default BillingBook
