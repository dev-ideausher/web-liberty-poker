"use client";
import ProgressLoader from "@/components/ProgressLoader";
import { useWebSocket } from "@/context/socketContext";
import Poker from "@/hooks/Poker";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
// import { showErrorMessage } from "@/utils/toast"; // <- example, use your real path

export default function Page() {
  const router = useRouter();
  const socket = useWebSocket();
  const searchParams = useSearchParams();
  const { startGame } = Poker();

  const table = searchParams.get("table");

  const handler = () => {};

  const onCallStartGame = useCallback(
    (payload) => {
      if (!payload) return;

      if (payload.status) {
        // Guard: table must exist
        if (table) {
          router.push(`/table/${table}`);
        } else {
          // showErrorMessage("Table id missing");
          console.error("Table id missing");
        }

        startGame({});
      } else {
        // showErrorMessage(payload.message);
        console.error(payload.message);
      }
    },
    [router, startGame, table]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("callStartGame", onCallStartGame);

    return () => {
      socket.off("callStartGame", onCallStartGame);
    };
  }, [socket, onCallStartGame]);

  return (
    <div className="w-full min-h-screen relative">
      <img
        src="/images/banners/creating.png"
        alt="bba"
        className="h-screen absolute w-full aspect-video z-10"
      />
      <div className="w-full h-full absolute top-0 left-0 z-20 bg-linear-to-b from-[#00000000] to-[#00000099]"></div>

      <div className="layout-container h-screen flex flex-col justify-between pb-5 relative z-30">
        <div className="w-full flex items-center justify-between pt-5">
          <h2 className="normal-text-shadow text-[48px] uppercase font-normal font-bebas">
            Liberty Poker
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-[40px] font-normal text-primary normal-text-shadow text-center font-bebas leading-none">
            Creating Table For You
          </h2>

          <ProgressLoader duration={15} className="w-1/2" onComplete={handler} />

          <h1 className="text-[58px] text-primary font-normal font-bebas normal-text-shadow text-center leading-none mt-7">
            Earn 30% of commission for Life from Every Hand your Recruits Play
          </h1>

          <p className="text-[36px] font-normal text-primary normal-text-shadow text-center line-through">
            Learn More
          </p>
        </div>
      </div>
    </div>
  );
}
