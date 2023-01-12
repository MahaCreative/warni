import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";
import React from "react";

export default function NavLink({
    className,
    active = false,
    children,
    ...props
}) {
    return (
        <Link
            className={clsx(
                active && "py-1.5 px-4 rounded-lg shadow-sm shadow-gray-300/50",
                className ? className : "",
                "text-white capitalize hover:bg-gray-700 py-1.5 px-4 rounded-lg hover:shadow-sm hover:shadow-gray-400/50 duration-300 ease-in transition"
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
