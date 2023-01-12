import { Menu } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Button from '../../../Components/Button';
import Modal from '../../../Components/Modal';
import NavLink from '../../../Components/NavLink';
import Input from '../../../Components/Input';
import Table from '../../../Components/Table';
import UseModal from '../../../CostumHook/Modal/UseModal';
import Backend from '../../../Layouts/Backend';
export default function Index({pendonor}) {
    

    const [params, setParams] = useState({
        search: '',
        perPage: '',
    });
    const openData = () => {
        let data = Inertia.get(route('admin-get-data-pendonor', 1));
    };
    const onChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };
    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('admin-data-pendonor'),
                query,
                {
                    preserveState: true,
                },
                150
            );
        }),
        []
    );
    const {
        open: modalFilterButton,
        close: closeModalFilter,
        modal: modalFilterTrigger,
    } = UseModal();
    useEffect(() => reload(params), [params]);
    const filterModal = () => {
        modalFilterButton();
    };
    return (
        <div className='px-3 py-3 min-h-screen'>
            {/* Filter */}
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
                            Dari Tanggal
                        </label>
                        <Input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                            type='date'
                            placeholder='jenis_donor'
                        />
                    </div>
                    <div>
                        <label htmlFor='' className='text-white'>
                            {' '}
                            Sampai Tanggal
                        </label>
                        <Input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                            type='date'
                            placeholder='sampai tanggal'
                        />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <Button
                        className={'bg-emerald-500 text-white'}
                        onClick={() => cetakHandler()}
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
            <Breadcrumb
                href={route('admin-data-pendonor')}
                active={route().current('admin-data-pendonor')}
            >
                Data Pendonor
            </Breadcrumb>
            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    
                    <Button
                        onClick={filterModal}
                        className={'bg-cyan-400 hover:bg-cyan-500'}
                    >
                        Filter Tanggal
                    </Button>
                    <NavLink
                        className={'bg-green-600 hover:bg-green-800'}
                        href={route('cetak-pendonor')}
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
            <div className='text-white'>
                <p>Jumlah Donor Darah Pada Bulan Ini</p> 
            </div>
            <div className=''>
                <Table className='min-h-[450px] max-h-[500px] bg-white'>
                    <Table.Thead
                        className={
                            'bg-red-500 sticky top-0'
                        }
                    >
                        <Table.Th>Nama</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Alamat</Table.Th>
                        <Table.Th>Telp</Table.Th>
                        <Table.Th>Jumlah Donor</Table.Th>
                        <Table.Th>Aksi</Table.Th>
                    </Table.Thead>
                    <Table.Tbody>
                        {pendonor
                            ? pendonor.map((item, id) => (
                                  <tr key={item.id}>
                                      <Table.Td>{item.nama}</Table.Td>
                                      <Table.Td>{item.email}</Table.Td>
                                      <Table.Td>{item.alamat}</Table.Td>
                                      <Table.Td>{item.telp}</Table.Td>
                                      <Table.Td>{item.total}</Table.Td>
                                      <Table.Td>
                                          <Table.Dropdown>
                                              <Menu>
                                                  <Table.DropdownButton
                                                      onClick={() =>
                                                          lihatModal(item)
                                                      }
                                                  >
                                                      Lihat History Donor
                                                  </Table.DropdownButton>
                                              </Menu>
                                          </Table.Dropdown>
                                      </Table.Td>
                                  </tr>
                              ))
                            : ''}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
}
Index.layout = (page) => <Backend children={page} />;
