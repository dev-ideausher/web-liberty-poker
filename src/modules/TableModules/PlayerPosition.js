"use client";
import React, { useRef, useState } from "react";
import UserInfoModal from "./UserInfoModal";
import ReportUserModal from "./ReportUserModal";
import Turn from "@/animations/Turn";
import { BounceLoader } from "react-spinners";
import CircularTurnTimer from "./CirculartTimer";
import UserCoins from "@/components/UserCoins";

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
  away, // <-- boolean now
  bet
}) {
  const playerRef = useRef(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const isAway = !!away;
  console.log(bet)
  const infoModalHandler = () => {
    if (!ownView) setShowInfoModal(!showInfoModal);
  };
  const reportModalHandler = () => setShowReportModal(!showReportModal);

  const opacity = {
    waiting: "opacity-35",
    folded: "opacity-50",
    "all-in": "opacity-70",
  };

  const opacityClass = isAway ? "opacity-60" : opacity[status] || "";

  return (
    <div
      style={{ top: `${position.top}`, left: `${position.left}` }}
      className={`${hasTurn ? "animate" : ""} absolute ${
        className || ""
      } flex flex-wrap items-center justify-center z-40`}
    >
      <div
        onClick={infoModalHandler}
        className={`cursor-pointer relative flex flex-col items-center justify-center ${opacityClass}`}
      >
        {/* Turn loader */}
        {hasTurn && !ownView && !isAway && (
          <div
            className="absolute"
            style={{
              top: "-10px",
              left: "-10px",
              zIndex: -1,
            }}
          >
            <BounceLoader size={130} color="#fff" />
          </div>
        )}

        {/* Avatar */}
        <div className="size-28 relative">
          <CircularTurnTimer
            seconds={30}
            active={hasTurn && !isAway}
            size={112}
          />
          <img
            src="/images/cat.png"
            className={`rounded-full size-28 border-8 ${
              hasTurn ? "border-transparent" : "border-black"
            } relative`}
          />
        </div>

        {/* Badge */}
        <div
          className="flex flex-col bg-black relative items-center justify-center py-1 px-3 w-[100px] overflow-hidden rounded-md -mt-2.5"
          style={{
            zIndex: 40,
            color: hasTurn ? "#2ED777" : "#fff",
          }}
        >
          {hasTurn && <Turn trigger={hasTurn} user={player.user.username} />}
          <h5 className=" text-xs font-inter text-center truncate">
            {myposition} {player.user.username}
          </h5>
          <h4 className="font-inter text-sm font-semibold">
            {Number.isInteger(player?.chipsInPlay || 0)
              ? player.chipsInPlay
              : Number(player.chipsInPlay || 0).toFixed(2)}
          </h4>
        </div>
      </div>

      {/* Cards */}
      {!(status === "waiting" || status === "folded") && (
        <div className="relative">
          <div
            className="absolute"
            style={
              cardsposition === "right"
                ? { top: "-60px", left: "-15px" }
                : cardsposition === "left"
                ? { top: "-60px", left: "-140px" }
                : { top: "-75px", left: "-110px" }
            }
          >
            <div className="w-12 h-20">{children}</div>
          </div>
        </div>
      )}

      {/* Away badge */}
      {isAway && (
        <div className="rounded-md bg-black/40 flex items-center justify-center px-2 py-0.5">
          <span className="text-white text-xs font-semibold tracking-wide">
            AWAY
          </span>
        </div>
      )}

      {/* Meter */}
      {meter && ownView && (
        <div
          className="text-white bottom-0 left-0 flex flex-wrap w-[200px] absolute z-20"
          style={{ right: "-55%", bottom: "-15px" }}
        >
          <div className="w-full bg-[rgba(0,0,0,0.25)] border border-[#ECF0F1] h-3 rounded-full mt-3 grid grid-cols-8 items-center gap-0.5 p-0.5">
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
      {bet?.chipsInPot && parseFloat(bet?.chipsInPot) > 0 && (
        <UserCoins
          coinValue={bet.chipsInPot}
          topP={badgePosition.top}
          leftP={badgePosition.left}
          from={"bottom"}
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
        <ReportUserModal exitHandler={reportModalHandler} position={position} />
      )}
    </div>
  );
}
