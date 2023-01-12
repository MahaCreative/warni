import React from "react";
import App from "../../../Layouts/App";
import Button from "../../../Components/Button";
import UseModal from "../../../CostumHook/Modal/UseModal";
import Modal from "../../../Components/Modal";
import RegistrasiCreate from "../../../Components/Registrasi/RegistrasiCreate";
export default function Index() {
    const {
        open: registrasiModal,
        close: registrasiClose,
        modal: registrasiTrigger,
    } = UseModal();
    return (
        <div className="w-full h-full overflow-x-hidden">
            <div>
                <Modal
                    size={
                        "w-[95%] md:w-[80%] lg:w-[80%] h-[70%] md:h-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                    }
                    trigger={registrasiTrigger}
                    closeModal={registrasiClose}
                    headerTitle={"Registrasi Donor Darah"}
                >
                    <RegistrasiCreate />
                </Modal>
            </div>
            <div className="hidden md:flex ">
                <img
                    src="/images/asd.png"
                    alt=""
                    className="w-[45vw] absolute bottom-0 left-0"
                />
            </div>
            <div className="hidden md:block relative w-full h-[90vh] py-8">
                <div className="absolute inset-x-2/4 inset-y-[15vh] w-1/2 text-white px-8 py-8">
                <h1 className='mb-2 font-montserat font-bold'>
                            Syarat Melakukan Donor
                        </h1>
                        <p>
                            Berikut ini syarat umum yang harus dipenuhi sebelum
                            melakukan donor darah:
                        </p>
                        <div className='flex flex-col gap-y-3 my-6 px-4'>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Umur minimal 17 tahun. Di usia ini, perkembangan tubuh telah sempurna. Sehingga, mendonorkan darah tidak mengganggu sistem kerja tubuh
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Berat badan minimal 45 kg. Kurang dari itu, pengurangan darah dikhawatirkan akan mengganggu keseimbangan sistem kerja tubuh.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Temperatur tubuh normal, antara 36,6 - 37,5 derajat Celsius.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Tekanan darah normal, yaitu sistole 110 - 160 mmHg, diastole 70 - 100 mmHg.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Denyut nadi teratur, yaitu sekitar 50 - 100 kali/ menit.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Haemoglobin wanita minimal 12 gram%, pria minimal 13 gram%.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Frekuensi donor darah maksimal 5 kali setahun, atau berjarak minimal 3 bulan.
                            </div>
                        </div>
                        <p>
                            Itulah beberapa syarat umum yang perlu dipenuhi
                            sebelum donor darah. Perlu diketahui, kamu bisa
                            mendonorkan darah maksimal lima kali setahun, dengan
                            jangka waktu minimal 3 bulan. Sebelum donor darah,
                            calon donor dapat mengambil dan menandatangani
                            formulir pendaftaran, lalu menjalani pemeriksaan
                            pendahuluan, seperti kondisi berat badan, HB,
                            golongan darah, dan dilanjutkan dengan pemeriksaan
                            dokter.
                        </p>
                </div>
            </div>
            <div className="md:hidden h-full flex flex-col justify-center my-[20%] px-8 text-white">
            <h1 className='mb-6'>
                            Ini Syarat yang Harus Dipenuhi Sebelum Donor Darah
                        </h1>
                        <p>
                            Berikut ini syarat umum yang harus dipenuhi sebelum
                            melakukan donor darah:
                        </p>
                        <div className='flex flex-col gap-y-3 my-6 px-4'>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Umur minimal 17 tahun. Di usia ini, perkembangan tubuh telah sempurna. Sehingga, mendonorkan darah tidak mengganggu sistem kerja tubuh
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Berat badan minimal 45 kg. Kurang dari itu, pengurangan darah dikhawatirkan akan mengganggu keseimbangan sistem kerja tubuh.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Temperatur tubuh normal, antara 36,6 - 37,5 derajat Celsius.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Tekanan darah normal, yaitu sistole 110 - 160 mmHg, diastole 70 - 100 mmHg.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Denyut nadi teratur, yaitu sekitar 50 - 100 kali/ menit.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Haemoglobin wanita minimal 12 gram%, pria minimal 13 gram%.
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-lg shadow-md shadow-gray-400/50 py-2.5 px-4'>
                            Frekuensi donor darah maksimal 5 kali setahun, atau berjarak minimal 3 bulan.
                            </div>
                        </div>
                        <p>
                            Itulah beberapa syarat umum yang perlu dipenuhi
                            sebelum donor darah. Perlu diketahui, kamu bisa
                            mendonorkan darah maksimal lima kali setahun, dengan
                            jangka waktu minimal 3 bulan. Sebelum donor darah,
                            calon donor dapat mengambil dan menandatangani
                            formulir pendaftaran, lalu menjalani pemeriksaan
                            pendahuluan, seperti kondisi berat badan, HB,
                            golongan darah, dan dilanjutkan dengan pemeriksaan
                            dokter.
                        </p>
            </div>
            <div className="">
                {/* <h3 className='font-roboto text-4xl font-bold text-white'>RSUD MAMUJU</h3> */}
            </div>
        </div>
    );
}
Index.layout = (page) => <App children={page} />;
