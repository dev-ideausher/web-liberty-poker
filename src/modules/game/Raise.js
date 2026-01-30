"use client";
import Button from "@/components/Button";
import Inputrange from "@/components/InputRange";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import Poker from "@/hooks/Poker";

export default function Raise({ data, closeHandler }) {
  const { playerAction } = Poker(); // if this hook is conditional INSIDE, that's the real issue

  const minRaise = data?.minRaiseAmount ?? 0;
  const maxRaise = data?.maxRaiseAmount ?? 0;

  const step = useMemo(() => {
    // keep step numeric and non-zero
    const s = data?.minRaiseAmount || 0.2;
    return Number(s) > 0 ? Number(s) : 0.2;
  }, [data?.minRaiseAmount]);

  const [amount, setAmount] = useState(minRaise);

  useEffect(() => {
    // when data updates, sync slider value
    setAmount(minRaise);
  }, [minRaise]);

  const raiseAmount = useCallback((val) => {
    setAmount(Number(val));
  }, []);

  const doRaise = useCallback(
    (val) => {
      playerAction({
        action: "raise",
        amount: parseInt(val, 10),
      });
      closeHandler(false);
    },
    [playerAction, closeHandler]
  );

  const raiseStepHandler = useCallback(
    (valOrEvent) => {
      // support passing value directly OR event (depending on Button implementation)
      const val =
        typeof valOrEvent === "number" || typeof valOrEvent === "string"
          ? valOrEvent
          : valOrEvent?.currentTarget?.value ?? valOrEvent?.target?.value;

      if (val == null) return;
      setAmount(Number(val));
      doRaise(val);
    },
    [doRaise]
  );

  const submitHandler = useCallback(() => {
    doRaise(amount);
  }, [doRaise, amount]);

  const raiseSteps = Array.isArray(data?.raiseSteps) ? data.raiseSteps : [];
  console.log(data)
  return (
    <div className="w-[420px] popup-bg absolute flex flex-wrap justify-center mt-10 rounded-lg px-4 py-3 -top-72 z-999">
      <div className="relative w-full flex">
        <button
          className="absolute right-0 top-0 cursor-pointer"
          onClick={() => closeHandler(false)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
              fill="#D21900"
            />
          </svg>
        </button>
      </div>

      <h2 className='heading-texts text-[40px] font-cinzel font-black text-center'>RAISE</h2>

      <div className="w-full bg-light-blue p-1.5 rounded-lg text-center font-inter font-medium my-3">
        {amount} USDT
      </div>

      <Inputrange
        min={minRaise}
        max={maxRaise}
        step={step}
        handler={raiseAmount}
      />

      <div className="w-full grid grid-cols-4 gap-2 mt-6">
        {raiseSteps.map((item, index) => (
          <Button
            key={index}
            value={item.value}
            variant="teal"
            buttontype="sm"
            className="rounded-lg"
            onClick={raiseStepHandler}
          >
            {item.label}
          </Button>
        ))}

        <Button
          variant="primary"
          buttontype="sm"
          className="border-transparent"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
