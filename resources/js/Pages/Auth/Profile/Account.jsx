import { useForm } from '@inertiajs/inertia-react';
import React from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Account({ user }) {
    console.log(user);
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
    });
    return (
        <div>
            <form action=''>
                <div className='flex flex-col gap-y-3'>
                    <Input type='text' placeholder='Name' name='name' />
                    <Input type='text' placeholder='Email' name='email' />
                    <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                    />
                    <Input
                        type='password'
                        placeholder='Password_confirmation'
                        name='password_confirmation'
                    />
                    <div className='flex'>
                        <Button className={'bg-blue-500 text-white'}>
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
