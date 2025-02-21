import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import DraftList from './option/DraftList';
import { DraftType } from '@/type/darftTypes';
import menuItems from '@/helpers/menuItemsOption';

interface ItemHeadProp {
    draftData: DraftType[]
}




const ItemHead = ({ draftData }: ItemHeadProp) => {
    const [showCard, setShowCard] = useState(false);
    const [openModal, setOpenModal] = useState<string | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const cardRef = useRef<HTMLDivElement>(null);

    const toggleCard = () => {
        setShowCard(!showCard);
    };

    const handleOpenModal = (action: string) => {
        setOpenModal(action);
    };

    const handleIsOnline = () => {
        setIsOnline(!isOnline);
    };

    const handleCloseModal = () => {
        setOpenModal(null);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setShowCard(false);
        }
    };

    useEffect(() => {
        if (showCard) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCard]);

    const renderDialogContent = (action: string | null) => {
        switch (action) {
            case 'draft':
                return <DraftList draftData={draftData} />;
            case 'Option 2':
                return <div>You selected Option 2.</div>;
            case 'Option 3':
                return <div>You selected Option 3.</div>;
            case 'Option A':
                return <div>You selected Option A.</div>;
            case 'Option B':
                return <div>You selected Option B.</div>;
            case 'Option C':
                return <div>You selected Option C.</div>;
            default:
                return null;
        }
    };

    return (
        <div className='flex w-full justify-between items-center p-4 bg-utama text-white'>
            <div className='flex items-center space-x-4 relative w-full'>
                <button className='bg-white h-full px-4 py-2 rounded-md' onClick={toggleCard}>
                    <span className='text-utama font-bold'>Option</span>
                </button>
                {showCard && (
                    <div ref={cardRef} className='absolute mt-2 flex p-4 top-10 left-0 w-auto space-x-2 bg-white text-black rounded-md shadow-lg'>
                        {menuItems.map((menu, index) => (
                            <div key={index} className='text-nowrap flex flex-col items-center space-y-2 bg-slate-100 rounded-sm p-2'>
                                <span className='font-bold'>{menu.title}</span>
                                <Divider className='bg-black p-[1px] w-full' />
                                {menu.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        className='flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-md w-full text-left'
                                        onClick={() => handleOpenModal(option.action)}
                                    >
                                        {option.icon}
                                        <span>{option.name}</span>
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex py-0.5 flex-col items-end w-full justify-center'>
                <span className='text-xl font-bold'>Status</span>
                <button className=' flex items-center space-x-2' onClick={handleIsOnline}>
                    <span
                        className={`status-badge ${isOnline
                            ? 'status-active'
                            : 'status-inactive'
                            }`}
                    >
                    </span>

                    <span className='font-medium'>{isOnline ? 'Online' : 'Offline'}</span>
                </button>
            </div>

            <Dialog open={Boolean(openModal)} onClose={handleCloseModal} fullWidth maxWidth="md" >
                <DialogTitle className="capitalize">{openModal}</DialogTitle>
                <DialogContent className='h-[600px] overflow-y-auto'>
                    {renderDialogContent(openModal)}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ItemHead;