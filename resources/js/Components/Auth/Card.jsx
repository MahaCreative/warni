import clsx from "clsx";
import React from "react";

export default function Card({ className, children, ...props }) {
    return (
        <div
            {...props}
            className={clsx(
                className,
                "rounded-lg shadow-md shadow-gray-900 py-1.5 px-4 flex justify-between backdrop-blur-md bg-gray-900/20 border border-dashed border-gray-400/50 "
            )}
        >
            {children}
        </div>
    );
}
