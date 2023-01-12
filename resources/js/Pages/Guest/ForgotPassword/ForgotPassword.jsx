import { useForm } from "@inertiajs/inertia-react";
import React from "react";
import Button from "../../../Components/Button";
import App from "../../../Layouts/App";
import Input from "../../../Components/Input";
export default function ForgotPassword() {
    const { data, setData, post, errors } = useForm({ email: "" });
    const submitHandler = (e) => {
        e.preventDefault();
        post(route("forgot_password"));
    };
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-[95%] md:w-[80%] lg:w-1/2">
                <div className="text-white">
                    <h1 className="font-roboto text-2xl font-semibold">
                        Selamat Datang, Di aplikasi Registrasi Donor
                    </h1>
                    <p>
                        Silahkan masukkan email, dan tunggu email reset password
                        akan masuk ke email anda
                    </p>
                </div>
                <div className="rounded-lg shadow-sm shadow-gray-400/50 py-2.5 px-4 bg-white w-full">
                    <form action="" onSubmit={submitHandler}>
                        <div className="my-1.5">
                            <Input
                                placeholder={"Email"}
                                onChange={(e) =>
                                    setData({ ...data, email: e.target.value })
                                }
                            />
                            {errors.email && (
                                <Input.Error errors={errors.email} />
                            )}
                        </div>
                        <Button className={"bg-blue-400 my-1"} type="submit">
                            Reset password
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
ForgotPassword.layout = (page) => <App children={page} />;
