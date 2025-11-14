import Button from "@/components/Button";
import HomeHeader from "@/modules/Headers/HomeHeader";
import HomeOptions from "@/modules/HomeOptions";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col justify-end items-center">
      <img src="/images/banners/landing.png" alt="bba" className="h-screen absolute w-full aspect-video" />
      <HomeHeader/>
      <div className="h-full z-20 w-full flex flex-col justify-end items-center pb-10">
        <h1 className="text-[48px] font-bebas text-primary leading-none">Welcome to Liberty Poker</h1>
        <Link href="/sit"><Button variant="primary" className="w-fit px-6 text-primary-props">PLAY NOW</Button></Link>
        <HomeOptions />
      </div>
    </div>
  );
}
