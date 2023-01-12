import clsx from "clsx";
import React, { useEffect, useRef } from "react";

function Input({ isFocused, className, errors, ...props }) {
    const input = useRef();
    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
    return (
        <>
            <input
                {...props}
                className={clsx(
                    className ? className : "",
                    " px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-blue-400 border border-dashed border-blue-400 focus:outline-none placeholder:text-blue-400 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full"
                )}
                ref={input}
            />
        </>
    );
}
function Error({ classError, errors }) {
    return (
        <div
            className={clsx(
                classError ? classError : "text-white",
                "text-sm italic text-red-600"
            )}
        >
            {errors}
        </div>
    );
}
function Label({ children, clasName }) {
    return (
        <>
            <label
                htmlFor=""
                className={clsx(
                    clasName,
                    "text-blue-400 font-montserat font-light"
                )}
            >
                {children}
            </label>
        </>
    );
}
Input.Error = Error;
Input.Label = Label;
export default Input;
