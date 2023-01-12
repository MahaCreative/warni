import { Link } from "@inertiajs/inertia-react";
import clsx from "clsx";
import React from "react";
import Moment from "react-moment";
import Paralax from "../../../Components/Slider/Paralax";
import Guest from "../../../Layouts/App";

export default function Index(props) {
    const { data: event, meta, links } = props.event;
    const eventBerlangsung = props.event_berlangsung;
    const event_terbaru = props.event_terbaru;
    return (
        <div className="bg-white">
            <div className="w-full h-[60vh]">
                <Paralax model={event}></Paralax>
            </div>
            <div className="flex flex-col md:flex-row gap-3 py-4 px-6 items-start font-fira">
                <div className="w-[80%]">
                    <h3 className="border-b-4 border-red-500 text-4xl inline-block my-4 font-fira font-semibold">
                        Event Terbaru
                    </h3>
                    {event.length > 0 ? (
                        <div
                            className={clsx(
                                event.length > 3 ? "xl:grid-cols-4" : "",
                                "grid grid:cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                            )}
                        >
                            {event
                                ? event.map((item, key) => (
                                      <div className="shadow-md shadow-gray-400/30 py-2.5 px-4">
                                          <div className="relative min-h-[25vh] w-[100%] bg-red-500 ">
                                              <p className="absolute z-10 bottom-[1vh] left-[1vw] bg-red-500/50 backdrop-blur-sm text-white font-fira px-3 py-1 rounded-md inline-block">
                                                  <Moment
                                                      fromNow
                                                      date={item.created_at}
                                                  />
                                              </p>
                                              <img
                                                  className="relative max-h-[25vh] w-[100%] object-fill object-center"
                                                  src={
                                                      "storage/" +
                                                      item.thumbnail
                                                  }
                                                  alt=""
                                              />
                                          </div>
                                          <article className="relative block">
                                              <Link
                                                  href={route(
                                                      "event-show",
                                                      item.slug
                                                  )}
                                              >
                                                  <h3 className="duration-300 ease-out transition hover:cursor-pointer hover:text-red-500 text-red-500 font-fira font-semibold text-lg capitalize">
                                                      {item.judul}
                                                  </h3>
                                              </Link>
                                              {/* <p className='line-clamp-3' ></p> */}
                                              <p
                                                  className="text-base line-clamp-4 my-1.5 text-gray-700 font-fira"
                                                  dangerouslySetInnerHTML={{
                                                      __html: item.kontent,
                                                  }}
                                              ></p>
                                          </article>
                                          <div className="flex items-center justify-between">
                                              <p className="font-fira font-extralight text-sm text-gray-400">
                                                  {item.tanggal_mulai}
                                              </p>
                                              <p className="font-fira font-extralight text-sm text-gray-400">
                                                  {item.tanggal_berakhir}
                                              </p>
                                          </div>
                                      </div>
                                  ))
                                : ""}
                        </div>
                    ) : (
                        <div className="border border-red-500 py-2.5 px-5 items-center text-center rounded-lg">
                            <h3>Belum Ada Data Event</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => <Guest children={page} />;
