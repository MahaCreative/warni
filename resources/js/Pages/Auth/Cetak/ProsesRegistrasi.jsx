import moment from 'moment';
import React from 'react'
import Table from '../../../Components/Table';
import Cetak from '../../../Layouts/Cetak';

export default function ProsesRegistrasi({ dataproses }) {
  return (
    <div>
      <Table className=' bg-white'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Registrasi</Table.Th>
                            <Table.Th>Tanggal Proses</Table.Th>
                            <Table.Th>Nama Petugas</Table.Th>
                            <Table.Th>Nama Pendonor</Table.Th>
                            <Table.Th>Golongan Darah</Table.Th>
                            <Table.Th>Jumlah Darah</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Keterangan</Table.Th>
                            
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
                                <Table.Td>{item.nama_petugas}</Table.Td>
                                <Table.Td>{item.nama_pendonor}</Table.Td>
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

                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
    </div>
  )
}
ProsesRegistrasi.layout = (page) => <Cetak title={'Laporan Data Registrasi Donor Darah'} children={page} />;