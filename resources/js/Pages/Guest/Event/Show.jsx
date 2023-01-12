import React from "react";
import Paralax from "../../../Components/Slider/Paralax";
import Guest from "../../../Layouts/App";
export default function Show(props) {
    const eventBerlangsung = props.event_berlangsung;
    const event = props.event;
    const event_terbaru = props.event_terbaru;
    const event_berakhir = props.event_berakhir;
    console.log(event);
    return (
        <div className="bg-white">
            <div className="w-full h-[60vh]">
                <Paralax model={eventBerlangsung}></Paralax>
            </div>
            <div className="flex flex-col md:flex-row gap-3 py-4 px-6 items-start font-fira">
                <div className="w-[100%] shadow-sm shadow-gray-300/40 py-3 px-4">
                    <h3 className="border-b-4 border-red-500 text-2xl inline-block my-4 font-fira font-semibold">
                        {event.judul}
                    </h3>
                    <div>
                        <p
                            dangerouslySetInnerHTML={{ __html: event.kontent }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
Show.layout = (page) => <Guest children={page} />;
