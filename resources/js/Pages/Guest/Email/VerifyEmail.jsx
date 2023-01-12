import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Button from "../../../Components/Button";
import Input from "../../../Components/Input";
import App from "../../../Layouts/App";
import Form from "../Login/Form";

export default function Login() {
    const { data, setData, get } = useForm({ email: "" });
    const submitHandler = (e) => {
        e.preventDefault();
        get(route("resend"));
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-[95%] md:w-[80%] lg:w-1/2">
                <div className="text-white">
                    <h1 className="font-roboto text-2xl font-semibold">
                        Selamat Datang, Di aplikasi Registrasi Donor
                    </h1>
                    <p>
                        Silahkan lakukan verifiksi diri anda melalui email yang
                        telah kami kirimkan
                    </p>
                </div>
                <div className="rounded-lg shadow-sm shadow-gray-400/50 py-2.5 px-4 bg-white w-full">
                    <form action="" onSubmit={submitHandler}>
                        <div className="my-1.5"></div>
                        <Button className={"bg-blue-400 my-1"} type="submit">
                            Resend Email
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
Login.layout = (page) => <App children={page} />;
