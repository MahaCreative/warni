import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import toast, { Toaster } from "react-hot-toast";
export default function App({ children, ...props }) {
    const { flash } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    });

    return (
        <div className="min-h-full min-w-full bg-slate-900">
            <Toaster position="bottom-right"></Toaster>
            <Navbar />
            <div className="">{children}</div>
        </div>
    );
}
