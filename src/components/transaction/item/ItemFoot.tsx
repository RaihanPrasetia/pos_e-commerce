import { BookmarkIcon } from '@heroicons/react/16/solid'
import React from 'react'

function ItemFoot() {
    return (
        <div className='w-full px-2 flex items-center'>
            <div className='flex items-center w-full justify-end space-x-2 rounded-md h-14'>
                <button className='bg-gradient-to-br from-red-200 to-pink-400 flex items-center space-x-2 text-purple-800 h-full px-4 rounded-md font-semibold '>
                    <BookmarkIcon className='w-8 h-full ' />
                    <span className='text-nowrap  font-bold text-md'>Add Draft</span>
                </button>
                <button className='bg-utama text-lg w-full text-white h-full px-6 rounded-md font-bold '>
                    Add Transaction
                </button>
            </div>
        </div>
    )
}

export default ItemFoot
