import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [information, setInformation] = useState(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChangePassword = () => {
        alert("Success change password");
    };

    const handleCloseInformation = () => {
        setInformation(false);
    };

    return (
        <Grid item xs={12}>
            <div className='p-4 bg-white rounded-lg space-y-4'>
                <Typography variant='h6' className='font-bold'>Change Password</Typography>
                {information && (
                    <div className='w-full p-4 rounded-md bg-purple-100 relative'>
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseInformation}
                            className='absolute top-2 right-2'
                        >
                            <XMarkIcon className='w-5 h-5 text-gray-700' />
                        </IconButton>
                        <Typography variant='body1' fontWeight="bold">Ensure that these requirements are met</Typography>
                        <Typography variant='body2'>Minimum 8 characters long, uppercase & symbol</Typography>
                    </div>
                )}
                <div className='flex justify-between items-center space-x-4'>
                    <TextField
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <EyeSlashIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <EyeSlashIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <button
                    onClick={handleChangePassword}
                    className="flex items-center p-3 border shadow-lg text-md font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-700 rounded-md transition "
                >
                    Change Password
                </button>
            </div>
        </Grid>
    );
};

export default ChangePassword;
