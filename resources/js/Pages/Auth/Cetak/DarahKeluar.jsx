import React from 'react'
import Table from '../../../Components/Table';
import Cetak from '../../../Layouts/Cetak';
export default function DarahKeluar({darahkeluar}) {
  return (
      <div>
          <Table className='my-3 overflow-hidden rounded-sm shadow-lg shadow-gray-400/50'>
    <Table.Thead
        className={
            'bg-gray-900/50 backdrop-blur-sm sticky top-0'
        }
    >
        <Table.Th>Golongan Darah</Table.Th>
        <Table.Th>Jumlah Darah Keluar</Table.Th>
        <Table.Th>Bulan</Table.Th>
        {/* <Table.Th className={'text-right'}>Aksi</Table.Th> */}
    </Table.Thead>
    <Table.Tbody>
        {darahkeluar.map((item, id) => (
            <tr>
                <Table.Td>{item.golongan}</Table.Td>
                <Table.Td>{ item.total_darah}</Table.Td>
                <Table.Td>{ item.month}</Table.Td>
                
            </tr>
        ))}
    </Table.Tbody>
</Table></div>
  )
}
DarahKeluar.layout = (page) => <Cetak title={'Laporan Jumlah Darah Keluar Pertahun'} children={page} />;