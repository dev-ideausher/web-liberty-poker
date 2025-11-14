"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import StakeUser from "@/icons/StakeUser";
import FreeBadge from "@/components/FreeBadge";
import Lock from "@/icons/Lock";

export default function EntranceAmount({ title, amount = [], free=false, locked=false, joined=false, timer=false }) {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleButtonClick = () => {
        if(locked) return
        setShowOptions(!showOptions)
    }

    const toggleSelect = (item) => {
        setSelectedItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    return (
        <div className="">
            <Button
                variant="secondary"
                className="flex flex-col gap-2 items-center relative px-6 py-3 rounded-full min-w-[420px] h-fit"
                onClick={handleButtonClick}
            >
                <div className="flex gap-2 items-center">
                    <StakeUser />
                    {!showOptions && <h5 className="normal-text-shadow font-semibold text-primary text-[28px]">
                    {selectedItems.length > 0 ? selectedItems.join(", ") : title}
                    </h5>}
                    {showOptions && (
                    <div className="grid grid-cols-2 gap-2 z-10">
                    {amount.map((item, index) => {
                        const isSelected = selectedItems.includes(item);
                        return (
                        <p
                            key={index}
                            onClick={(e) => {
                            e.stopPropagation(); // prevent re-toggle
                            toggleSelect(item);
                            }}
                            className={`cursor-pointer rounded-full px-2 py-0.5 font-semibold transition-all text-xl bg-[#480000BF] text-primary ${
                            isSelected
                                ? ""
                                : " opacity-50"
                            }`}
                        >
                            {item}
                        </p>
                        );
                    })}
                    </div>
                )}
                </div>
                {free && <div className=" absolute -top-6 -right-7"><FreeBadge/></div>}
                {locked && <div className="w-full h-full absolute top-0 left-0 bg-[#00000080] rounded-full flex items-center justify-center">
                    <Lock/>
                </div>}
            </Button>
            {(joined || timer) && <div className="flex gap-1 mt-1">
                {joined && <p className=" uppercase font-bold text-base text-primary only-dark-gradient px-2 py-0.5 rounded-full">joined</p>}
                {timer && <p className=" uppercase font-normal text-base text-primary only-dark-gradient px-5 py-0.5 rounded-full">1d 13h 22m 10s</p>}
            </div>}
        </div>
    );
}
