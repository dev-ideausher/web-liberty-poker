"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import StakeUser from "@/icons/StakeUser";
import FreeBadge from "@/components/FreeBadge";
import Lock from "@/icons/Lock";
import AskForDepositeModal from "../Popups/AskForDepositeModal";
import Rat from "@/icons/Rat";
import Cat from "@/icons/Cat";
import Dog from "@/icons/Dog";

export default function EntranceAmount({ title, data, setSelectedSubTier, setSelectedTier, joined=false, timer=false }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [depositeModal, setDepositeModal] = useState(false);

  const depositeModalHandler = () => setDepositeModal(!depositeModal)

  const handleButtonClick = () => {
    if (data?.isLocked) return;
    setShowOptions(!showOptions);
  };

  const selectOne = (item) => {
    setSelectedItem(item);
    setSelectedSubTier(item)
    setSelectedTier(data)
    setShowOptions(false);  // auto close on select (optional)
  };

  return (
    <div>
      <Button
        variant="secondary"
        className="flex flex-col gap-2 items-center relative px-6 py-3 rounded-full min-w-[470px] w-fit h-fit"
        onClick={handleButtonClick}
      >
        <div className="flex gap-2 items-center">
          {data?.minAccountType === "Human" &&<StakeUser />}
          {data?.minAccountType === "Rat" &&<Rat />}
          {data?.minAccountType === "Cat" &&<Cat />}
          {data?.minAccountType === "Dog" &&<Dog />}

          {!showOptions && (
            <h5 className="normal-text-shadow font-semibold text-primary text-[28px]">
              {selectedItem
                ? `${selectedItem.minBuy} - ${selectedItem.maxBuy} $`
                : title}
            </h5>
          )}

          {showOptions && (
            <div className="grid grid-cols-2 gap-2 z-10">
              {data?.subTiers.map((item) => (
                <p
                  key={item._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOne(item);
                  }}
                  className={`cursor-pointer rounded-full px-2 py-0.5 font-semibold transition-all text-xl bg-[#480000BF] text-primary ${
                    selectedItem?._id === item._id ? "" : "opacity-50"
                  }`}
                >
                  {item.minBuy} - {item.maxBuy} $
                </p>
              ))}
            </div>
          )}
        </div>

        {data?.minAccountType === "Human" && (
          <div className="absolute -top-6 -right-7">
            <FreeBadge />
          </div>
        )}

        {data?.isLocked && (
          <div
            onClick={depositeModalHandler}
            className="w-full h-full absolute top-0 left-0 bg-[#00000080] cursor-pointer rounded-full flex items-center justify-center"
          >
            <Lock />
          </div>
        )}
      </Button>

      {depositeModal && <AskForDepositeModal exitHandler={depositeModalHandler} />}

      {(joined || timer) && (
        <div className="flex gap-1 mt-1">
          {joined && (
            <p className="uppercase font-bold text-base text-primary only-dark-gradient px-2 py-0.5 rounded-full">
              joined
            </p>
          )}
          {timer && (
            <p className="uppercase font-normal text-base text-primary only-dark-gradient px-5 py-0.5 rounded-full">
              1d 13h 22m 10s
            </p>
          )}
        </div>
      )}
    </div>
  );
}
