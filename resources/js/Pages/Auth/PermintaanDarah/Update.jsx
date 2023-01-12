import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Update({ model, golDar, onClose }) {
    const { auth } = usePage().props;
    console.log(auth);
    const { data, setData, errors, put } = useForm({
        permintaan_id: '',
        nama: '',
        tanggal_lahir: '',
        gol_darah: '',
        keterangan: '',
        jumlah_permintaan: '',
        status: '',
    });
    useEffect(() => {
        console.log(model);
        setData({
            ...data,
            permintaan_id: model.id,
            nama: model.nama,
            gol_darah: model.golongan_darah_id,
            tanggal_lahir: model.tanggal_lahir,
            status: model.status,
            jumlah_permintaan: model.jumlah_permintaan,
            keterangan: model.keterangan,
        });
    }, [model]);
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = () => {
        put(route('permintaan-darah-update', data.permintaan_id), {
            onSuccess: onClose(),
        });
    };
    return (
        <div>
            <form>
                <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                        <Input.Label htmlFor='nama'>
                            Nama Lengkap
                        </Input.Label>
                        <Input
                            defaultValue={data.nama}
                            onChange={onChange}
                            type='text'
                            name='nama'
                            placeholder='Nama Lengkap'
                        />
                        {errors.nama && <Input.Error errors={errors.nama} />}
                    </div>
                    <div>
                        <Input.Label htmlFor='nama'>
                            Tanggal Lahir
                        </Input.Label>
                        <Input
                            defaultValue={model.tanggal_lahir}
                            onChange={onChange}
                            type='date'
                            name='tanggal_lahir'
                            placeholder='Tanggal Lahir'
                        />
                        {errors.tanggal_lahir && (
                            <Input.Error errors={errors.tanggal_lahir} />
                        )}
                    </div>
                </div>
                <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                        <Input.Label htmlFor='gol_darah'>
                            Golongan Darah
                        </Input.Label>
                        <select
                            onChange={onChange}
                            className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                            placeholder='Select Golongan Darah'
                            name='gol_darah'
                        >
                            <option defaultValue={data.gol_darah}>
                                {model.golongan_darah}
                            </option>
                            {golDar
                                ? golDar.map((item) => (
                                      <option key={item.id} value={item.id}>
                                          {item.golongan_darah}
                                      </option>
                                  ))
                                : ' '}
                        </select>
                        {errors.gol_darah && (
                            <Input.Error errors={errors.gol_darah} />
                        )}
                    </div>
                    <div>
                        <Input.Label
                        
                            htmlFor='jumlah_permintaan'
                        >
                            Jumlah Permintaan
                        </Input.Label>
                        <Input
                            defaultValue={data.jumlah_permintaan}
                            onChange={onChange}
                            type='number'
                            name='jumlah_permintaan'
                            placeholder='Jumlah Permintaan' min={1} max={5}
                        />
                        {errors.jumlah_permintaan && (
                            <Input.Error errors={errors.jumlah_permintaan} />
                        )}
                    </div>
                    <div>
                        <Input.Label htmlFor='petugas'>
                            Nama Petugas
                        </Input.Label>
                        <Input
                            value={auth.user.name}
                            onChange={onChange}
                            type='text'
                            disabled
                            name='petugas'
                            placeholder='Nama Petugas'
                        />
                    </div>
                </div>
                <div>
                    <Input.Label htmlFor='keterangan'>
                        keterangan
                    </Input.Label>
                    <textarea
                        defaultValue={model.keterangan}
                        onChange={onChange}
                        name='keterangan'
                        placeholder='Keterangan'
                        className='py-1 w-full px-4 otline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    ></textarea>
                    {errors.keterangan && (
                        <Input.Error errors={errors.keterangan} />
                    )}
                </div>
                <div>
                    <Input.Label htmlFor='keterangan'>
                        Status
                    </Input.Label>
                    <select
                        defaultValue={data.status}
                        onChange={onChange}
                        className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                        placeholder='Select Golongan Darah'
                        name='status'
                    >
                        <option value={data.status}>{data.status}</option>
                        <option value='verifikasi'>verifikasi</option>
                        <option value='berhasil'>berhasil</option>
                    </select>
                </div>
                <div className='flex gap-2'>
                    <Button
                        className={'bg-green-600 text-white'}
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                    <Button
                        className={'bg-red-600 text-white'}
                        onClick={() => onClose()}
                    >
                        Cancell
                    </Button>
                </div>
            </form>
        </div>
    );
}
