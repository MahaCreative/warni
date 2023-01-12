import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";
import React from "react";

export default function Breadcrumb({ active, children, ...props }) {
    return (
        <div className="flex gap-x-3 border-b border-dashed border-gray-500/50 py-1.5  items-center">
            <Link
                // href={route('dashboard')}
                className="text-white hover:text-white/80"
            >
                Dashboard{" "}
            </Link>
            <p className="text-white">/</p>
            <Link
                {...props}
                className={clsx(
                    active
                        ? "border border-dashed bg-gray-900 rounded-lg border-gray-400/50 px-4"
                        : "",
                    "text-white hover:text-white/80"
                )}
            >
                {children}
            </Link>
        </div>
    );
}
