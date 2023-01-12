import React from "react";
import App from "../../../Layouts/App";
import Button from "../../../Components/Button";
import UseModal from "../../../CostumHook/Modal/UseModal";
import Modal from "../../../Components/Modal";
import RegistrasiCreate from "../../../Components/Registrasi/RegistrasiCreate";
import Permintaan from './Permintaan'
export default function Home() {
    const {
        open: registrasiModal,
        close: registrasiClose,
        modal: registrasiTrigger,
    } = UseModal();
    const {
        open: permintaanModal,
        close: permintaanClose,
        modal: permintaanTrigger,
    } = UseModal();
    return (
        <div className="w-full overflow-x-hidden">
            <div>
            <Modal
                    size={
                        "w-[95%] md:w-[50%] lg:w-[50%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                    }
                    trigger={permintaanTrigger}
                    closeModal={permintaanClose}
                    headerTitle={"Permintaan Donor Darah"}
                >
                    <Permintaan onClose={permintaanClose}/>
                </Modal>
                <Modal
                    size={
                        "w-[95%] md:w-[80%] lg:w-[80%] h-[70%] md:h-[80%] overflow-y-scroll md:overflow-y-auto overflow-x-hidden"
                    }
                    trigger={registrasiTrigger}
                    closeModal={registrasiClose}
                    headerTitle={"Registrasi Donor Darah"}
                >
                    <RegistrasiCreate onClose={registrasiClose}/>
                </Modal>
            </div>
            <div className="hidden md:flex ">
                <img
                    src="/images/asd.png"
                    alt=""
                    className="w-[45vw] absolute bottom-0 left-0"
                />
                <img
                    src="/images/2.png"
                    alt=""
                    className="w-[15vw] absolute bottom-0 right-0"
                />
            </div>
            <div className="hidden md:block relative w-full h-[90vh]">
                <div className="absolute inset-x-2/4 inset-y-1/3 w-1/2">
                    <h3 className="font-roboto font-bold text-3xl text-white">
                        Rumah Sakit Daerah Mamuju
                    </h3>
                    <p className="text-white text-md font-montserat font-light">
                        Selamat datang di aplikasi registrasi donor darah,
                        sistem informasi ini merupakan sistem informasi yang
                        digunakan untuk melakukan pendaftaran registrasi donor
                        darah, serta untuk melakukan permintaan darah pada rumah
                        sakit daerah mamuju
                    </p>
                    <p className="my-2.5 text-white text-md font-montserat font-light">
                        Untu melakukan Pendaftaran Donor Darah silahkan tekan
                        tombol dibawah ini
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => registrasiModal()}
                            className={"text-white bg-red-500"}
                        >
                            Registrasi Donor
                        </Button>
                        <Button
                        onClick={() => permintaanModal()}
                            className={"text-white bg-red-500"}>
                            Request Permintaan Darah
                        </Button>
                    </div>
                </div>
            </div>
            <div className="md:hidden h-full flex flex-col justify-center my-[40%] px-8">
                <h3 className="font-roboto font-bold text-3xl text-white">
                    Rumah Sakit Daerah Mamuju
                </h3>
                <p className="text-white text-md font-montserat font-light">
                    Selamat datang di aplikasi registrasi donor darah, sistem
                    informasi ini merupakan sistem informasi yang digunakan
                    untuk melakukan pendaftaran registrasi donor darah, serta
                    untuk melakukan permintaan darah pada rumah sakit daerah
                    mamuju
                </p>
                <p className="my-2.5 text-white text-md font-montserat font-light">
                    Untu melakukan Pendaftaran Donor Darah silahkan tekan tombol
                    dibawah ini
                </p>
                <div className="flex gap-3">
                    <Button
                        onClick={() => registrasiModal()}
                        className={"text-white bg-red-500"}
                    >
                        Registrasi Donor
                    </Button>
                    <Button onClick={() => permintaanModal()} className={"text-white bg-red-500"}>
                        Request Permintaan Darah
                    </Button>
                </div>
            </div>
            <div className="">
                {/* <h3 className='font-roboto text-4xl font-bold text-white'>RSUD MAMUJU</h3> */}
            </div>
        </div>
    );
}
Home.layout = (page) => <App children={page} />;
