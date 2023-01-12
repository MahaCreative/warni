import React, { useCallback, useEffect, useRef, useState } from "react";
import Backend from "../../../Layouts/Backend";
import Card from "../../../Components/Auth/Card";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import Input from "../../../Components/Input";
import Table from "../../../Components/Table";
import { Menu } from "@headlessui/react";
import Button from "../../../Components/Button";
import Breadcrumb from "../../../Components/Auth/Breadcrumb";
import Modal from "../../../Components/Modal";
import UseModal from "../../../CostumHook/Modal/UseModal";
import { Inertia } from "@inertiajs/inertia";
import { debounce } from "lodash";
import moment from 'moment/moment';
import NavLink from "../../../Components/NavLink";
import RegistrasiCreate from "../../../Components/Registrasi/RegistrasiCreate";
import RegistrasiUpdate from "../../../Components/Registrasi/RegistrasiUpdate";
import ProsesCreate from "../../../Components/ProsesRegistrasi/ProsesCreate";
import LihatProses from "../../../Components/ProsesRegistrasi/LihatProses";
export default function RegistrasiDonor({ registrasi, golDar, sukarela, pengganti, bayaran, ...props }) {
    const { open: modallAddButon, close: closeAddButton, modal: modalAdd, } = UseModal();
    const { open: modalLihatButton, close: closeModalLihat, modal: modalLihatTrigger, } = UseModal();
    const { open: modalEditButton, close: closeModalEdit, modal: modalEditTrigger, } = UseModal();
    const { open: modalDeleteButton, close: closeModalDelete, modal: modalDeleteTrigger, } = UseModal();
    const { open: modalFilterButton, close: closeModalFilter, modal: modalFilterTrigger, } = UseModal();
    const { open: modalProsesButton, close: closeModalProses, modal: modalProsesTrigger, } = UseModal();

    const [dataRegist, setDataRegis] = useState([]);

    const lihatModal = (data) => { setDataRegis(data), modalLihatButton(); };
    const editModal = (data) => { setDataRegis(data), modalEditButton(); };
    const deleteModal = (data) => { setDataRegis(data), modalDeleteButton(); };
    const prosesModal = (data) => { setDataRegis(data), modalProsesButton(); }
    const deleteHandler = () => { Inertia.delete( route("registrasi-donor-delete", dataRegist.kode_registrasi) ), { onSuccess: () => closeModalDelete() }; };
    const [params, setParams] = useState({ j: null, search: null, dari_tanggal: null, sampai_tanggal: null, });
    const reload = useCallback( debounce((query) => { Inertia.get( route("registrasi-donor"), query, { preserveState: true }, 150 ); }), [] );
    const filterModal = () => { modalFilterButton(); };
    useEffect(() => reload(params), [params]);
    return (
        <div className="px-3 py-1">
            <Modal
                size={
                    "w-[95%] md:w-[80%] lg:w-[80%] h-[70%] md:h-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                }
                trigger={modalAdd}
                closeModal={closeAddButton}
                headerTitle={"Registrasi Donor Darah"}
            >
                <RegistrasiCreate onClose={closeAddButton} />
            </Modal>
            <Modal
                size={
                    "w-[95%] md:w-[80%] lg:w-[80%] h-[70%] md:h-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                }
                trigger={modalEditTrigger}
                closeModal={closeModalEdit}
                headerTitle={"Update Registrasi Donor Darah"}
            >
                <RegistrasiUpdate model={dataRegist} onClose={closeModalEdit} />
            </Modal>
            <Modal
                size={""}
                trigger={modalDeleteTrigger}
                closeModal={closeModalDelete}
                headerTitle={"Delete Registrasi Donor Darah"}
            >
                <p>Apakah anda yakin ingin menghapus data?</p>
                <div className="flex gap-1">
                    <Button
                        type="button"
                        onClick={deleteHandler}
                        className={"text-white bg-green-500"}
                    >
                        Delete Registrasi
                    </Button>
                    <Button
                        type="button"
                        onClick={() => closeModalDelete()}
                        className={"text-white bg-red-500"}
                    >
                        Cancell
                    </Button>
                </div>
            </Modal>
            {/* Filter */}
            <Modal
                trigger={modalFilterTrigger}
                closeModal={closeModalFilter}
                headerTitle={"Filter Cetak Report"}
                className=" bg-white"
            >
                <p className="text-black">
                    Silahkan atur waktu data yang ingin di tampilkan
                </p>
                <div className="md:grid md:grid-cols-1 grid-cols-1 gap-1">
                    <div>
                        <label htmlFor="" className="text-black">
                            {" "}
                            Dari Tanggal
                        </label>
                        <Input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    dari_tanggal: e.target.value,
                                })
                            }
                            type="date"
                            placeholder="jenis_donor"
                        />
                    </div>
                    <div>
                        <label htmlFor="" className="text-black">
                            {" "}
                            Sampai Tanggal
                        </label>
                        <Input
                            onChange={(e) =>
                                setParams({
                                    ...params,
                                    sampai_tanggal: e.target.value,
                                })
                            }
                            type="date"
                            placeholder="sampai tanggal"
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Button
                        className={"bg-emerald-500 text-white"}
                        onClick={() => cetakHandler()}
                    >
                        Submit
                    </Button>
                    <Button
                        className={"bg-red-600 text-white"}
                        onClick={closeModalFilter}
                    >
                        Cancell
                    </Button>
                </div>
            </Modal>
            <Modal
                size={
                    "w-[95%] md:w-[80%] lg:w-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                }
                trigger={modalProsesTrigger}
                closeModal={closeModalProses}
                headerTitle={"Proses Registrasi Donor Darah"}
            >
                <ProsesCreate model={dataRegist} onClose={ closeModalProses} />
            </Modal>
            <Modal
                size={
                    "w-[95%] md:w-[80%] lg:w-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                }
                trigger={modalLihatTrigger}
                closeModal={closeModalLihat}
                headerTitle={"Lihat Proses Registrasi Donor Darah"}
            >
                <LihatProses model={dataRegist} onClose={ closeModalLihat} />
            </Modal>
            <Breadcrumb active={route().current("registrasi-donor")}>
                Data Registrasi Donor
            </Breadcrumb>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 my-6">
                <Card
                    onClick={() => setParams({ ...params, j: "sukarela" })}
                    className="hover:cursor-pointer hover:bg-gray-700"
                >
                    <div className="flex justify-between items-center px-4 py-1 ">
                        <div className="text-white w-1/2">
                            <p className="font-bold text-4xl">Donor Sukarela</p>
                        </div>
                        <div className="text-white font-bold text-4xl justify-self-end">
                            {sukarela}
                        </div>
                    </div>
                </Card>
                <Card
                    onClick={() => setParams({ ...params, j: "pengganti" })}
                    className="hover:cursor-pointer hover:bg-gray-700"
                >
                    <div className="flex justify-between items-center px-4 py-1">
                        <div className="text-white w-1/2">
                            <p className="font-bold text-4xl">
                                Donor Pengganti
                            </p>
                        </div>
                        <div className="text-white font-bold text-4xl justify-self-end">
                            {pengganti}
                        </div>
                    </div>
                </Card>
                <Card
                    onClick={() => setParams({ ...params, j: "bayaran" })}
                    className="hover:cursor-pointer hover:bg-gray-700"
                >
                    <div className="flex justify-between items-center px-4 py-1">
                        <div className="text-white w-1/2">
                            <p className="font-bold text-4xl">Donor Bayaran</p>
                        </div>
                        <div className="text-white font-bold text-4xl justify-self-end">
                            {bayaran}
                        </div>
                    </div>
                </Card>
            </div>
            <div className="flex justify-between py-1.5 border-b border-dashed border-white/30 items-center">
                <div className="text-white flex gap-x-3 items-center">
                    <Button
                        onClick={modallAddButon}
                        className={"bg-blue-600 hover:bg-slate-800"}
                    >
                        Tambah Registrasi Donor
                    </Button>
                    <Button
                        onClick={filterModal}
                        className={"bg-cyan-400 hover:bg-cyan-500"}
                    >
                        Filter Tanggal
                    </Button>
                    <NavLink
                        className={"bg-green-600 hover:bg-green-800"}
                        href={route('cetak-registrasi')}
                    >
                        cetak
                    </NavLink>
                </div>
                <div className="w-1/5">
                    <Input
                        onChange={(e) =>
                            setParams({ ...params, search: e.target.value })
                        }
                        className="bg-white"
                        placeholder="Search..."
                    />
                </div>
            </div>
            <div>
                <Table className="min-h-[450px] max-h-[500px] bg-white">
                    <Table.Thead className={"bg-red-500 sticky top-0"}>
                        <tr>
                            <Table.Th>Kode Registrasi</Table.Th>
                            <Table.Th>Tanggal Registrasi</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Golongan_darah</Table.Th>
                            <Table.Th className={"text-center"}>
                                <p>Status Donor</p> <p>Jenis Donor</p>
                            </Table.Th>
                            <Table.Th>Waktu Order Donor</Table.Th>
                            <Table.Th>Nama Petugas</Table.Th>
                            <Table.Th>Aksi</Table.Th>
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {registrasi.map((item) => (
                            <tr key={item.id} className="odd:hover:bg-gray-100">
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
                                    if (item.status_donor === "verifikasi") {
                                        return (
                                            <Table.Td className=" capitalize text-center">
                                                {" "}
                                                <p className="text-orange-600">
                                                    {item.status_donor}
                                                </p>{" "}
                                                <p>{item.jenis_donor}</p>{" "}
                                            </Table.Td>
                                        );
                                    } else if (item.status_donor === "gagal") {
                                        return (
                                            <Table.Td className="text-center capitalize">
                                                {" "}
                                                <p className="text-red-500">
                                                    {item.status_donor}
                                                </p>{" "}
                                                <p>{item.jenis_donor}</p>{" "}
                                            </Table.Td>
                                        );
                                    } else if (
                                        item.status_donor === "berhasil"
                                    ) {
                                        return (
                                            <Table.Td className="text-center capitalize">
                                                {" "}
                                                <p className="text-green-500">
                                                    {item.status_donor}
                                                </p>{" "}
                                                <p>{item.jenis_donor}</p>{" "}
                                            </Table.Td>
                                        );
                                    }
                                })()}
                                <Table.Td className="flex flex-col gap-y-1">
                                    <div className="border-b border-dashed border-gray-800">
                                        Tanggal Order :
                                        {item.tanggal_donor_darah}
                                    </div>
                                    <div className="">
                                        Waktu Order :{item.jam_donor_darah}
                                    </div>
                                </Table.Td>
                                <Table.Td>{item.name}</Table.Td>
                                <Table.Td>
                                    <Menu>
                                        <Table.Dropdown>
                                            {item.status_donor ==
                                                "berhasil" && (
                                                <Table.DropdownButton
                                                    onClick={() =>
                                                        lihatModal(item)
                                                    }
                                                >
                                                    Lihat Proses Donor
                                                </Table.DropdownButton>
                                            )}
                                            {item.status_donor ==
                                                "verifikasi" && (
                                                <Table.DropdownButton
                                                onClick={() =>
                                                    prosesModal(item)
                                                }
                                                >
                                                    Proses Donor Darah
                                                </Table.DropdownButton>
                                            )}
                                            <Table.DropdownButton
                                                onClick={() => editModal(item)}
                                            >
                                                Edit
                                            </Table.DropdownButton>
                                            <Table.DropdownButton
                                                onClick={() =>
                                                    deleteModal(item)
                                                }
                                            >
                                                {" "}
                                                Delete{" "}
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
RegistrasiDonor.layout = (page) => <Backend children={page} />;
