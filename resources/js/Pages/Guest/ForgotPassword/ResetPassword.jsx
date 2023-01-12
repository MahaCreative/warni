import React from "react";
import App from "../../../Layouts/App";
import Form from "./Form";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-[95%] md:w-[80%] lg:w-1/2">
                <div className="text-white">
                    <h1 className="font-roboto text-2xl font-semibold">
                        Selamat Datang, Di aplikasi Registrasi Donor
                    </h1>
                    <p>
                        Hy user silahkan masukkan email dan password baru anda
                    </p>
                </div>
                <div className="rounded-lg shadow-sm shadow-gray-400/50 py-2.5 px-4 bg-white w-full">
                    <Form />
                </div>
            </div>
        </div>
    );
}
Login.layout = (page) => <App children={page} />;
