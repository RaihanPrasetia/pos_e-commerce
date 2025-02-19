import { Grid } from '@mui/material'
import React from 'react'
import AddressBook from './AddressBook'
import BillingBook from './BillingBook'


const AddressLayout = () => {
    return (
        <Grid container spacing={4}>

            {/* Address Book */}
            <AddressBook />

            {/* Billing Book */}
            <BillingBook />

        </Grid>
    )
}

export default AddressLayout
