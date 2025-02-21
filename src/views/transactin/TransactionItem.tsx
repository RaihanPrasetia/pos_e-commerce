import ItemFoot from '@/components/transaction/item/ItemFoot'
import ItemHead from '@/components/transaction/item/ItemHead'
import ItemList from '@/components/transaction/item/ItemList'
import ItemNotFound from '@/components/transaction/item/ItemNotFound'
import { getDraft } from '@/libs/service/draftService'
import { DraftType } from '@/type/darftTypes'
import { TransactionItem as Item, TransactionType } from '@/type/transactionType'
import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface TransactionItemProp {
    formData: TransactionType
    setSelectProduct: (data: Item[]) => void;

}

const TransactionItem = ({ formData, setSelectProduct }: TransactionItemProp) => {
    const [draftData, setDarftData] = useState<DraftType[]>([])

    useEffect(() => {
        const fetchDraft = async () => {
            try {
                const result = await getDraft()
                setDarftData(result)
            } catch (error) {
                console.error("Error fetch draft data :", error)
            }
        }
        fetchDraft()
    }, [])

    console.log(formData)

    return (
        <div className='flex flex-col space-y-2 h-[85vh]'>
            <ItemHead draftData={draftData} />

            <Divider className='bg-utama p-0.5' />

            <div className='mt-2 h-full flex-grow overflow-hidden overflow-y-auto p-2'>
                {formData.items.length > 0 ? (
                    <ItemList itemData={formData.items} setSelectProduct={setSelectProduct} />

                ) : (
                    <ItemNotFound />
                )

                }
            </div>
            <Divider className='bg-utama p-0.5' />

            <ItemFoot />

            <Divider className='bg-utama p-0.5' />

        </div>
    )
}

export default TransactionItem
