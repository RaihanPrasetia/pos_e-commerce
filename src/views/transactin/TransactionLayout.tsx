"use client";
import { Card, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import TransactionProduct from "./TransactionProduct";
import TransactionItem from "./TransactionItem";
import { TransactionItem as Item, TransactionType } from "@/type/transactionType";

const TransactionLayout = () => {
    const [selectedItem, setSelectedItem] = useState<Item[]>([]);
    const [formData, setFormData] = useState<TransactionType>({
        id: "",
        transNumber: "",
        discountValue: 0,
        taxValue: 0,
        qty: 0,
        subTotal: 0,
        items: [],
        promotions: [],
        taxs: [],
        transactionDt: "",
        grandTotal: 0,
    });

    // Fungsi untuk menghitung ulang subtotal dan grandTotal
    useEffect(() => {
        const subTotal = selectedItem.reduce((total, item) => total + item.price * item.qty, 0);
        const grandTotal = subTotal - formData.discountValue + formData.taxValue;

        setFormData((prevFormData) => ({
            ...prevFormData,
            items: selectedItem,
            subTotal,
            qty: selectedItem.reduce((total, item) => total + item.qty, 0),
            grandTotal,
        }));
    }, [selectedItem, formData.discountValue, formData.taxValue]);

    return (
        <Card>
            <div className="flex space-x-2 p-4">
                <div className="w-full">
                    <TransactionProduct selectedProducts={selectedItem} setSelectedItem={setSelectedItem} />
                </div>
                <Divider orientation="vertical" flexItem className="p-0.5 bg-slate-600" />
                <div className="w-full">
                    <TransactionItem formData={formData} setSelectProduct={setSelectedItem} />
                </div>
            </div>
        </Card>
    );
};

export default TransactionLayout;
