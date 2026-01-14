"use client";
import React, { Fragment, useRef, useState } from "react";
import UserInfoModal from "./UserInfoModal";
import ReportUserModal from "./ReportUserModal";
import Turn from "@/animations/Turn";
import { BounceLoader } from "react-spinners";

export default function PlayerPosition({
  className,
  position,
  player,
  hasTurn,
  playerTurn,
  meter,
  isSmallBlind,
  isBigBlind,
  isDealer,
  badgePosition,
  cardsposition,
  ownView = false,
  status,
  index,
  myposition,
  children,
}) {
  const playerRef = useRef(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const infoModalHandler = () => setShowInfoModal(!showInfoModal);
  const reportModalHandler = () => setShowReportModal(!showReportModal);

  const opacity = {
    waiting: "opacity-35",
    folded: "opacity-50",
    "all-in": "opacity-70",
  };
  console.log(className,
    position,
    player,
    hasTurn,
    playerTurn,
    meter,
    isSmallBlind,
    isBigBlind,
    isDealer,
    badgePosition,
    cardsposition,
    ownView = false,
    status,
    index,
    myposition,)
  return (
    <div
      style={{ top: `${position.top}`, left: `${position.left}` }}
      className={`${hasTurn ? "animate" : ""} absolute ${
        className || ""
      } flex flex-wrap items-center justify-center z-30`}
    >
      <div
        onClick={infoModalHandler}
        className={`cursor-pointer relative flex flex-col items-center justify-center ${opacity[status]}`}
      >
        {/* Turn loader */}
        {hasTurn && !ownView && (
          <div className="absolute" style={{ top: "-13px" }}>
            <BounceLoader size={"90px"} color="#fff" />
          </div>
        )}

        {/* Avatar */}
        <div className="size-28 relative">
          <img
            src="/images/cat.png"
            className={`rounded-full size-28 border-8 ${
              hasTurn ? "border-success" : "border-black"
            }`}
          />
        </div>

        {/* Badge */}
        <div
          className="flex flex-col relative items-center justify-center py-1 px-3 w-[100px] overflow-hidden rounded-md -mt-2.5"
          style={{
            zIndex: 999,
            background: hasTurn
              ? "#2ED777"
              : "#000000",
          }}
        >
          {hasTurn && <Turn trigger={hasTurn} user={player.user.username} />}
          <h5 className="text-white text-xs font-inter text-center truncate">
            {myposition} {player.user.username}
          </h5>
          <h4 className="font-inter text-sm text-white font-semibold">
            {player.chipsInPlay}
          </h4>
        </div>
      </div>

      {/* Cards */}
      {!(status == "waiting" || status == "folded") && (
        <div className="relative">
          <div
            className="absolute"
            style={
              cardsposition == "right"
                ? { top: "-60px", left: "-15px" }
                : cardsposition == "left"
                ? { top: "-60px", left: "-140px" }
                : { top: "-75px", left: "-110px" }
            }
          >
            <div className="w-12 h-20">{children}</div>
          </div>
        </div>
      )}

      {/* Meter */}
      {meter && ownView && (
        <div
          className="text-white bottom-0 right-0 flex flex-wrap w-[220px] absolute"
          style={{ right: "-55%", bottom: "-15px" }}
        >
          <div className="w-full bg-[rgba(0,0,0,0.25)] border border-[#ECF0F1] h-3 rounded-full mt-3 grid grid-cols-8 gap-0.5 px-0.5">
            {[12.5, 25, 37.5, 50, 62.5, 75, 87.5].map((n, i) => (
              <div
                key={i}
                className={`h-1.5 rounded ${
                  parseFloat(meter.probability) > n
                    ? i < 2
                      ? "bg-[#FF4A11]"
                      : i < 5
                      ? "bg-[#FFF500]"
                      : "bg-[#00D455]"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Badges */}
      {isDealer && isDealer?.player?._id == player?._id && (
        <img
          src="/images/dealer.svg"
          className="size-6 absolute"
          style={{ top: badgePosition.top, left: badgePosition.left }}
        />
      )}
      {isSmallBlind && isSmallBlind.player._id == player._id && (
        <img
          src="/images/small-blind.svg"
          className="size-6 absolute"
          style={{ top: badgePosition.top, left: badgePosition.left }}
        />
      )}
      {isBigBlind && isBigBlind.player._id == player._id && (
        <img
          src="/images/big-blind.svg"
          className="size-6 absolute"
          style={{ top: badgePosition.top, left: badgePosition.left }}
        />
      )}

      {/* Modals */}
      {showInfoModal && (
        <UserInfoModal
          exitHandler={infoModalHandler}
          reportHandler={reportModalHandler}
          position={position}
        />
      )}
      {showReportModal && (
        <ReportUserModal
          exitHandler={reportModalHandler}
          position={position}
        />
      )}
    </div>
  );
}
