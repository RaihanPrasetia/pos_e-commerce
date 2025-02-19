import { PencilIcon, UserPlusIcon } from '@heroicons/react/16/solid'
import { Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const Verification = () => {
    return (
        <Grid item xs={12}>
            <div className='p-6 bg-white rounded-md space-y-4'>
                <div>
                    <Typography variant='h6' className='font-bold'>Two-step verification</Typography>
                    <Typography variant='body2'>Keep your account secure with authentication step.</Typography>
                </div>

                <div className='flex items-center w-full space-x-4'>
                    <TextField
                        label="SMS"
                        type="text"
                        value="+1(1234) - 792163"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <button
                        className='p-4 rounded-md border border-slate-400 hover:brightness-110 bg-utama'
                    >
                        <UserPlusIcon className='w-6 text-white' />
                    </button>
                    <button
                        className='p-4 rounded-md border border-slate-400 hover:brightness-110 bg-utama'
                    >
                        <PencilIcon className='w-6 text-white' />
                    </button>
                </div>

                <Typography variant="body1">Two-factor authentication adds an additional layer of security to your account by requiring more than just a <br /> password to log in. <button className='text-utama'>Learn more.</button> </Typography>
            </div>
        </Grid>
    )
}

export default Verification
