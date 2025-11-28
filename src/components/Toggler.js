"use client"
import { useState } from "react";

export default function Toggle({ onChange }) {
  const [enabled, setEnabled] = useState(false);

  const toggleHandler = () => {
    setEnabled(!enabled);
    onChange && onChange(!enabled);
  };

  return (
    <div
      onClick={toggleHandler}
      className={`
        flex items-center cursor-pointer transition-all duration-300
        w-[41px] h-[18px] p-[1.286px_14.643px_1.286px_1.286px]
        rounded-[64.286px]
        ${enabled ? "bg-[#F4E17E]" : "bg-[#99926B]"}
      `}
    >
      <div
        className={`
          rounded-[64.286px] bg-[#031603] w-[25.071px] h-[15.429px] flex-shrink-0
          transition-all duration-300
          ${enabled ? "translate-x-[13px]" : "translate-x-0"}
        `}
      ></div>
    </div>
  );
}
