import { Link, usePage } from "@inertiajs/inertia-react";
import clsx from "clsx";
import React, { useState } from "react";
import NavLink from "./NavLink";

export default function ResponsiveNavlink() {
    const { auth } = usePage().props;
    const [toogle, setToogle] = useState(false);
    const setToogler = () => {
        setToogle(!toogle);
    };
    // Create Fixed on scroll
    const [onScroll, setOnScroll] = useState(false);
    const methodScroll = () => {
        if (window.scrollY <= 0) {
            setOnScroll(false);
        } else {
            setOnScroll(true);
        }
    };
    window.addEventListener("scroll", methodScroll);
    return (
        <div
            className={clsx(
                onScroll ? "fixed bg-opacity-80" : "",
                " w-full md:hidden flex justify-between border-b border-dashed border-gray-700 bg-red-500 py-4 shadow z-50"
            )}
        >
            <div className="w-full max-w-screen-2xl px-4">
                <div className="flex items-center justify-between w-full">
                    <Link
                        href={"#"}
                        className="mr-3 text-lg font-semibold capitalize text-white"
                    >
                        RSUD Mamuju
                    </Link>
                    <div
                        onClick={setToogler}
                        className="text-white cursor-pointer"
                    >
                        {toogle || (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 "
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />{" "}
                            </svg>
                        )}
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    toogle ? "" : "hidden",
                    "fixed duration-1000 ease-in-out transition-transform bg-red-400/20  backdrop-blur-md min-h-screen w-[80%] top-0 right-0 z-[99999]"
                )}
            >
                <button onClick={setToogler}>
                    <div className="absolute top-4 right-6 text-white ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </button>

                <div className="flex flex-col items-center gap-y-6 py-16 ">
                    <NavLink href={route('home')} active={route().current('home')}>
                        Beranda
                    </NavLink>
                    <NavLink href={route('syarat-donor')} active={route().current('syarat-donor')}>
                        Syarat Donor
                    </NavLink>
                    <NavLink href={route('event-donor')} active={route().current('event-donor')}>
                        Even Donor
                    </NavLink>
                    {auth.user ? (
                    <NavLink
                    href={route('logout')}
                >
                    Logout
                </NavLink>
                    ) : (
                        <NavLink
                        href={route('login')}
                    >
                        Login Admin
                    </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
}
