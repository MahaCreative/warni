import { Menu } from "@headlessui/react";
import { usePage } from "@inertiajs/inertia-react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Auth/Sidebar";
import Button from "../Components/Button";
import DropdownMenu from "../Components/DropdownMenu";
import NavLink from "../Components/NavLink";

export default function Backend({ children }) {
    const [open, setOpen] = useState(false);
    const { auth } = usePage().props;
    const { flash } = usePage().props;
    const { imbox_pendonor } = usePage().props;
    useEffect(() => {
        flash.type && toast[flash.type](flash.message);
    });

    return (
        <div className="min-h-full  bg-slate-900 ">
            <Toaster position="bottom-right"></Toaster>
            <Sidebar open={open} setOpen={setOpen} />
            <div>
                <div className="">
                    <div
                        className={clsx(
                            open ? "" : "",
                            "px-4 flex justify-between items-center py-1.5 bg-gray-900/20 shadow-md shadow-gray-900/50 bgPrimary border-b border-dashed border-gray-500"
                        )}
                    >
                        <svg
                            onClick={() => setOpen(!open)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10 text-white hover:cursor-pointer hover:text-blue-900"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />{" "}
                        </svg>
                        <div className="flex gap-x-1">
                            <NavLink
                                className={"text-white  md:inline-block hidden"}
                            >
                                <DropdownMenu
                                    label={auth.user.name}
                                    className="text-white"
                                >
                                    <DropdownMenu.ItemLink href={route('dashboard')}>
                                        Dashboard
                                    </DropdownMenu.ItemLink>
                                    <DropdownMenu.ItemLink href={route('setting')}>
                                        Setting
                                    </DropdownMenu.ItemLink>
                                    <DropdownMenu.ItemLink href={route('logout')}>
                                        Logout
                                    </DropdownMenu.ItemLink>
                                </DropdownMenu>
                            </NavLink>
                            <NavLink href="/">Home</NavLink>
                        </div>
                    </div>
                    <div
                        className={
                            "bg-gradient-to-tl from-slate-900 via-slate-900 to-slate-800 px-6"
                        }
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
