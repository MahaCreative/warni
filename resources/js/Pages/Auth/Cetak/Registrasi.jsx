import { usePage } from '@inertiajs/inertia-react';
import moment from 'moment';
import React from 'react';
import Table from '../../../Components/Table';
import Cetak from '../../../Layouts/Cetak';

export default function Registrasi() {
    const { registrasi } = usePage().props
    
    return <div>
        <Table className=' bg-white'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Registrasi</Table.Th>
                            <Table.Th>Tanggal Registrasi</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Golongan_darah</Table.Th>
                            <Table.Th className={'text-center'}>
                                <p>Status Donor</p> <p>Jenis Donor</p>
                            </Table.Th>
                            <Table.Th>Waktu Order Donor</Table.Th>
                            <Table.Th>Nama Petugas</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {registrasi.map((item) => (
                            <tr key={item.id} className='odd:hover:bg-gray-100'>
                                <Table.Td>{item.kode_registrasi}</Table.Td>
                                <Table.Td>
                                    {' '}
                                    {moment(item.created_at).format(
                                        'DD-MMMM-YYYY'
                                    )}
                                </Table.Td>
                                <Table.Td> {item.nama} </Table.Td>
                                <Table.Td> {item.golongan_darah} </Table.Td>
                                {(() => {
                                    if (item.status_donor === 'verifikasi') {
                                        return (
                                            <Table.Td className=' capitalize text-center'>
                                                {' '}
                                                <p className='text-orange-600'>
                                                    {item.status_donor}
                                                </p>{' '}
                                                <p>{item.jenis_donor}</p>{' '}
                                            </Table.Td>
                                        );
                                    } else if (item.status_donor === 'gagal') {
                                        return (
                                            <Table.Td className='text-center capitalize'>
                                                {' '}
                                                <p className='text-red-500'>
                                                    {item.status_donor}
                                                </p>{' '}
                                                <p>{item.jenis_donor}</p>{' '}
                                            </Table.Td>
                                        );
                                    } else if (
                                        item.status_donor === 'berhasil'
                                    ) {
                                        return (
                                            <Table.Td className='text-center capitalize'>
                                                {' '}
                                                <p className='text-green-500'>
                                                    {item.status_donor}
                                                </p>{' '}
                                                <p>{item.jenis_donor}</p>{' '}
                                            </Table.Td>
                                        );
                                    }
                                })()}
                                <Table.Td className='flex flex-col gap-y-1'>
                                    <div className='border-b border-dashed border-gray-800'>
                                        Tanggal Order :
                                        {item.tanggal_donor_darah}
                                    </div>
                                    <div className=''>
                                        Waktu Order :{item.jam_donor_darah}
                                    </div>
                                </Table.Td>
                                <Table.Td>{item.nama_petugas}</Table.Td>
                          
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
    </div>;
}
Registrasi.layout = (page) => <Cetak title={'Laporan Data Registrasi Donor Darah'} children={page} />;