import { useForm, usePage } from '@inertiajs/inertia-react';
import { Backdrop, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Create({ onClose }) {
    const { auth } = usePage().props;
    const {golongan} = usePage().props
    const { data, setData, errors, post, reset } = useForm({
        nama: '',
        tanggal_lahir: '',
        gol_darah: '',
        tanggal_lahir: '',
        jumlah_permintaan: '',
        keterangan: '',
    });
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('permintaan-user'), {
            onStart: () => handleToggle(true),
            onError: () => handleClose(),
            onFinish: () => {handleClose(),reset({nama: '',
            tanggal_lahir: '',
            gol_darah: '',
            tanggal_lahir: '',
            jumlah_permintaan: '',
            keterangan: ''})}
        });
    };
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (e) => {
        setOpen(e);
    };
    return (
        <div>
             <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form>
                <div className='flex md:flex-row flex-col gap-2'>
                    <div>
                        <Input.Label htmlFor='nama'>
                            Nama Lengkap
                        </Input.Label>
                        <Input
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
                            <option defaultValue={''} disabled>
                                Select Golongan Darah
                            </option>
                            {golongan
                                ? golongan[0].map((item) => (
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
                            onChange={onChange}
                            type='number'
                            name='jumlah_permintaan'
                            placeholder='Jumlah Permintaan'
                            min={1} max={5}                        />
                        {errors.jumlah_permintaan && (
                            <Input.Error errors={errors.jumlah_permintaan} />
                        )}
                    </div>
                </div>
                <div>
                    <Input.Label htmlFor='keterangan'>
                        keterangan
                    </Input.Label>
                    <textarea
                        onChange={onChange}
                        name='keterangan'
                        placeholder='Keterangan'
                        className='py-1 w-full px-4 otline-none rounded-md shadow-md text-gray-900 border border-dashed border-gray-900 placeholder:text-gray-900 focus:ring focus:ring-gray-700/50 focus:ring-offset-2 focus:shadow-md accent-blue-600'
                    ></textarea>
                    {errors.keterangan && (
                        <Input.Error errors={errors.keterangan} />
                    )}
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
                        type='button'
                        onClick={() => onClose()}
                    >
                        Cancell
                    </Button>
                </div>
            </form>
        </div>
    );
}
