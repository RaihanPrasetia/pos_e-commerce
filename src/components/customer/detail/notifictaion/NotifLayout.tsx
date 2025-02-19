import { Divider, Grid, Typography, Checkbox } from '@mui/material';
import React, { useState } from 'react';

const theadData = ["Type", "Email", "Browser", "App"];
const initialTbodyData = [
    {
        id: 1,
        name: "New for you",
        checked: [
            {
                name: "Email",
                isChecked: true
            },
            {
                name: "Browser",
                isChecked: true
            },
            {
                name: "App",
                isChecked: true
            },
        ],
    },
    {
        id: 2,
        name: "Account activity",
        checked: [
            {
                name: "Email",
                isChecked: true
            },
            {
                name: "Browser",
                isChecked: true
            },
            {
                name: "App",
                isChecked: false
            },
        ],
    },
    {
        id: 3,
        name: "A new browser used to sign in",
        checked: [
            {
                name: "Email",
                isChecked: true
            },
            {
                name: "Browser",
                isChecked: false
            },
            {
                name: "App",
                isChecked: false
            },
        ],
    },
    {
        id: 4,
        name: "A new device is linked",
        checked: [
            {
                name: "Email",
                isChecked: true
            },
            {
                name: "Browser",
                isChecked: true
            },
            {
                name: "App",
                isChecked: false
            },
        ],
    },
];

const NotifLayout = () => {
    const [tbodyData, setTbodyData] = useState(initialTbodyData);

    const handleCheckboxChange = (rowId: number, checkName: string) => {
        setTbodyData((prevData) =>
            prevData.map((row) =>
                row.id === rowId
                    ? {
                        ...row,
                        checked: row.checked.map((check) =>
                            check.name === checkName
                                ? { ...check, isChecked: !check.isChecked }
                                : check
                        ),
                    }
                    : row
            )
        );
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <div className='p-6 bg-white rounded-t-md space-y-4 shadow-mui-customShadow'>
                    <Typography variant='h6' className='font-bold'>Notification</Typography>
                    <Divider />
                    <Typography variant='body1'>You will receive notification for the below selected items.</Typography>
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className='bg-white space-y-4 shadow-mui-customShadow rounded-b-md'>
                    <table className='w-full'>
                        <thead className='border-y-2 bg-slate-100 text-black'>
                            <tr>
                                {theadData.map((header, index) => (
                                    <th key={index} className={`py-4 ${index === 0 ? 'text-start pl-6' : 'text-center'}`}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tbodyData.map((row) => (
                                <tr key={row.id} className='border-b-2'>
                                    <td className='text-start py-4 pl-6 font-semibold'>{row.name}</td>
                                    {row.checked.map((check, index) => (
                                        <td key={index} className='text-center'>
                                            <Checkbox
                                                checked={check.isChecked}
                                                onChange={() => handleCheckboxChange(row.id, check.name)}
                                                color={check.isChecked ? "success" : "default"}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='flex space-x-4 pl-6 pb-6'>
                        <button
                            className="px-4 py-2 font-semibold bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            className="px-6 py-2 bg-gradient-to-br from-pink-500 to-purple-700 text-white font-semibold rounded-md hover:from-pink-600 hover:to-purple-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default NotifLayout;