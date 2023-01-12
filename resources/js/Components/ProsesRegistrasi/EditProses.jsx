import { useForm, usePage } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react'
import Input from '../Input'
import Button from '../Button'
export default function ProsesUpdate({model, onClose}) {
    const { auth } = usePage().props;
    const { data, setData, errors, patch, reset } = useForm({
        model_id: model.id,
        petugas: model.nama_petugas,
        jumlah_darah: model.jumlah_darah,
        tekanan_darah: model.tekanan_darah,
        status: model.status,
        keterangan: model.keterangan,
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault()
        patch(route('update-proses-registrasi', model.id), {
            onSuccess: () => { onClose(), reset() }
        });
    };
    useEffect(() => {
        setData({
            ...data,
            model_id: model.id,
            petugas: model.nama_petugas,
            jumlah_darah: model.jumlah_darah,
            tekanan_darah: model.tekanan_darah,
            status: model.status,
            keterangan: model.keterangan,
        });
    }, [model]);
  return (
      <div>
          <div className='bg-gray-200/20 py-1.5 px-3 rounded-md font-montserat font-extralight'>
              <p>Data registrasi donor darah yang akan diproses adalah</p>
              <div className='flex capitalize gap-3 text-sm md:text-base lg:text-lg'>
                  <p>Kode Registrasi Donor: </p>
                  <p> {model.kode_registrasi}</p>
              </div>
              <div className='flex capitalize gap-3 text-sm md:text-base lg:text-lg'>
                  <p>Nama Pendonor: </p>
                  <p> {model.nama}</p>
              </div>
              <div className='flex capitalize gap-3 text-sm md:text-base lg:text-lg'>
                  <p>Golongan Darah: </p>
                  <p> { model.golongan_darah}</p>
              </div>
              <div className='flex justify-between capitalize border-t border-gray-800'>
                  <div className='flex capitalize gap-3 text-sm md:text-base lg:text-lg'>
                      <p>Tanggal Proses: </p>
                      <p></p>
                  </div>
                  <div className='flex capitalize gap-3 text-sm md:text-base lg:text-lg'>
                      <p>User Name Petugas: </p>
                      <p>{ auth.user.name}</p>
                  </div>
              </div>
          </div>
          <form onSubmit={submitHandler}> 
          <div className='flex md:flex-row flex-col gap-3 '>
                <div>
                    <Input.Label>Jumlah Darah: </Input.Label>
                    <Input
                        onChange={onChange}
                        type='number'
                        placeholder='Jumlah Darah'
                        name='jumlah_darah'
                        defaultValue={model.jumlah_darah}
                        min={1} max={5}
                    />
                    {errors && <Input.Error errors={errors.jumlah_darah} />}
                </div>
                <div>
                    <Input.Label>Tekanan Darah: </Input.Label>
                    <Input
                        onChange={onChange}
                        placeholder='Tekanan Darah'
                        name='tekanan_darah'
                        defaultValue={model.tekanan_darah}
                    />
                    {errors && <Input.Error errors={errors.tekanan_darah} />}
                </div>
            <div className='my-1'>
                <Input.Label>Status model: </Input.Label>
                <select
                    onChange={onChange}
                    className='w-full py-1 px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    placeholder='Select Jenis Kelamin'
                    name='status'
                >
                    <option defaultValue={model.status}>{model.status}</option>
                    <option value='berhasil'>Berhasil</option>
                    <option value='gagal'>Gagal</option>{' '}
                </select>
                {errors && <Input.Error errors={errors.status} />}
            </div>
            </div>
            <div className='my-1'>
                <Input.Label>Keterangan: </Input.Label>
                <textarea
                    defaultValue={model.keterangan}
                    onChange={onChange}
                    name='keterangan'
                    placeholder='Keterangan'
                    className='py-1 w-full px-4 outline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                ></textarea>
                {errors && <Input.Error errors={errors.Keterangan} />}
            </div>
            <div className="flex gap-1">
                    <Button type="submit" className={"text-white bg-green-500"}>
                        Proses
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onClose()}
                        className={"text-white bg-red-500"}
                    >
                        Cancell
                    </Button>
                </div>
          </form>
    </div>
  )
}
