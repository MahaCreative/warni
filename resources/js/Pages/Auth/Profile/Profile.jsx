import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Profile({ user, golDar }) {
    let golongan_darah = '';
    // console.log(user[0].profile.id);
    if (user[0].profile) {
        if (user[0].profile.gol_darah == 1) {
            golongan_darah = 'A';
        } else if (user[0].profile.gol_darah == 2) {
            golongan_darah = 'A+';
        } else if (user[0].profile.gol_darah == 3) {
            golongan_darah = 'B';
        } else if (user[0].profile.gol_darah == 4) {
            golongan_darah = 'B+';
        } else if (user[0].profile.gol_darah == 5) {
            golongan_darah = 'AB';
        } else if (user[0].profile.gol_darah == 6) {
            golongan_darah = 'AB+';
        } else if (user[0].profile.gol_darah == 7) {
            golongan_darah = 'O';
        } else if (user[0].profile.gol_darah == 8) {
            golongan_darah = 'O+';
        }
    }
    const { data, setData, put, post, reset, errors } = useForm({
        id: user[0].profile ? user[0].profile.id : '',
        nama: user[0].profile ? user[0].profile.nama : '',
        tempat_lahir: user[0].profile ? user[0].profile.tempat_lahir : '',
        tanggal_lahir: user[0].profile ? user[0].profile.tanggal_lahir : '',
        jenis_kelamin: user[0].profile ? user[0].profile.jenis_kelamin : '',
        telp: user[0].profile ? user[0].profile.telp : '',
        alamat: user[0].profile ? user[0].profile.alamat : '',
        pekerjaan: user[0].profile ? user[0].profile.pekerjaan : '',
        riwayat_penyakit: user[0].profile
            ? user[0].profile.riwayat_penyakit
            : '',
        berat_badan: user[0].profile ? user[0].profile.berat_badan : '',
        tinggi_badan: user[0].profile ? user[0].profile.tinggi_badan : '',
        golongan_darah: user[0].profile ? user[0].profile.golongan_darah : '',
    });
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const updateHandler = () => {
        put(route('profile'));
    };
    const submitHandler = () => {
        post(route('profile'));
    };
    return (
        <form action=''>
            <div className='flex flex-col gap-y-3'>
                <Input
                    hidden
                    placeholder='Nama Lengkap'
                    name='id'
                    id='nama'
                    defaultValue={user[0].profile ? user[0].profile.id : ''}
                    onChange={onChange}
                />
                <Input
                    placeholder='Nama Lengkap'
                    name='nama'
                    id='nama'
                    defaultValue={user[0].profile ? user[0].profile.nama : ''}
                    onChange={onChange}
                />
                {errors.nama && <Input.Error errors={errors.nama} />}
                <div className='flex flex-col md:flex-row gap-2'>
                    <Input
                        placeholder='Tempat Lahir'
                        name='tempat_lahir'
                        defaultValue={
                            user[0].profile ? user[0].profile.tempat_lahir : ''
                        }
                        onChange={onChange}
                    />
                    {errors.tempat_lahir && (
                        <Input.Error errors={errors.tempat_lahir} />
                    )}
                    <Input
                        placeholder='Tanggal Lahir'
                        name='tanggal_lahir'
                        type='date'
                        defaultValue={
                            user[0].profile ? user[0].profile.tanggal_lahir : ''
                        }
                        onChange={onChange}
                    />
                    {errors.tanggal_lahir && (
                        <Input.Error errors={errors.tanggal_lahir} />
                    )}
                </div>
                <select
                    className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    placeholder='Select Jenis Kelamin'
                    name='jenis_kelamin'
                    onChange={onChange}
                >
                    <option disabled>Select Jenis Kelamin</option>
                    <option value='laki-laki'>Laki-Laki</option>
                    <option value='perempuan'>Perempuan</option>
                </select>
                {errors.jenis_kelamin && (
                    <Input.Error errors={errors.jenis_kelamin} />
                )}
                {/* {errors && (<div className='text-red-600 text-sm italic'>{errors.jenis_kelamin}</div>)} */}
                <Input
                    placeholder='Telp'
                    name='telp'
                    defaultValue={user[0].profile ? user[0].profile.telp : ''}
                    onChange={onChange}
                />
                {errors.telp && <Input.Error errors={errors.telp} />}
                <textarea
                    onChange={onChange}
                    name='alamat'
                    placeholder='Alamat'
                    className='py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                >
                    {user[0].profile ? user[0].profile.alamat : ''}
                </textarea>
                {errors.alamat && <Input.Error errors={errors.alamat} />}

               
                <div className='flex'>
                            <Button
                                onClick={
                                    user[0].profile
                                        ? updateHandler
                                        : submitHandler
                                }
                                className={'bg-blue-500 text-white'}
                            >
                                {user[0].profile ? 'Update' : 'submit'}
                            </Button>
                        </div>
            </div>
        </form>
    );
}
