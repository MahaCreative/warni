import React from 'react';
import Backend from '../../../Layouts/Backend';
import Breadcrumb from '../../../Components/Auth/Breadcrumb';
import Card from '../../../Components/Guest/Card';
import Tabs from '../../../Components/Tabs';
import Account from './Account'
import Profile from './Profile';
import Update from './Update';
export default function Index({ user, golDar }) {
    return (
        <div className='px-3 py-3 min-h-screen'>
            <Breadcrumb active={route().current('admin/event-donor')}>
                Profile
            </Breadcrumb>
            <div className='grid grid-cols-3 gap-x-3 py-3 min-h-[100%]'>
                <div className='col-span-1'>
                    <Card className={'min-h-[100%]'}>
                        <div className='flex text-white flex-col justify-center items-center w-full'>
                            <div className='w-24 h-24 rounded-full flex items-center justify-center border border-dashed border-gray-400/50'>
                                <img
                                    src='/images/donor.png'
                                    className=''
                                    alt=''
                                />
                            </div>
                            <p>Guntur Madjid</p>
                            <p>gunturmadjid.3@gmail.com</p>
                        </div>
                    </Card>
                </div>
                <div className='col-span-2'>
                    <Card>
                        <Tabs>
                            <Tabs.TabList>
                                <Tabs.TabItem>Akun User</Tabs.TabItem>
                                <Tabs.TabItem classNameItem={'rounded-tr-lg'}>
                                    Profile User
                                </Tabs.TabItem>
                            </Tabs.TabList>
                            <Tabs.TabPanels>
                                <Tabs.TabPanel>
                                    <p className='italic text-sm text-gray-800 py-2.5'>
                                        *Note Kosongkan email dan name jika
                                        tidak ingin mengganti name dan email
                                        anda!
                                    </p>
                                    <Update user={user} />
                                </Tabs.TabPanel>
                                {/* Profiles */}
                                <Tabs.TabPanel>
                                    <Profile user={user} golDar={golDar} />
                                </Tabs.TabPanel>
                            </Tabs.TabPanels>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => <Backend children={page} />;
