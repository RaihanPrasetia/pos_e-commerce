import { Grid } from '@mui/material'
import React from 'react'
import ChangePassword from './ChangePassword'
import Verification from './Verification'

const SecurityLayout = () => {
    return (
        <Grid container spacing={4}>

            {/* Change Password */}
            <ChangePassword />

            {/* Two-step verification */}
            <Verification />

        </Grid>
    )
}

export default SecurityLayout
