import React from "react";
import Backend from "../../../Layouts/Backend";
import Form from "./Form";

export default function Setting({ user }) {
    console.log(user);
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-[95%] md:w-[80%] lg:w-1/2">
                <div className="text-white">
                    <h1 className="font-roboto text-2xl font-semibold">
                        Hy { user.name}
                    </h1>
                    <p>
                        Silahkan isikan data baru anda, biarkan kosong jika tidak ingin merubah data
                    </p>
                </div>
                <div className="rounded-lg shadow-sm shadow-gray-400/50 py-2.5 px-4 bg-white w-full">
                    <Form />
                </div>
            </div>
        </div>
    );
}
Setting.layout = (page) => <Backend children={page} />;
