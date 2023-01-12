import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Button from '../../../Components/Button';
import Modal from '../../../Components/Modal';
import NavLink from '../../../Components/NavLink';
import Input from '../../../Components/Input';
import Table from '../../../Components/Table';
import UseModal from '../../../CostumHook/Modal/UseModal';
import Backend from '../../../Layouts/Backend';

export default function DarahMasuk({ darahmasuk, bulan,tahun }) {
    const { open: modalFilterButton, close: closeModalFilter, modal: modalFilterTrigger, } = UseModal();
    const filterDialog = () => { modalFilterButton() }
    const [params, setParams] = useState({ search: '', bulan:bulan,tahun:tahun});
    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('data-darah-masuk'),
                query,
                { preserveState: true },
                150
            );
        }),
        []
    );
    
    // const reload = useCallback( debounce((query) => { Inertia.get(route('proses-donor'), query, { preserve:true }, 150 ) } ), [] )
    useEffect(() => reload(params), [params]);
    
    return (
      <div className='min-h-screen bg-slate-800 px-3 py-3'>
          
          <Modal
                trigger={modalFilterTrigger}
                closeModal={closeModalFilter}
                headerTitle={'Filter Cetak Report'}
                className=' bg-white/10'
            >
                <p className='text-white'>
                    Silahkan atur waktu data yang ingin di tampilkan
                </p>
                <div className='md:grid md:grid-cols-1 grid-cols-1 gap-1'>
                    <div>
                        <label htmlFor='' className='text-white'>
                            {' '}
                            Bulan
                        </label>
                        <Input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    bulan: e.target.value,
                                })
                            }
                            type='number' defaultValue={1} min={1} max={12}
                            
                        />
                    </div>
                    <div>
                        <label htmlFor='' className='text-white'>
                            {' '}
                            Tahun
                        </label>
                        <Input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    tahun: e.target.value,
                                })
                            }
                            type='number' min={2000} max={2100}
                            defaultValue={2000}
                        />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <Button
                        className={'bg-emerald-500 text-white'}
                        // onClick={() => cetakHandler()}
                    >
                        Submit
                    </Button>
                    <Button
                        className={'bg-red-600 text-white'}
                        onClick={closeModalFilter}
                    >
                        Cancell
                    </Button>
                </div>
            </Modal>
            <Breadcrumb href={route('data-darah-masuk')} active={route().current('data-darah-masuk')}>
                Darah Masuk
            </Breadcrumb>
            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    
                    <Button
                        onClick={() => filterDialog()}
                        className={'bg-cyan-400 hover:bg-cyan-500'}
                    >
                        Filter Tanggal
                    </Button>
                    <NavLink    
                        className={'bg-green-600 hover:bg-green-800'}
                        href={route('cetak-darah-keluar')}
                    >
                        Cetak
                    </NavLink>
                </div>
                <div className='w-1/5'>
                    <Input
                        onChange={(e) =>
                            setParams({ ...params, search: e.target.value })
                        }
                        className='bg-white'
                        placeholder='Search...'
                    />
                </div>
            </div>
          <div>
                <Table className='my-3 min-h-[450px] max-h-[500px] overflow-hidden rounded-sm shadow-lg shadow-gray-400/50'>
                    <Table.Thead
                        className={
                            'bg-red-500/80 backdrop-blur-sm sticky top-0'
                        }
                    >
                        <Table.Th>Golongan Darah</Table.Th>
                        <Table.Th>Jumlah Darah Masuk</Table.Th>
                        <Table.Th>Bulan</Table.Th>
                        {/* <Table.Th className={'text-right'}>Aksi</Table.Th> */}
                    </Table.Thead>
                    <Table.Tbody>
                        {darahmasuk.map((item, id) => (
                            <tr>
                                <Table.Td>{item.golongan}</Table.Td>
                                <Table.Td>{ item.total_darah}</Table.Td>
                                <Table.Td>{ item.month}</Table.Td>
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
  )
}
DarahMasuk.layout = (page) => <Backend children={page} />;