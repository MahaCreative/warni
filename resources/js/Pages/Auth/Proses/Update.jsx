import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Update({ model }) {
    const { auth } = usePage().props;
    console.log(model.tekanan_darah);
    const { data, setData, errors, patch, reset } = useForm({
        model_id: model.id,
        petugas: model.nama_petugas,
        jumlah_darah: model.jumlah_darah,
        tekanan_darah: model.tekanan_darah,
        status: model.status,
        keterangan: model.keterangan,
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = () => {
        patch(route('update-proses-registrasi', model.id));
    };
    useEffect(() => {
        setData({
            ...data,
            model_id: model.id,
            petugas: model.nama_petugas,
            jumlah_darah: model.jumlah_darah,
            tekanan_darah: model.tekanan_darah,
            status: model.status,
            keterangan: model.keterangan,
        });
    }, [model]);
    return (
        <div className='w-full'>
            <div className='flex flex-col md:flex-row  justify-between md:items-center text-white my-3'>
                <p>Masukkan Keterangan</p>
            </div>
            <div>
                <p className='text-white'>Petugas Yang Menangani: </p>
                <Input
                    onChange={onChange}
                    defaultValue={data.petugas}
                    placeholder='Petugas'
                    name='petugas'
                />
                {errors && <Input.Error errors={errors.petugas} />}
            </div>
            <div className='flex md:flex-row flex-col gap-3 '>
                <div>
                    <p className='text-white'>Jumlah Darah: </p>
                    <Input
                        onChange={onChange}
                        type='number'
                        placeholder='Jumlah Darah'
                        name='jumlah_darah'
                        defaultValue={model.jumlah_darah}
                        min={1} max={5}
                    />
                    {errors && <Input.Error errors={errors.jumlah_darah} />}
                </div>
                <div>
                    <p className='text-white'>Tekanan Darah: </p>
                    <Input
                        onChange={onChange}
                        placeholder='Tekanan Darah'
                        name='tekanan_darah'
                        defaultValue={model.tekanan_darah}
                    />
                    {errors && <Input.Error errors={errors.tekanan_darah} />}
                </div>
            </div>
            <div className='my-3'>
                <p className='text-white'>Status model: </p>
                <select
                    onChange={onChange}
                    className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    placeholder='Select Jenis Kelamin'
                    name='status'
                >
                    <option defaultValue={model.status}>{model.status}</option>
                    <option value='berhasil'>Berhasil</option>
                    <option value='gagal'>Gagal</option>{' '}
                </select>
                {errors && <Input.Error errors={errors.status} />}
            </div>
            <div className='my-3'>
                <p className='text-white'>Keterangan: </p>
                <textarea
                    defaultValue={model.keterangan}
                    onChange={onChange}
                    name='keterangan'
                    placeholder='Keterangan'
                    className='py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                ></textarea>
                {errors && <Input.Error errors={errors.Keterangan} />}
            </div>
            <Button
                onClick={submitHandler}
                className={
                    'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                }
            >
                Submit
            </Button>
        </div>
    );
}
