import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";
import React from "react";

export default function Button({ children, className, ...props }) {
    return (
        <button
            {...props}
            className={clsx(
                className ? className : "",
                "text-sm md:text-base justify-self-start py-1 px-2 md:py-2.5 md:px-4 border shadow-md shadow-gray-400/50 rounded-lg hover:cursor-pointer transition duration-300 ease-in font-bold"
            )}
        >
            {children}
        </button>
    );
}
