import { usePage } from '@inertiajs/inertia-react';
import { now } from 'lodash';
import { isDate } from 'moment/moment';
import React from 'react';

export default function Cetak({ children, title }) {
    const current = new Date();
    const { auth } = usePage().props
    
    const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  
    return (
        <div className='py-2 px-6 w-full'>
            <div className='flex items-center text-center justify-center flex-col py-2.5 border-b-4 border-black'>
                <p className='font-bold text-2xl'>Rumah Sakit Daerah Mamuju </p>
                <p className='text-sm'>{title}</p>
                
            </div>
            <div className='w-full'>
                <div className='flex justify-between my-3'>
                    <div>Print User By : { auth.user.name}</div>
                    <div>Print Date : { date}</div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}
