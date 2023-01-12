import React from "react";
import App from "../../../Layouts/App";
import Form from "./Form";

export default function Registrasi() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-[95%] md:w-[80%] lg:w-1/2">
                <div className="text-white">
                    <h1 className="font-roboto text-2xl font-semibold">
                        Selamat Datang, Di aplikasi Registrasi Donor
                    </h1>
                    <p>
                        Untuk dapat melakukan registrasi, anda perlu melakukan
                        registrasi terlebih dahulu, silahkan isikan data akun
                        anda dibawah ini!
                    </p>
                </div>
                <div className="rounded-lg shadow-sm shadow-gray-400/50 py-2.5 px-4 bg-white w-full">
                    <Form />
                </div>
            </div>
        </div>
    );
}
Registrasi.layout = (page) => <App children={page} />;
