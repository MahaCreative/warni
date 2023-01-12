import React, { useState } from 'react';
import Backend from '../../Layouts/Backend';
import Breadcrumb from '../../Components/Auth/Breadcrumb';
import Card from '../../Components/Auth/Card';

export default function Dashboard({ darah, stok, jumlahPendonorBulan }) {
    console.log(darah);
    const labels = [];
    const datasets = [];
    const labelGrafikJumlah = [];
    const datasetGrafikJumlah = [];
    for (let i = 0; i < darah.length; i++) {
        labels.push(darah[i].darah);
        datasets.push(darah[i].jumlah_donor);
    }
    for (let i = 0; i < jumlahPendonorBulan.length; i++) {
        labelGrafikJumlah.push(jumlahPendonorBulan[i].month);
        datasetGrafikJumlah.push(jumlahPendonorBulan[i].jumlah);
    }
    console.log(datasets);

    const [data, setData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Grafik Penambahan Darah',
                data: datasets,
                borderColor: 'red',
                backgroundColor: 'red',
                color: 'red',
            },
        ],
    });
    const [grafikJumlahDonor, setgrafikJumlahDonor] = useState({
        labels: labelGrafikJumlah,
        datasets: [
            {
                label: 'Grafik Total Donor Bulan Ini',
                data: datasetGrafikJumlah,
                borderColor: 'red',
                backgroundColor: 'red',
                color: 'red',
            },
        ],
    });

    return (
        <div className='min-h-screen'>
            <Breadcrumb > </Breadcrumb>
            <div className='py-1.4 px-4 my-4 border border-gray-100 shadow-sm shadow-gray-400/40 rounded-lg bg-slate-200/30 text-white font-roboto'>
                <p>Selamat datang di aplikasi registrasi donor darah,
                        sistem informasi ini merupakan sistem informasi yang
                        digunakan untuk melakukan pendaftaran registrasi donor
                        darah, serta untuk melakukan permintaan darah pada rumah
                        sakit daerah mamuju</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-1.5 px-3 gap-2 md:h-[450px] lg:h-[350px]'>
                {stok.map((item, id) => (
                    <Card className={'flex flex-col'}>
                        <p className='block w-full text-3xl text-white text-center'>
                            Stok Darah
                        </p>
                        <div className='flex justify-between text-white w-full p-2.5 gap-2'>
                            <p className='border border-dashed p-2.5 text-4xl font-bold text-center border-white rounded-lg w-1/2'>
                                {item.darah.golongan_darah}
                            </p>
                            <p className='border border-dashed p-2.5 text-4xl font-bold text-center border-white rounded-lg w-1/2'>
                                {item.stok}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>
           
        </div>
    );
}

Dashboard.layout = (page) => <Backend children={page} />;
