import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import React, { useCallback, useEffect, useState } from 'react';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Guest from '../../../Layouts/Backend';
import Input from '../../../Components/Input';
import Button from '../../../Components/Button';
import Modal from '../../../Components/Modal';
import Table from '../../../Components/Table';
import { Menu } from '@headlessui/react';
import UseModal from '../../../CostumHook/Modal/UseModal';

import { Inertia } from '@inertiajs/inertia';
import { debounce } from 'lodash';
export default function EventDonor(props) {
    const { data: event, meta, links } = props.event;

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({ search: "" });
    const [model, setModel] = useState([]);
    const reload = useCallback(
        debounce((query) => {
            Inertia.get(
                route("event"),
                query,
                {
                    preserveState: true,
                    onBefore: () => setLoading(true),
                    onSuccess: () => setLoading(false),
                },
                150
            );
        }),
        []
    );
    useEffect(() => reload(params), [params]);


    const {
        open: deleteModalOpen,
        close: deleteModalClose,
        modal: deleteTrigger,
    } = UseModal();

    const deleteModalHandler = (model) => {
        setModel(model);
        deleteModalOpen();
    };
    function submitDelete() {
        Inertia.delete(route("event-delete", model.slug), {
            onStart: () => setLoading(true),
            onError: () => setLoading(false),
            onSuccess: () => {
                setLoading(false);
                deleteModalClose();
            },
        });
    }
    return (
        <div className='px-3 py-3 min-h-screen'>
            <Modal
                closeModal={deleteModalClose}
                trigger={deleteTrigger}
                headerTitle='Hapus Event Donor'
                className='w-[350px] bg-white/10'
            >
                <p className='text-white'>
                    Apakah Anda Yakin ingin mengahpus data?
                </p>
                <div className='flex gap-x-3'>
                    <Button
                        onClick={submitDelete}
                        className={
                            'bg-emerald-400 text-white hover:bg-gray-800'
                        }
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={deleteModalClose}
                        className={'bg-red-600 text-white hover:bg-red-800'}
                    >
                        Cancell
                    </Button>
                </div>
            </Modal>
            <Breadcrumb >
                Event Donor
            </Breadcrumb>

            <div className='flex justify-between py-1.5 border-b border-dashed border-white/30 items-center'>
                <div className='text-white flex gap-x-3 items-center'>
                    <Link
                        href={route('event-create')}
                        className={'bg-blue-600 hover:bg-blue-500 py-1.5 px-2.5 rounded-md '}
                    >
                        Tambah Event Donor
                    </Link>
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
                            'bg-gray-900/50 backdrop-blur-sm sticky top-0'
                        }
                    >
                        <Table.Th className="text-sm md:text-md lg:text-lg">No</Table.Th>
                                <Table.Th className="text-sm md:text-md lg:text-lg">Judul Event</Table.Th>
                                <Table.Th className="text-sm md:text-md lg:text-lg">Tanggal Mulai</Table.Th>
                                <Table.Th className="text-sm md:text-md lg:text-lg">Tanggal Berakhir</Table.Th>
                                <Table.Th className="text-sm md:text-md lg:text-lg">Penyelenggara</Table.Th>
                                <Table.Th className="text-sm md:text-md lg:text-lg">Aksi</Table.Th>
                    </Table.Thead>
                    <Table.Tbody>
                    {event ? (
                                event.map((item, key) => (
                                    <tr key={key + 1}>
                                        <Table.Td className="text-sm md:text-md lg:text-lg">{key + 1}</Table.Td>
                                        <Table.Td className="text-sm md:text-md lg:text-lg">
                                            <div className="flex gap-3 items-center">
                                                <img
                                                    className="w-20"
                                                    src={
                                                        "/storage/" +
                                                        item.thumbnail
                                                    }
                                                    alt=""
                                                />
                                                <p>{item.judul}</p>
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="text-sm md:text-md lg:text-lg">
                                            {item.tanggal_mulai}
                                        </Table.Td >
                                        <Table.Td>
                                            {item.tanggal_berakhir}
                                        </Table.Td>
                                        <Table.Td className="text-sm md:text-md lg:text-lg">
                                            {item.penyelenggara}
                                        </Table.Td>
                                        {/* <Table.Td>{ item.telp}</Table.Td>
                                  <Table.Td>{ item.angkatan}</Table.Td> */}
                                        <Table.Td>
                                            <Table.Dropdown className="text-sm md:text-md lg:text-lg">
                                                <Menu>
                                                    <Table.DropdownButton>
                                                        <Table.DropdownItem>
                                                            Lihat
                                                        </Table.DropdownItem>
                                                        <Table.DropdownItem
                                                            href={route(
                                                                "event-update",
                                                                item.slug
                                                            )}
                                                        >
                                                            Edit
                                                        </Table.DropdownItem>
                                                        <Table.DropdownButton
                                                            onClick={() =>
                                                                deleteModalHandler(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Table.DropdownButton>
                                                    </Table.DropdownButton>
                                                </Menu>
                                            </Table.Dropdown>
                                        </Table.Td>
                                    </tr>
                                ))
                            ) : (
                                <p>Data Tidak Ada</p>
                            )}
                    </Table.Tbody>
                </Table>
            </div>
        </div>
    );
}
EventDonor.layout = (page) => <Guest children={page} />;
