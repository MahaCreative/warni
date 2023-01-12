import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Create({ registrasi }) {
    const { auth } = usePage().props;

    const { data, setData, errors, post, reset } = useForm({
        registrasi_id: registrasi[1].id,
        petugas: auth.user.name,
        jumlah_darah: '',
        tekanan_darah: '',
        status: '',
        keterangan: '',
    });
    console.log(auth);
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = () => {
        post(route('store-proses-registrasi'));
    };
    return (
        <div className='md:w-[30%] w-[100%] h-screen bg-slate-800 px-3'>
            <div className='flex flex-col md:flex-row  justify-between md:items-center text-white my-3'>
                <p>Masukkan Keterangan</p>
            </div>
            <div>
                <p className='text-white'>Petugas Yang Menangani: </p>
                <Input
                    onChange={onChange}
                    defaultValue={auth.user.name}
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
                    />
                    {errors && <Input.Error errors={errors.tekanan_darah} />}
                </div>
            </div>
            <div className='my-3'>
                <p className='text-white'>Status Proses: </p>
                <select
                    onChange={onChange}
                    className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    placeholder='Select Jenis Kelamin'
                    name='status'
                >
                    <option defaultValue={''}>Select Status</option>
                    <option value='berhasil'>Berhasil</option>
                    <option value='gagal'>Gagal</option>{' '}
                </select>
                {errors && <Input.Error errors={errors.status} />}
            </div>
            <div className='my-3'>
                <p className='text-white'>Keterangan: </p>
                <textarea
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
