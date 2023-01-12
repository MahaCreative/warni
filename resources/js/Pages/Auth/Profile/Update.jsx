import { useForm } from '@inertiajs/inertia-react';
import React, { useEffect } from 'react';
import Button from '../../../Components/Button';
import Input from '../../../Components/Input';

export default function Update({ user }) {
    console.log(user);
    const { data, setData, put, errors, reset } = useForm({
        id: user.id,
        name: '',
        email: '',
        password: '',
    });
    useEffect(() => {
        setData({
            id: user[0].id,
        name: user[0].name,
        email: user[0].email,
            password: '',
            password_confirmation:''
        });
    }, [user]);
    const submitHandler = () => {
        put(route('admin-users-update'))
    } 
    const onChange = (e) => {
        setData({...data, [e.target.name]:e.target.value})
    }
    return (
        <div>
            
            <form action=''>
                <div className='flex flex-col gap-y-3'>
                    <Input onChange={onChange} type='text' placeholder='Name' name='name' value={data.name}/>
                    {errors.name && (
                                    <Input.Error errors={errors.name} />
                                )}
                    <Input onChange={onChange} type='text' placeholder='Email' name='email' value={data.email} />
                    {errors.email && (
                                    <Input.Error errors={errors.email} />
                                )}
                    <Input onChange={onChange}
                        type='password'
                        placeholder='Password'
                        name='password'
                    />
                      {errors.password && (
                                    <Input.Error errors={errors.password} />
                                )}
                    <Input onChange={onChange}
                        type='password'
                        placeholder='Password_confirmation'
                        name='password_confirmation'
                    />
                      {errors.password && (
                                    <Input.Error errors={errors.password} />
                                )}
                    <div className='flex'>
                        <Button onClick={submitHandler} className={'bg-blue-500 text-white'}>
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
