import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Guest from '../../../Layouts/Backend';

import CKEDITOR from '../../../Components/CKEDITOR';
import { Inertia } from '@inertiajs/inertia';
import { Backdrop, CircularProgress } from '@mui/material';
export default function EventUpdate({ event }) {
    const input = useRef();
    const [loading, setLoading] = useState(false);
    const { data, setData, patch, errors, reset, progress } = useForm({
        id: "",
        judul: "",
        tanggal_mulai: "",
        tanggal_berakhir: "",
        penyelenggara: "",
        thumbnail: "",
        kontent: "",
    });
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHanler = (e) => {
        e.preventDefault();
        Inertia.post(route("event-update-patch", data.id), {
            _method: "patch",
            data: data,
            thumbnail: data.thumbnail,
            onStart: () => handleToggle(true),
            onError: () => handleClose(),
            onFinish: () => {handleClose(), reset()},
            
        });
    };

    useEffect(() => {
        setData({
            ...data,
            id: event.id,
            judul: event.judul,
            tanggal_mulai: event.tanggal_mulai,
            tanggal_berakhir: event.tanggal_berakhir,
            penyelenggara: event.penyelenggara,
            thumbnail: event.thumbnail,
            kontent: event.kontent,
        });
    }, [event]);

    // useEffect(() => {}, )
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (e) => {
        setOpen(e);
    };
    return (
        <div className='px-3 py-3 min-h-screen'>
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
            <Breadcrumb >
                Event Donor
            </Breadcrumb>
            <div>
            <div className="border border-emerald-400 py-4 px-4 grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-y-auto min-h-[80%] items-start rounded-lg">
                <div className="">
                    {errors && (
                        <p className="text-red-500 italic">{errors.kontent}</p>
                    )}
                    <div>
                        <label
                            htmlFor=""
                            className="text-base text-emerald-400 my-1.5"
                        >
                            Kontent
                        </label>
                        <CKEDITOR
                            style={"height:900px;"}
                            handleChange={(e) => {
                                setData({ ...data, kontent: e });
                            }}
                            data={event.kontent}
                        />
                    </div>
                </div>
                <div>
                    <form
                        action=""
                        onSubmit={submitHanler}
                        encType={"multipart/form-data"}
                    >
                        <label
                            htmlFor="judul"
                            className="text-base text-emerald-400 my-1.5"
                        >
                            Judul Event
                        </label>
                        <input
                            defaultValue={data.judul}
                            ref={input}
                            onChange={changeHandler}
                            name="judul"
                            className=" my-1.5 w-full rounded-md border border-emerald-500 text-emerald-400 font-fira px-4 py-1.5 outline-none focus:ring focus:ring-emerald-400/30 "
                            type={"text"}
                            placeholder="Judul Event"
                        />
                        {errors && (
                            <p className="text-red-500 italic">
                                {errors.judul}
                            </p>
                        )}
                        <label
                            htmlFor="tanggal_mulai"
                            className="text-base text-emerald-400 my-1.5"
                        >
                            Tanggal Mulai Event
                        </label>
                        <input
                            defaultValue={data.tanggal_mulai}
                            ref={input}
                            onChange={changeHandler}
                            name="tanggal_mulai"
                            className=" my-1.5 w-full rounded-md border border-emerald-500 text-emerald-400 font-fira px-4 py-1.5 outline-none focus:ring focus:ring-emerald-400/30 "
                            type={"date"}
                        />
                        {errors && (
                            <p className="text-red-500 italic">
                                {errors.tanggal_mulai}
                            </p>
                        )}
                        <label
                            htmlFor="tanggal_berakhir"
                            className="text-base text-emerald-400 my-1.5"
                        >
                            Tanggal Berakhir
                        </label>
                        <input
                            defaultValue={data.tanggal_berakhir}
                            ref={input}
                            onChange={changeHandler}
                            name="tanggal_berakhir"
                            className=" my-1.5 w-full rounded-md border border-emerald-500 text-emerald-400 font-fira px-4 py-1.5 outline-none focus:ring focus:ring-emerald-400/30 "
                            type={"date"}
                        />
                        {errors && (
                            <p className="text-red-500 italic">
                                {errors.tanggal_berakhir}
                            </p>
                        )}
                        <label
                            htmlFor="penyelenggara"
                            className="text-base text-emerald-400 my-1.5"
                        >
                            Penyelenggara
                        </label>
                        <input
                            defaultValue={data.penyelenggara}
                            ref={input}
                            onChange={changeHandler}
                            name="penyelenggara"
                            className=" my-1.5 w-full rounded-md border border-emerald-500 text-emerald-400 font-fira px-4 py-1.5 outline-none focus:ring focus:ring-emerald-400/30 "
                            type={"text"}
                            placeholder="Penyelenggara"
                        />
                        {errors && (
                            <p className="text-red-500 italic">
                                {errors.penyelenggara}
                            </p>
                        )}
                        <label
                            htmlFor="thumbnail"
                            className="text-base text-emerald-400 my-1.5"
                        >
                            Thumbnail
                        </label>
                        <input
                            ref={input}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    thumbnail: e.target.files[0],
                                })
                            }
                            name="thumbnail"
                            className=" my-1.5 w-full rounded-md border border-emerald-500 text-emerald-400 font-fira px-4 py-1.5 outline-none focus:ring focus:ring-emerald-400/30 "
                            type={"file"}
                            placeholder="Thumbnail"
                        />
                        {errors && (
                            <p className="text-red-500 italic">
                                {errors.thumbnail}
                            </p>
                        )}
                        <div className="flex gap-3 my-4">
                            <button
                                type="submit"
                                className="rounded-md bg-blue-500 text-white font-fira px-4 py-1.5"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-red-500 text-white font-fira px-4 py-1.5"
                            >
                                Cancell
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    );
}
EventUpdate.layout = (page) => <Guest children={page} />;
