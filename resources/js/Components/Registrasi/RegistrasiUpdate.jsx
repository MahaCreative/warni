import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { Backdrop, CircularProgress } from "@mui/material";
export default function RegistrasiUpdate({ onClose, model, ...props }) {
    const { golongan } = usePage().props;
    const { data, setData, errors, put, reset } = useForm({
        model_id: "",
        email: "",
        nama: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        telp: "",
        alamat: "",
        jenis_kelamin: "",
        berat_badan: "",
        tinggi_badan: "",
        gol_darah: "",
        pekerjaan: "",
        riwayat_penyakit: "",
        tanggal_donor: "",
        jam_donor: "",
        jenis_donor: "",
    });
    useEffect(() => {
        setData({
            ...data,
            model_id: model.id,
            email: model.email,
            nama: model.nama,
            tempat_lahir: model.tempat_lahir,
            tanggal_lahir: model.tanggal_lahir,
            telp: model.telp,
            alamat: model.alamat,
            jenis_kelamin: model.jenis_kelamin,
            berat_badan: model.berat_badan,
            tinggi_badan: model.tinggi_badan,
            gol_darah: model.gol_darah,
            pekerjaan: model.pekerjaan,
            riwayat_penyakit: model.riwayat_penyakit,
            tanggal_donor: model.tanggal_donor_darah,
            jam_donor: model.jam_donor_darah,
            jenis_donor: model.jenis_donor,
        });
    }, [model]);
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        put(route("registrasi-donor-update", data.model_id), {
            onStart: () => handleToggle(true),
            onError: () => handleClose(),
            onFinish: () => handleClose(),
        });
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (e) => {
        setOpen(e);
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
            <form action="" onSubmit={submitHandler}>
                <div>
                    <div className="flex flex-col px-3 py-3">
                        <div className="flex flex-col">
                            <div>
                                <Input.Label clasName={"text-sm"}>
                                    Nama Lengkap
                                </Input.Label>
                                <Input
                                    onChange={onChange}
                                    placeholder="Nama Lengkap"
                                    name="nama"
                                    value={data.nama}
                                />
                                {errors && <Input.Error errors={errors.nama} />}
                            </div>
                            <div>
                                <Input.Label clasName={"text-sm"}>
                                    Email
                                </Input.Label>
                                <Input
                                    onChange={onChange}
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={data.email}
                                />
                                {errors && (
                                    <Input.Error errors={errors.email} />
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                                <div>
                                    <Input.Label clasName={"text-sm"}>
                                        Tempat Lahir
                                    </Input.Label>
                                    <Input
                                        onChange={onChange}
                                        placeholder="Tempat Lahir"
                                        name="tempat_lahir"
                                        value={data.tempat_lahir}
                                    />
                                    {errors && (
                                        <Input.Error
                                            errors={errors.tempat_lahir}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Input.Label clasName={"text-sm"}>
                                        Tanggal Lahir
                                    </Input.Label>
                                    <Input
                                        onChange={onChange}
                                        type="date"
                                        placeholder="Tanggal Lahir"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                    />
                                    {errors && (
                                        <Input.Error
                                            errors={errors.tanggal_lahir}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Input.Label clasName={"text-sm"}>
                                        Jenis Kelamin
                                    </Input.Label>
                                    <select
                                        onChange={onChange}
                                        className="w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600"
                                        placeholder="Select Jenis Kelamin"
                                        name="jenis_kelamin"
                                    >
                                        <option
                                            value={data.tanggal_lahir}
                                            selected
                                            disabled
                                        >
                                            {data.tanggal_lahir}
                                        </option>
                                        <option value="laki-laki">
                                            Laki-Laki
                                        </option>
                                        <option value="perempuan">
                                            Perempuan
                                        </option>{" "}
                                    </select>
                                    {errors && (
                                        <Input.Error
                                            errors={errors.jenis_kelamin}
                                        />
                                    )}
                                </div>
                                <div className="w-full">
                                    <Input.Label clasName={"text-sm"}>
                                        Telp
                                    </Input.Label>
                                    <Input
                                        onChange={onChange}
                                        placeholder="Telp"
                                        name="telp"
                                        value={data.telp}
                                    />{" "}
                                    {errors && (
                                        <Input.Error errors={errors.telp} />
                                    )}
                                </div>
                            </div>

                            <div>
                                <Input.Label clasName={"text-sm"}>
                                    Alamat
                                </Input.Label>
                                <textarea
                                    onChange={onChange}
                                    name="alamat"
                                    placeholder="Alamat"
                                    value={data.alamat}
                                    className="py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600"
                                ></textarea>
                                {errors && (
                                    <Input.Error errors={errors.alamat} />
                                )}
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <div className="grid 1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                                    <div>
                                        <Input.Label clasName={"text-sm"}>
                                            Pekerjaan
                                        </Input.Label>
                                        <Input
                                            onChange={onChange}
                                            placeholder="Pekerjaan"
                                            name="pekerjaan"
                                            value={data.pekerjaan}
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.pekerjaan}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <Input.Label clasName={"text-sm"}>
                                            Riwayat Penyakit
                                        </Input.Label>
                                        <Input
                                            onChange={onChange}
                                            placeholder="Riwayat Penyakit"
                                            name="riwayat_penyakit"
                                            value={data.riwayat_penyakit}
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.riwayat_penyakit}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <Input.Label clasName={"text-sm"}>
                                            Berat Badan
                                        </Input.Label>
                                        <Input
                                            onChange={onChange}
                                            type="number"
                                            placeholder="Berat Badan"
                                            name="berat_badan"
                                            value={data.berat_badan}
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.berat_badan}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <Input.Label clasName={"text-sm"}>
                                            Tinggi Badan
                                        </Input.Label>
                                        <Input
                                            onChange={onChange}
                                            type="number"
                                            placeholder="Tinggi Badan"
                                            name="tinggi_badan"
                                            value={data.tinggi_badan}
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.tinggi_badan}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <Input.Label clasName={"text-sm"}>
                                        Golongan Darah
                                    </Input.Label>
                                    <select
                                        onChange={onChange}
                                        className="w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600"
                                        placeholder="Select Golongan Darah"
                                        name="gol_darah"
                                    >
                                        <option
                                            value={data.gol_darah}
                                            selected
                                            disabled
                                        >
                                            {model.golongan_darah}
                                        </option>
                                        {golongan
                                            ? golongan[0].map((item) => (
                                                  <option
                                                      key={item.id}
                                                      value={item.id}
                                                  >
                                                      {item.golongan_darah}
                                                  </option>
                                              ))
                                            : " "}
                                    </select>
                                    {errors && (
                                        <Input.Error
                                            errors={errors.gol_darah}
                                        />
                                    )}
                                </div>
                                {/* {errors && (<div className='text-red-600 text-sm italic'>{errors.golongan_darah}</div>)} */}
                                <div className="grid 1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                                    <div>
                                        <Input.Label clasName={"text-sm"}>
                                            Request Tanggal Donor
                                        </Input.Label>
                                        <Input
                                            onChange={onChange}
                                            type="date"
                                            placeholder="Tanggal Order Donor"
                                            name="tanggal_donor"
                                            value={data.tanggal_donor}
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.tanggal_donor}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <Input.Label clasName={"text-sm"}>
                                            Request Jam Donor
                                        </Input.Label>
                                        <Input
                                            onChange={onChange}
                                            type="time"
                                            placeholder="Waktu Order Donor"
                                            name="jam_donor"
                                            value={data.jam_donor}
                                        />
                                        {errors && (
                                            <Input.Error
                                                errors={errors.jam_donor}
                                            />
                                        )}
                                    </div>
                                    <div className="w-full">
                                        <Input.Label clasName={"text-sm"}>
                                            Jenis Donor Darah
                                        </Input.Label>
                                        <select
                                            onChange={onChange}
                                            className="w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600"
                                            placeholder="Jenis Donor Darah"
                                            name="jenis_donor"
                                        >
                                            <option value={data.jenis_donor}>
                                                {data.jenis_donor}
                                            </option>
                                            <option value="sukarela">
                                                Sukarela
                                            </option>
                                            <option value="bayaran">
                                                Bayaran
                                            </option>
                                            <option value="pengganti">
                                                Pengganti
                                            </option>
                                        </select>
                                        {errors && (
                                            <Input.Error
                                                errors={errors.jenis_donor}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button type="submit" className={"text-white bg-green-500"}>
                        Update Registrasi
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onClose()}
                        className={"text-white bg-red-500"}
                    >
                        Cancell
                    </Button>
                </div>
            </form>
        </div>
    );
}
