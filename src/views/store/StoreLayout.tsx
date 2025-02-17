"use client"
import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import { storeType } from '@/type/storeTypes'
import { useAuth } from '@/contexts/AuthContext'
import { getStoreByOwnerId } from '@/libs/service/storeService'
import StoreImage from '@/components/store/StoreImage'
import StoreInformation from '@/components/store/StoreInformation'

const StoreLayout = () => {
    const { user } = useAuth()
    const [storeData, setStoreData] = useState<storeType | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchStoreByOwner = async () => {
            try {
                if (user) {
                    const ownerId = String(user.id)
                    const result = await getStoreByOwnerId(ownerId)
                    setStoreData(result)
                    console.log(result)
                }
            } catch (error) {
                console.error("Error fetching Store By OwnerId:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStoreByOwner()
    }, [user])

    if (loading) {
        return <div>Loading ...</div>
    }

    if (!storeData) {
        return <div>Data Store Tidak Ditemukan</div>
    }

    return (
        <Grid container spacing={4}>
            <StoreImage imageUrl={storeData.imageUrl} name={storeData.storeName} />
            <StoreInformation storeData={storeData} />
        </Grid>
    )
}

export default StoreLayout
