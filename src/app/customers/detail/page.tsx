import CustomerDetailClient from "@/app/views/CustomerDetailClient";
import { Suspense } from "react";

const CustomerDetail = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CustomerDetailClient />
        </Suspense>
    );
};

export default CustomerDetail;
