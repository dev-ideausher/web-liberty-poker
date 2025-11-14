"use client";

import React, { useState } from "react";
import Button from "@/components/Button";
import DepositeLoader from "@/components/DepositeLoader";
import ChooseRankTable from "@/modules/ChooseRankTable";
import HomeOptions from "@/modules/HomeOptions";

export default function Page() {
  // ----------------------------
  // RANK STATE
  // ----------------------------
  const [selectedValue, setSelectedValue] = useState(0); 
  // this will be 0, 6, 14, 35, or 100 coming from DepositLoader

  // ----------------------------
  // MAP AMOUNT → RANK NAME
  // ----------------------------
  const rankMap = {
    0: "HUMAN",
    6: "RAT",
    14: "CAT",
    35: "DOG",
    100: "DOG (MAX)",
  };

  // ----------------------------
  // HANDLER FROM LOADER
  // ----------------------------
  const updateHandler = (value) => {
    // value will be string → convert to number
    const num = Number(value);

    if ([0, 6, 14, 35, 100].includes(num)) {
      setSelectedValue(num);
    } else {
      console.warn("Invalid rank received:", value);
    }
  };

  return (
    <div className={`w-full min-h-screen relative`}>
      <img
        src="/images/banners/choose-rank.png"
        alt="bba"
        className="h-full absolute w-full object-cover z-10"
      />

      <div className="w-full h-full absolute top-0 left-0 z-20 bg-linear-to-b from-[#00000000] to-[#00000099]"></div>

      <div className="layout-container flex flex-col items-center pb-10 relative z-30">
        <div className="w-full flex items-center justify-between pt-5">
          <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas">
            Liberty Poker
          </h2>
        </div>

        <h1 className="text-[80px] text-primary font-black font-cinzel glow-shadow text-center leading-none">
          Choose your rank
        </h1>

        <h2 className="text-[32px] font-normal font-ruso text-center leading-[110%] mt-1 glow-shadow">
          Make a deposit to jump to a rank now <br /> Then play 100 hands in the
          tier to promote
        </h2>

        {/* ------------------------------
             PASS THE SELECTED VARIANT
        ------------------------------ */}
        <ChooseRankTable variant={selectedValue} />

        {/* ------------------------------
             LOADER — UPDATES SELECTED RANK
        ------------------------------ */}
        <DepositeLoader updateHandler={updateHandler} targetPoint={selectedValue} />

        <div className="w-full">
          <Button
            variant={"outline-primary"}
            className={
              "w-fit mt-8 text-[32px] font-normal normal-text-shadow px-10 py-0.5"
            }
          >
            current
          </Button>
        </div>

        {/* ------------------------------
            DISPLAY SELECTED RANK & DEPOSIT
        ------------------------------ */}
        <div className="w-full mt-7 flex items-center justify-between">
          <div className="button-outline-primary px-10 py-2.5 w-fit pr-16 rounded-full">
            <h5 className="text-primary normal-text-shadow text-[32px] font-normal leading-none">
              Selected rank:{" "}
              <span className="font-bold">
                {rankMap[selectedValue] || "-"}
              </span>
              <br />
              Required deposit:{" "}
              <span className="font-bold">{selectedValue}$</span>
            </h5>
          </div>

          <Button className={"w-fit text-[48px] font-ruso font-normal"}>
            DEPOSIT & UPGRADE
          </Button>
        </div>

        <HomeOptions />
      </div>
    </div>
  );
}
