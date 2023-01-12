import React, { useCallback, useEffect, useState } from 'react';
import Backend from '../../../Layouts/Backend';
import Button from '../../../Components/Button'
import Modal from '../../../Components/Modal';
import Table from '../../../Components/Table';
import Card from '../../../Components/Auth/Card';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import UseModal from '../../../CostumHook/Modal/UseModal';
import Input from '../../../Components/Input';
import moment from 'moment';
import { Menu } from '@headlessui/react';
import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
import NavLink from '../../../Components/NavLink';
import LihatProses from '../../../Components/ProsesRegistrasi/LihatProses'
import EditProses from '../../../Components/ProsesRegistrasi/EditProses';
export default function index({ dataproses, berhasil, gagal, endDate, startDate }) {
    const proses = dataproses;
    const [params, setParams] = useState({ search: '', dari_tanggal:startDate,sampai_tanggal:endDate});
    const { open: modalEditButton, close: closeModalEdit, modal: ModalEditTrigger, } = UseModal();
    const { open: modalDeleteButton, close: closeModalDelete, modal: modalDeleteTrigger, } = UseModal();
    const { open: modalFilterButton, close: closeModalFilter, modal: modalFilterTrigger, } = UseModal();
    const [dataProses, dataSetProses] = useState([]);
    
    const deletetHandler = () => {
        Inertia.delete(route('delete-proses-registrasi', dataProses.id));
        {
            onSuccess: () => closeModalDelete();
        }
    };

    const deleteDialog = (dataProses) => {
        dataSetProses(dataProses);
        modalDeleteButton();
    };
    const editDialog = (dataProses) => {
        dataSetProses(dataProses);
        modalEditButton();
    };
    const filterDialog = () => {
        modalFilterButton()
    }
    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route('proses-donor'),
                query,
                { preserveState: true },
                150
            );
        }),
        []
    );
    // const reload = useCallback( debounce((query) => { Inertia.get(route('proses-donor'), query, { preserve:true }, 150 ) } ), [] )
    useEffect(() => reload(params), [params]);
    // href={route('update-proses-registrasi', item.id)
    return (
        <div className='px-3 py-3'>
            <Modal
                size={
                    "w-[95%] md:w-[80%] lg:w-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                }
                trigger={ModalEditTrigger}
                closeModal={closeModalEdit}
                headerTitle={"Edit Proses Registrasi Donor Darah"}
            >
                <EditProses model={dataProses} onClose={ closeModalEdit} />
            </Modal>
            <Modal
                closeModal={closeModalDelete}
                trigger={modalDeleteTrigger}
                headerTitle={'Alert Hapus Data Proses '}
                className=' "w-[95%] md:w-[80%] lg:w-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden" bg-white'
            >
                <p className='text-blue-400'>Apakah anda yakin ingin menghapus?</p>
                <div className='flex  my-3'>
                    <Button
                        onClick={() => deletetHandler(proses.id)}
                        className={
                            'bg-emerald-600 text-white text-center hover:text-black hover:bg-white'
                        }
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={closeModalDelete}
                        className={
                            'bg-red-600 text-white text-center hover:text-black hover:bg-white'
                        }
                    >
                        Cancelll
                    </Button>
                </div>
            </Modal>
             {/* Filter */}
             <Modal
                trigger={modalFilterTrigger}
                closeModal={closeModalFilter}
                headerTitle={'Filter Cetak Report'}
                className=' "w-[95%] md:w-[80%] lg:w-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden" bg-white'
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
            
            <Breadcrumb active={route().current('proses-donor')}>
                Proses Registrasi
            </Breadcrumb>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-3 my-6'>
                <Card
                    onClick={() => setParams({ ...params, q: 'berhasil' })}
                    className='hover:cursor-pointer hover:bg-gray-700'
                >
                    <div className='flex justify-between items-center px-4 py-1 '>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Berhasil</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {berhasil}
                        </div>
                    </div>
                </Card>
                <Card
                    onClick={() => setParams({ ...params, q: 'gagal' })}
                    className='hover:cursor-pointer hover:bg-gray-700'
                >
                    <div className='flex justify-between items-center px-4 py-1 '>
                        <div className='text-white w-1/2'>
                            <p className='font-bold text-4xl'>Donor Gagal</p>
                        </div>
                        <div className='text-white font-bold text-4xl justify-self-end'>
                            {gagal}
                        </div>
                    </div>
                </Card>
            </div>
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
                        href={route('cetak-proses-registrasi')}
                    >
                        cetak
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
                <Table className='min-h-[450px] max-h-[500px] bg-white'>
                    <Table.Thead className={'bg-red-500 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Registrasi</Table.Th>
                            <Table.Th>Tanggal Proses</Table.Th>
                            <Table.Th>Nama Petugas</Table.Th>
                            <Table.Th>Nama Pendonor</Table.Th>
                            <Table.Th>Golongan Darah</Table.Th>
                            <Table.Th>Jumlah Darah</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Keterangan</Table.Th>
                            <Table.Th>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {dataproses.map((item) => (
                            <tr>
                                <Table.Td>{item.kode_registrasi}</Table.Td>
                                <Table.Td>
                                    {moment(item.created_at).format(
                                        'DD-MMMM-YYYY'
                                    )}
                                </Table.Td>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>{item.nama}</Table.Td>
                                <Table.Td>{item.golongan_darah}</Table.Td>
                                <Table.Td>{item.jumlah_darah}</Table.Td>
                                <Table.Td>
                                    {item.status == 'berhasil' ? (
                                        <p className='text-green-600'>
                                            {item.status}
                                        </p>
                                    ) : (
                                        <p className='text-red-600'>
                                            {item.status}
                                        </p>
                                    )}
                                </Table.Td>
                                <Table.Td>
                                    {item.keterangan == null
                                        ? 'Keterangan Kosong'
                                        : item.keterangan}
                                </Table.Td>
                                <Table.Td>
                                    <Menu>
                                        <Table.Dropdown>
                                            <Table.DropdownButton
                                                onClick={() => editDialog(item)}
                                            >
                                                Edit
                                            </Table.DropdownButton>
                                            <Table.DropdownButton
                                                onClick={() =>
                                                    deleteDialog(item)
                                                }
                                            >
                                                {' '}
                                                Delete{' '}
                                            </Table.DropdownButton>
                                        </Table.Dropdown>
                                    </Menu>
                                </Table.Td>
                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
}
index.layout = (page) => <Backend children={page} />;
