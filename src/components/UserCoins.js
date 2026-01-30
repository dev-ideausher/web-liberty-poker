import React, { useEffect, useMemo, useState } from "react";

const UserCoins = ({ coinValue, topP, leftP, from = "bottom" }) => {
  const [imgError, setImgError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const imageSrc = `/images/StackCoins/${coinValue}.svg`;

  useEffect(() => {
    setMounted(false);
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [coinValue, topP, leftP, from]);
  
//   console.log(topP, leftP)
  const fromClass = useMemo(() => {
    switch (from) {
      case "left":
        return mounted ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0";
      case "right":
        return mounted ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0";
      case "top":
        return mounted ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0";
      case "bottom":
      default:
        return mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0";
    }
  }, [from, mounted]);

  return (
    <div
      className={`flex flex-col items-center absolute transition-all duration-300 ease-out ${fromClass}`}
      style={{ top: parseInt(topP)+27, left: parseInt(leftP)-10 }}
    >
      {!imgError ? (
        <img
          src={imageSrc}
          alt={String(coinValue)}
          onError={() => setImgError(true)}
          className="h-[26px] w-[42px] object-cover"
        />
      ) : (
        <span className="bg-[#2ED777] font-inter text-xs py-0.5 px-2 rounded-full font-medium w-fit flex justify-center">
          {coinValue}
        </span>
      )}
    </div>
  );
};

export default UserCoins;
