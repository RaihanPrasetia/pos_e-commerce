import { CustomerType } from '@/type/cutomersType'
import React from 'react'
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material'

interface CustomerCardInfoProps {
    customer: CustomerType | undefined
}

export const CustomerCardInfo = ({ customer }: CustomerCardInfoProps) => {
    if (!customer) {
        return <Typography variant="h6" color="textSecondary">Customer not found</Typography>
    }

    return (
        <Grid item xs={12} md={4}>
            <Card className="shadow-mui-customShadow rounded-lg overflow-hidden w-full">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar alt={customer.name} src={customer.imageUrl} className="w-16 h-16" />
                        <div>
                            <Typography variant="h5" className="font-semibold text-gray-800">{customer.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.email}</Typography>
                        </div>
                    </div>
                    <hr className="bg-gray-300 mb-4" />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">Address</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.address}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">Phone</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.phone}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">City</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.city}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">State</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.state}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">Zip</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.zip}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">Country</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.country}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">Created At</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.createdAt}</Typography>
                        </div>
                        <div>
                            <Typography variant="subtitle2" fontWeight="bold" className="font-semibold text-gray-600">Updated At</Typography>
                            <Typography variant="body2" color="textSecondary">{customer.updatedAt}</Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CustomerCardInfo
