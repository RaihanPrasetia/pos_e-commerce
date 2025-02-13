import React from 'react'

interface ContentProps {
    children?: React.ReactNode
}

export const Content = ({ children }: ContentProps) => {
    return (
        <div className='mb-4'>
            {children}
        </div>
    )
}

export default Content
