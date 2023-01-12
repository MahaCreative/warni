import moment from 'moment';
import React from 'react'
import Table from '../../../Components/Table';
import Cetak from '../../../Layouts/Cetak';
export default function PermintaanDarah({permintaan}) {
  return (
      <div>
          <Table className=' bg-white capitalize'>
                    <Table.Thead className={'bg-gray-600 sticky top-0'}>
                        <tr>
                            <Table.Th>Kode Permintaan</Table.Th>
                            <Table.Th>Tanggal Permintaan</Table.Th>
                            <Table.Th>Nama</Table.Th>
                            <Table.Th>Permintaan Darah</Table.Th>
                            <Table.Th>keterangan</Table.Th>
                            <Table.Th>Jumlah Permintaan</Table.Th>
                            <Table.Th>Status</Table.Th>
                            
                        </tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {permintaan.map((item) => (
                            <tr key={item.id} className='odd:hover:bg-gray-100'>
                                <Table.Td>{item.kode_permintaan}</Table.Td>
                                <Table.Td>
                                    {' '}
                                    {moment(item.created_at).format(
                                        'DD-MMMM-YYYY'
                                    )}
                                </Table.Td>
                                <Table.Td>{item.nama}</Table.Td>
                                <Table.Td>{item.golongan_darah}</Table.Td>
                                <Table.Td>{item.keterangan}</Table.Td>
                                <Table.Td>{item.jumlah_permintaan}</Table.Td>
                                {/* <Table.Td> {item.user_id ? item.user.nama : item.pendonor.nama} </Table.Td> */}
                                {(() => {
                                    if (item.status === 'verifikasi') {
                                        return (
                                            <Table.Td className='text-orange-600 capitalize'>
                                                {' '}
                                                {item.status}{' '}
                                            </Table.Td>
                                        );
                                    } else if (item.status === 'gagal') {
                                        return (
                                            <Table.Td className='text-red-500 capitalize'>
                                                {' '}
                                                {item.status}{' '}
                                            </Table.Td>
                                        );
                                    } else if (item.status === 'berhasil') {
                                        return (
                                            <Table.Td className='text-green-500 capitalize'>
                                                {' '}
                                                {item.status}{' '}
                                            </Table.Td>
                                        );
                                    }
                                })()}

                            </tr>
                        ))}
                    </Table.Tbody>
                </Table>
    </div>
  )
}
PermintaanDarah.layout = (page) => <Cetak title={'Laporan Data Permintaan Donor Darah'} children={page} />;