import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ItemSold from "./profitInfo/ItemSold";
import Profit from "./profitInfo/Profit";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const optionsValue = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const, // Position the legend at the top
        },
        title: {
            display: true,
            text: 'Daily Expense Chart',
            font: {
                size: 18,
            },
            color: '#6D67E4', // Title color (blue)
        },
    },
    scales: {
        x: {
            grid: {
                display: false, // Hide x-axis grid
            },
            ticks: {
                font: {
                    size: 12,
                },
                color: '#3F51B5', // X-axis label color (blue)
            },
        },
        y: {
            grid: {
                color: 'rgba(186, 164, 233, 0.5)', // Light grid color
                borderDash: [4, 4], // Dashed line pattern
            },
            ticks: {
                font: {
                    size: 12,
                },
                color: '#3F51B5', // Y-axis label color (blue)
                callback: function (value: number | string) {
                    return `$${value}`; // Format values with '$'
                },
            },
        },
    },
}

export default function ProfitChart() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [options, setOption] = useState({})

    const [data, setData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Profit 2023",
                data: [678, 1200, 678, 1700, 985, 2034, 1987, 2200, 2300, 1800, 2100, 2500],
                borderColor: "rgba(139, 92, 246, 0.8)",
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                tension: 0.4,
                pointRadius: 5,
                borderWidth: 1,
                barThickness: 20, // Set a smaller bar thickness
                borderRadius: 10,
            },
            {
                label: "Profit 2022",
                data: [500, 1400, 783, 700, 1700, 1200, 1400, 1600, 1500, 1700, 1800, 1900],
                borderColor: "rgba(255, 159, 64, 0.8)",
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                tension: 0.4,
                pointRadius: 5,
            },
        ],

    });



    useEffect(() => {
        setOption(optionsValue)
    }, [options]);



    return (
        <>
            <Box
                sx={{
                }}
                className="bg-gradient-to-br from-slate-50 to-gray-50 p-6  rounded-xl "
            >
                <Line data={data} options={options} />
            </Box>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={8} container spacing={2} >
                    <Grid item xs={6} sm={5}>
                        <ItemSold value={2358} percentage="+23%" title="Item Sold" />
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Profit value="$2358" percentage="+15%" title="Profit" />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} container justifyContent={isMobile ? "center" : "flex-end"}>
                    <button className='px-6 py-2 bg-purple-500 rounded-md font-semibold hover:brightness-110 text-white'>
                        Cek Detail
                    </button>
                </Grid>
            </Grid>
        </>
    );
}