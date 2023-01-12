import React, { useRef } from "react";

export default function UseModal() {
    const modal = useRef(null);
    const open = () => {
        modal.current.classList.remove("hidden");
    };
    const close = () => {
        modal.current.classList.add("hidden");
    };
    return { modal, close, open };
}
