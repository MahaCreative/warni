import React from 'react'
import Table from '../../../Components/Table'
import Cetak from '../../../Layouts/Cetak';

export default function Pendonor({ pendonor }) {
    
  return (
      <div>
          <Table className='my-3  overflow-hidden rounded-md shadow-lg shadow-gray-400/50 w-full'>
    <Table.Thead
        className={
            'bg-gray-900/50 backdrop-blur-sm sticky top-0 w-full'
        }
    >
        <Table.Th>Nama</Table.Th>
        <Table.Th>Email</Table.Th>
        <Table.Th>Alamat</Table.Th>
        <Table.Th>Telp</Table.Th>
        <Table.Th>Jumlah Donor</Table.Th>
        
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
                      
                  </tr>
              ))
            : ''}
    </Table.Tbody>
</Table></div>
  )
}
Pendonor.layout = (page) => <Cetak title={'Laporan Jumlah Donor Darah Bulan Ini'} children={page} />;