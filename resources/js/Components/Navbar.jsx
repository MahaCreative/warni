import { Link, usePage } from "@inertiajs/inertia-react";
import clsx from "clsx";

import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import NavLink from "./NavLink";
import ResponsiveNavlink from "./ResponsiveNavlink";

export default function Navbar() {
    const { auth } = usePage().props;

    // Create Fixed on scroll
    const [onScroll, setOnScroll] = useState(false);
    const methodScroll = () => {
        if (window.scrollY <= 0) {
            setOnScroll(false);
        } else {
            setOnScroll(true);
        }
    };
    // scroll to element on click
    window.addEventListener("scroll", methodScroll);

    return (
        <div>
            <ResponsiveNavlink />
            <nav
                className={clsx(
                    onScroll ? "fixed bg-opacity-75 backdrop-blur-md" : "",
                    "hidden border-b border-dashed border-red-500 bg-red-600 py-4 shadow w-full md:block z-50"
                )}
            >
                <div className="mx-auto max-w-screen-2xl px-4">
                    <div className="flex items-center justify-between">
                        <Link
                            // href={'#'}
                            className="mr-3 text-lg font-semibold capitalize text-white"
                        >
                            RSUD Mamuju
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <NavLink
                                    active={route().current("home")}
                                    href='/'
                                >
                                    Beranda
                                </NavLink>
                                <NavLink
                                    href={route('syarat-donor')}
                                    active={route().current("syarat-donor")}
                                >
                                    Syarat Donor
                                </NavLink>

                                <NavLink
                                    href={route('event-donor')}
                                    active={route().current("event-donor")}
                                >
                                    Even Donor
                                </NavLink>
                                
                                {/* <NavLink active={route().current('donor')}>
                                    Daftar Permintaan Darah
                                </NavLink> */}
                                {auth.user ? (
                                    <NavLink>
                                        <DropdownMenu
                                            label={auth.user.name}
                                            className={"text-white"}
                                        >
                                            <DropdownMenu.ItemLink
                                            href={route('dashboard')}
                                            >
                                                Dashboard
                                            </DropdownMenu.ItemLink>
                                            <DropdownMenu.ItemLink
                                            href={route('setting')}
                                            >
                                                Setting
                                            </DropdownMenu.ItemLink>
                                            <DropdownMenu.ItemLink
                                            href={route('logout')}
                                            >
                                                Logout
                                            </DropdownMenu.ItemLink>
                                        </DropdownMenu>
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
                </div>
            </nav>
        </div>
    );
}
