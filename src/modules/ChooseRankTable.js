"use client";

import React from "react";
import Instruction from "@/icons/Instruction";
import GreenTick from "@/icons/GreenTick";
import RedCross from "@/icons/RedCross";
import { TABLE_VARIANTS } from "@/utilities/helper";

export default function ChooseRankTable({ variant = 14 }) {
  const tableData = TABLE_VARIANTS[variant];

  const renderCell = (item) => {
    if (item.type === "heading") {
      return (
        <div className="flex items-center pl-5 gap-6 py-3.5 horizontal-gradient-border">
          <Instruction />
          <p className="text-[30px] font-normal normal-text-shadow text-primary">
            {item.label}
          </p>
        </div>
      );
    }

    if (item.type === "tick") {
      return (
        <div className="h-[73px] flex items-center justify-center horizontal-gradient-border w-full">
          <GreenTick />
        </div>
      );
    }

    if (item.type === "cross") {
      return (
        <div className="h-[73px] flex items-center justify-center horizontal-gradient-border w-full">
          <RedCross />
        </div>
      );
    }

    return (
      <p className="text-[30px] font-normal py-3.5 normal-text-shadow text-primary horizontal-gradient-border w-full text-center">
        {item.label}
      </p>
    );
  };

  return (
    <div className="w-full mt-10">
      <div className="w-full grid rank-table-grid">
        {tableData.map((col, colIndex) => (
          <div
            key={colIndex}
            className={`flex flex-col items-center vertical-gradient-border ${
              colIndex === tableData.length - 1 ? "border-r" : ""
            }`}
          >
            <h3 className="text-[30px] font-black py-3.5 normal-text-shadow uppercase text-primary">
              {col.title || "\u00A0"}
            </h3>

            {col.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="w-full">
                {renderCell(row)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
