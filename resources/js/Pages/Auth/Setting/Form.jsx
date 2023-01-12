import React, { useState } from "react";
import Input from "../../../Components/Input";
import Button from "../../../Components/Button";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Backdrop, CircularProgress } from "@mui/material";
import { Inertia } from "@inertiajs/inertia";
export default function Form() {
    const { data, setData, put, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        remember: "",
    });
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (e) => {
        setOpen(e);
    };

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        // handleToggle()
        put(route("setting-put"), {
            onStart: () => handleToggle(true),
            onError: () => handleClose(),
            onFinish: () => handleClose(),
        });
        // Inertia.post(route('login'), )
    };
    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form method="post" action="" onSubmit={submitHandler}>
                <div className="">
                    <Input.Label htmlFor="">Name</Input.Label>
                    <Input
                        onChange={changeHandler}
                        placeholder="User Name"
                        name="name"
                        type="text"
                        isFocused={true}
                    />
                    {errors.name && <Input.Error errors={errors.name} />}
                </div>
                <div className="">
                    <Input.Label htmlFor="">Email</Input.Label>
                    <Input
                        onChange={changeHandler}
                        placeholder="Email"
                        name="email"
                        type="email"
                        isFocused={true}
                    />
                    {errors.email && <Input.Error errors={errors.email} />}
                </div>
                <div className="">
                    <Input.Label htmlFor="">Password</Input.Label>
                    <Input
                        onChange={changeHandler}
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    {errors.password && (
                        <Input.Error errors={errors.password} />
                    )}
                </div>
                <div className="">
                    <Input.Label htmlFor="">Password Confirmation</Input.Label>
                    <Input
                        onChange={changeHandler}
                        placeholder="password_confirmation"
                        name="password_confirmation"
                        type="password"
                    />
                    {errors.password_confirmation && (
                        <Input.Error errors={errors.password_confirmation} />
                    )}
                </div>
                <div className="flex gap-3">
                    <input type="checkbox" className="" name="remember" />
                    <Input.Label htmlFor="">Remember me</Input.Label>
                </div>
                <div className="flex gap-3 items-center">
                    <Button
                        type={"submit"}
                        className={"bg-blue-400 text-white"}
                    >
                        Register
                    </Button>
                    <div>
                        <Link
                            href={route("login")}
                            className="text-blue-400 text-sm font-montserat block"
                        >
                            Click disini jika anda sudah punya akun?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
