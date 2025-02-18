import { LockClosedIcon, UserCircleIcon, HomeIcon, BellIcon } from '@heroicons/react/16/solid';
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import OverviewLayout from './overview/OverviewLayout';
import SecurityLayout from './security/SecurityLayout';

export const CustomerRight = () => {
    const [content, setContent] = useState('overview');

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return (
        <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
                <Grid item xs={12} gap={2}>
                    <div className='flex items-center justify-start space-x-4 w-full overflow-x-auto'>

                        <button
                            onClick={() => handleContentChange('overview')}
                            className={`p-3 border-none flex space-x-3 rounded-xl cursor-pointer ${content === 'overview' ? 'bg-utama' : 'bg-transparent'}`}
                        >
                            <UserCircleIcon className={`w-5 ${content === 'overview' ? ' text-white' : 'text-gray-800'}`} />
                            <Typography variant='body1' className={`font-semibold ${content === 'overview' ? 'text-white' : 'text-gray-800'}`}>Overview</Typography>

                        </button>
                        <button
                            onClick={() => handleContentChange('security')}
                            className={`p-3 border-none flex space-x-3 rounded-xl ${content === 'security' ? 'bg-utama' : 'bg-transparent'}`}
                        >
                            <LockClosedIcon className={`w-5 ${content === 'security' ? ' text-white' : 'text-gray-800'}`} />
                            <Typography variant='body1' className={`font-semibold ${content === 'security' ? 'text-white' : 'text-gray-800'}`}>Security</Typography>

                        </button>
                        <button
                            onClick={() => handleContentChange('address')}
                            className={`p-3 border-none flex space-x-3 rounded-xl ${content === 'address' ? 'bg-utama' : 'bg-transparent'}`}
                        >
                            <HomeIcon className={`w-5 ${content === 'address' ? ' text-white' : 'text-gray-800'}`} />
                            <Typography variant='body1' className={`font-semibold ${content === 'address' ? 'text-white' : 'text-gray-800'}`}>Address & Billing</Typography>
                        </button>
                        <button
                            onClick={() => handleContentChange('notification')}
                            className={`p-3 border-none flex space-x-3 rounded-xl ${content === 'notification' ? 'bg-utama' : 'bg-transparent'}`}
                        >
                            <BellIcon className={`w-5 ${content === 'notification' ? ' text-white' : 'text-gray-800'}`} />
                            <Typography variant='body1' className={`font-semibold ${content === 'notification' ? 'text-white' : 'text-gray-800'}`}>Notification</Typography>
                        </button>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    {content === 'overview' && (
                        <OverviewLayout />
                    )}
                    {content === 'security' && (
                        <SecurityLayout />
                    )}
                    {content === 'address' && (
                        <Typography variant="h6">Address & Billing Content</Typography>
                    )}
                    {content === 'notification' && (
                        <Typography variant="h6">Notification Content</Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CustomerRight;