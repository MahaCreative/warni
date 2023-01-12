import { Menu } from '@headlessui/react';
import React, { useState } from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Button from '../../../Components/Button';
import Card from '../../../Components/Auth/Card';
import Modal from '../../../Components/Modal';
import Input from '../../../Components/Input';
import Table from '../../../Components/Table';
import Backend from '../../../Layouts/Backend';
export default function DataDarah({ darah }) {
    console.log(darah);
    const [open, setOpen] = useState(false);
    const submitHandler = () => {};
    const onChangeHandler = (e) => {};
    return (
        <div className='px-3 py-3 min-h-screen'>
            <Modal
                setOpen={setOpen}
                open={open}
                headerTitle='Tambah Event Donor'
                className='w-[350px] bg-white/10'
            >
                <form action=''>
                    <div className='flex flex-col gap-y-2'>
                        <Input
                            onChange={onChangeHandler}
                            placeholder='Judul Event'
                            name='judul_event'
                        />
                        <textarea
                            onChange={onChangeHandler}
                            name='kontent'
                            placeholder='Kontent'
                            className='py-1 px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full'
                        ></textarea>
                        <textarea
                            onChange={onChangeHandler}
                            name='tempat'
                            placeholder='Tempat Pelaksanaan'
                            className='py-1 px-4 outline-none rounded-md shadow-md backdrop-blur-sm text-gray-900 border border-dashed border-gray-900 focus:outline-none placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-gray-600 w-full'
                        ></textarea>
                        <Input
                            onChange={onChangeHandler}
                            type='date'
                            name='tanggal_event'
                            placeholder='Tanggal Pelaksanaan Event'
                        />
                        <Input
                            onChange={onChangeHandler}
                            type='time'
                            name='waktu_event'
                            placeholder='Waktu Pelaksanaan'
                        />
                        <Input
                            onChange={onChangeHandler}
                            type='file'
                            name='thumbnail'
                            placeholder='Thumbnail'
                        />
                        <div className='flex gap-x-3'>
                            <Button
                                onClick={submitHandler}
                                className={
                                    'bg-gray-700 text-white hover:bg-gray-800'
                                }
                            >
                                Submit
                            </Button>
                            <Button
                                className={
                                    'bg-red-700 text-white hover:bg-red-800'
                                }
                            >
                                Cancell
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
            <Breadcrumb active={route().current('admin/event-donor')}>
                Data Darah
            </Breadcrumb>
            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    {/* <Button
                        onClick={() => setOpen(!open)}
                        className={'bg-blue-600 hover:bg-slate-800'}
                    >
                        Tambah Event Donor
                    </Button> */}
                </div>
                <div className='w-1/5'>
                    {/* <Input className='bg-gray-700' placeholder='Search...' /> */}
                </div>
            </div>
            <div>
                <Table className='my-3 max-h-[360px] overflow-hidden rounded-sm shadow-lg shadow-gray-400/50'>
                    <Table.Thead
                        className={
                            'bg-red-500/80 backdrop-blur-sm sticky top-0'
                        }
                    >
                        <Table.Th>Golongan Darah</Table.Th>
                        <Table.Th>Stok</Table.Th>
                        {/* <Table.Th className={'text-right'}>Aksi</Table.Th> */}
                    </Table.Thead>
                    <Table.Tbody>
                        {darah.map((item, id) => (
                            <tr>
                                <Table.Td>{item.golongan_darah}</Table.Td>
                                <Table.Td>{ item.stok.stok}</Table.Td>
                                {/* <Table.Td className='text-right'>
                                    <Table.Dropdown>
                                        <Menu>
                                            <Table.DropdownItem>
                                                Lihat Detail Darah
                                            </Table.DropdownItem>
                                        </Menu>
                                    </Table.Dropdown>
                                </Table.Td> */}
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
}
DataDarah.layout = (page) => <Backend children={page} />;
