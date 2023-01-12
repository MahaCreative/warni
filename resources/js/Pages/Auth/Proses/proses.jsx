import { usePage } from '@inertiajs/inertia-react';
import React from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';
import Backend from '../../../Layouts/Backend';
import Create from './Create';

export default function proses(registrasi) {
    return (
        <div className='px-3 py-3'>
            <Breadcrumb active={route().current('admin/registrasi-donor')}>
                Registrasi Donor
            </Breadcrumb>
            <div className='flex flex-col md:flex-row gap-x-3'>
                <div className='md:w-[70%] w-[100%]'>
                    <div className='flex flex-col md:flex-row  justify-between md:items-center text-white my-3 px-6'>
                        <p>Kode Registrasi :{registrasi[1].kode_registrasi}</p>
                        <p>Tanggal Registrasi:{registrasi[1].created_at}</p>
                    </div>
                    <form action='' className='px-3'>
                        <div className='flex flex-col gap-y-3 px-3 py-3'>
                            <div className='flex flex-col gap-y-3'>
                                <div>
                                    <Input
                                        disabled
                                        className='disabled:bg-white'
                                        placeholder='Nama Lengkap'
                                        name='nama'
                                        value={
                                            registrasi[1].user
                                                ? registrasi[1].profile.nama
                                                : registrasi[1].pendonor.nama
                                        }
                                    />
                                </div>
                                <div>
                                    <Input
                                        disabled
                                        className='disabled:bg-white'
                                        type='email'
                                        value={
                                            registrasi[1].user
                                                ? registrasi[1].profile.email
                                                : registrasi[1].pendonor.email
                                        }
                                        name='email'
                                    />
                                </div>
                                <div className='flex flex-col md:flex-row gap-2'>
                                    <div>
                                        <Input
                                            disabled
                                            className='disabled:bg-white'
                                            placeholder='Tempat Lahir'
                                            name='tempat_lahir'
                                            value={
                                                registrasi[1].user
                                                    ? registrasi[1].profile
                                                          .tempat_lahir
                                                    : registrasi[1].pendonor
                                                          .tempat_lahir
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            disabled
                                            className='disabled:bg-white'
                                            type='date'
                                            value={
                                                registrasi[1].user
                                                    ? registrasi[1].profile
                                                          .tanggal_lahir
                                                    : registrasi[1].pendonor
                                                          .tanggal_lahir
                                            }
                                            name='tanggal_lahir'
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            disabled
                                            className='disabled:bg-white'
                                            value={
                                                registrasi[1].user
                                                    ? registrasi[1].profile
                                                          .jenis_kelamin
                                                    : registrasi[1].pendonor
                                                          .jenis_kelamin
                                            }
                                            name='telp'
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <Input
                                            disabled
                                            className='disabled:bg-white'
                                            value={
                                                registrasi[1].user
                                                    ? registrasi[1].profile.telp
                                                    : registrasi[1].pendonor
                                                          .telp
                                            }
                                            name='telp'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <textarea
                                        disabled
                                        name='alamat'
                                        value={
                                            registrasi[1].user
                                                ? registrasi[1].profile.alamat
                                                : registrasi[1].pendonor.alamat
                                        }
                                        className='disabled:bg-white py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                                    ></textarea>
                                </div>

                                <div className='flex flex-col gap-y-3'>
                                    <div className='flex flex-col md:flex-row gap-2'>
                                        <div>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                value={
                                                    registrasi[1].user
                                                        ? registrasi[1].profile
                                                              .pekerjaan
                                                        : registrasi[1].pendonor
                                                              .pekerjaan
                                                }
                                                name='pekerjaan'
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                value={
                                                    registrasi[1].user
                                                        ? registrasi[1].profile
                                                              .riwayat_penyakit
                                                        : registrasi[1].pendonor
                                                              .riwayat_penyakit
                                                }
                                                name='riwayat_penyakit'
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                type='number'
                                                value={
                                                    registrasi[1].user
                                                        ? registrasi[1].profile
                                                              .berat_badan
                                                        : registrasi[1].pendonor
                                                              .berat_badan
                                                }
                                                name='berat_badan'
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                type='number'
                                                value={
                                                    registrasi[1].user
                                                        ? registrasi[1].profile
                                                              .tinggi_badan
                                                        : registrasi[1].pendonor
                                                              .tinggi_badan
                                                }
                                                name='tinggi_badan'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Input
                                            disabled
                                            className='disabled:bg-white'
                                            type='text'
                                            placeholder='Golongan Darah'
                                            value={
                                                registrasi[1].user
                                                    ? registrasi[1].profile
                                                          .darah.golongan_darah
                                                    : registrasi[1].pendonor
                                                          .darah.golongan_darah
                                            }
                                        />
                                    </div>

                                    <div className='flex flex-col md:flex-row gap-2'>
                                        <div>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                type='text'
                                                value={
                                                    registrasi[1]
                                                        .tanggal_donor_darah
                                                }
                                                name='tanggal_donor'
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                type='text'
                                                value={
                                                    registrasi[1]
                                                        .jam_donor_darah
                                                }
                                                name='jam_donor'
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <Input
                                                disabled
                                                className='disabled:bg-white'
                                                type='text'
                                                placeholder='Jenis Donor'
                                                value={
                                                    registrasi[1].jenis_donor
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Create registrasi={registrasi} />
            </div>
        </div>
    );
}
proses.layout = (page) => <Backend children={page} />;
