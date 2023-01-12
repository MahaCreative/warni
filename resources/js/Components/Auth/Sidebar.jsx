import { Disclosure, Menu } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import NavLink from "../NavLink";
import DropdownMenu from "../DropdownMenu";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { usePage } from "@inertiajs/inertia-react";
export default function Sidebar({ open = false, setOpen, label }) {
    const [toggler, setToggler] = useState(false);
    const { auth } = usePage().props;

    return (
        <div
            className={clsx(
                open ? "" : "-translate-x-[1000px] md:-translate-x-[1000px]",
                "duration-1000  ease-in-out transition-all fixed top-0 left-0 bg-gray-900/20 backdrop-blur-sm min-h-screen w-[85%] md:w-[45%] lg:w-[25%] z-[9999] py-2.5 px-4 border-r border-dashed border-gray-700/50"
            )}
        >
            <div className="flex justify-between text-white border-b border-dashed border-gray-600 py-1.5 items-center">
                <div className="text-white font-bold text-2xl">SisDonor</div>
                <svg
                    onClick={(event) => setOpen(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="flex justify-end hover:cursor-pointer hover:text-gray-800 duration-300 ease-linear transition w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
            <div className="py-3">
                <NavLink className={"block"} href={route('dashboard')}>Dashboard</NavLink>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-400/30 px-4 py-2 text-left text-sm font-medium text-white focus-visible:text-black hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                                <span>Menu Registrasi Donor</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <NavLink href={route('registrasi-donor')} className={"block"}>
                                    Data Registrasi Pendonor
                                </NavLink>
                                <NavLink href={route('proses-donor')} className={"block"}>
                                    Proses Registrasi Donor
                                </NavLink>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-400/30 px-4 py-2 text-left text-sm font-medium text-white focus-visible:text-black hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                                <span>Menu Permintaan Darah</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <NavLink href={route('permintaan-darah')} className={"block"}>
                                    Register Permintaan Darah
                                </NavLink>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-400/30 px-4 py-2 text-left text-sm font-medium text-white focus-visible:text-black hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-white focus-visible:ring-opacity-75">
                                <span>Menu Gologan Darah</span>
                                <ChevronUpIcon
                                    className={`${
                                        open ? "rotate-180 transform" : ""
                                    } h-5 w-5 text-gray-500`}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <NavLink href={route('data-darah')} className={"block"}>
                                    Stok Darah
                                </NavLink>
                                <NavLink href={route('data-darah-masuk')} className={"block"}>
                                    Darah Masuk
                                </NavLink>
                                <NavLink href={route('data-darah-keluar')} className={"block"}>
                                    Darah Keluar
                                </NavLink>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <NavLink className={"block"} href={route('event')}>Data Event Donor</NavLink>

                {/* <NavLink className={'block'} href={route('admin-data-pendonor')}>
                    Permintaan Darah
                </NavLink> */}
                <NavLink className={"block"} href={route('admin-data-pendonor')}>Nama Pendonor</NavLink>
                {/* { auth.role} */}
                {/* {auth.role[0].name == 'super admin'  && (<NavLink
                    className={'block'}
                    
                >
                    User
                </NavLink>)} */}

                {/* <NavLink className={'block'} href={route('home')}>
                    History Registrasi Donor
                </NavLink>
                <NavLink className={'block'} href={route('home')}>
                    History Data Darah
                </NavLink> */}
            </div>
        </div>
    );
}
