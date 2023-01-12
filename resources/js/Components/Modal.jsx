import clsx from "clsx";
import React, { useState } from "react";

export default function Modal({
    className,
    headerTitle,
    children,
    trigger,
    closeModal,
    size,
}) {
    return (
        <div
            ref={trigger}
            className={
                "hidden  w-full flex overflow-hidden h-screen px-8 md:px-16 bg-gray-900/30 backdrop-blur-sm fixed z-10 top-0 left-0 justify-center items-center duration-300 ease-linear transition"
            }
        >
            <div
                className={clsx(
                    size ? size : "w-[90%] md:w-[75%] lg:w-[50%]",
                    className ? className : "bg-white",
                    " duration-300 ease-in-out transition origin-left rounded-lg overflow-hidden"
                )}
            >
                <div className={className}>
                    <div className="flex justify-between items-center px-4 py-2.5 border-b border-emerald-300">
                        <div className="">{headerTitle}</div>
                        <div
                            className="hover:cursor-pointer hover:bg-slate-400 hover:p-2 rounded-lg"
                            onClick={() => closeModal()}
                        >
                            X
                        </div>
                    </div>
                    <div className="px-4 py-2.5">{children}</div>
                </div>
            </div>
        </div>
    );
}
