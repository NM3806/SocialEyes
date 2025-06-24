import { EllipsisHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import Image from "next/image";

export default function Widgets() {
    return (
        <div className="p-3 px-6 hidden lg:flex flex-col space-y-4 w-[400px] shadow-md">
            <div className="bg-gray-100 h-11 flex items-center space-x-3 rounded-full pl-5">
                <MagnifyingGlassIcon className="w-5 h-5" />
                <input type="text"
                    placeholder="Looking for Something?"
                    className="bg-transparent outline-none"
                />
            </div>

            <div className="bg-gray-100 rounded-xl p-3">
                <h1 className="text-xl font-bold mb-2">Keep an Eye on</h1>

                <div className="flex flex-col py-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Trending in India</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>

                    <span className="font-bold text-[15px]">#ReactJS</span>
                    <span className="text-gray-600 text-xs">250k Eyes</span>
                </div>
                <div className="flex flex-col py-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Trending in India</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>

                    <span className="font-bold text-[15px]">#ReactJS</span>
                    <span className="text-gray-600 text-xs">250k Eyes</span>
                </div>
                <div className="flex flex-col py-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Trending in India</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>

                    <span className="font-bold text-[15px]">#ReactJS</span>
                    <span className="text-gray-600 text-xs">250k Eyes</span>
                </div>
                <div className="flex flex-col py-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Trending in India</span>
                        <EllipsisHorizontalIcon className="w-5" />
                    </div>

                    <span className="font-bold text-[15px]">#ReactJS</span>
                    <span className="text-gray-600 text-xs">250k Eyes</span>
                </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-3">
                <h1 className="text-xl font-bold mb-2">Look Out For</h1>

                <div className="flex justify-between items-center py-3">
                    <div className="flex space-x-3 items-center">
                        <div>
                            <Image
                                src={"/pfps/linbaden.jpg"}
                                width={56}
                                height={56}
                                alt="pfp of LinBaden"
                                className="w-14 h-14 rounded-full" />

                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="font-bold">LinBaden</span>
                            <span>@aeroplaneboom</span>
                        </div>
                    </div>

                    <button className="bg-black text-white text-sm rounded-full w-19 h-10 cursor-pointer">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center py-3">
                    <div className="flex space-x-3 items-center">
                        <div>
                            <Image
                                src={"/pfps/linbaden.jpg"}
                                width={56}
                                height={56}
                                alt="pfp of LinBaden"
                                className="w-14 h-14 rounded-full" />

                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="font-bold">LinBaden</span>
                            <span>@aeroplaneboom</span>
                        </div>
                    </div>

                    <button className="bg-black text-white text-sm rounded-full w-19 h-10 cursor-pointer">
                        Follow
                    </button>
                </div>
                <div className="flex justify-between items-center py-3">
                    <div className="flex space-x-3 items-center">
                        <div>
                            <Image
                                src={"/pfps/linbaden.jpg"}
                                width={56}
                                height={56}
                                alt="pfp of LinBaden"
                                className="w-14 h-14 rounded-full" />

                        </div>
                        <div className="flex flex-col text-sm">
                            <span className="font-bold">LinBaden</span>
                            <span>@aeroplaneboom</span>
                        </div>
                    </div>

                    <button className="bg-black text-white text-sm rounded-full w-19 h-10 cursor-pointer">
                        Follow
                    </button>
                </div>
            </div>
        </div>

    );
}
