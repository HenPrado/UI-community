import MintButton from "../components/MintButton";
import React, { SetStateAction, useEffect, useState } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useCandyMachine } from "../hooks/useCandyMachine";
import Spinner from "../components/Spinner";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import Header from "../components/Header";
import ScratchCard from "react-scratchcard-v2";
import { useRouter } from "next/router";
import axios from "axios";
import { useWindowSize } from "usehooks-ts";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";

const Home = () => {
  const { candyMachine, collection, collectionMeta, group } = useCandyMachine();
  // const [im] = React.useState(new Image());

  if (!candyMachine) {
    return (
      <div className="App">
        <MintButton loaded={false} />
      </div>
    );
  }

  // if(!imReady){
  //     im.onload = () => {
  //         setImReady(true);
  //     }
  //     im.src = collectionMeta ? collectionMeta.image : '';
  // }
  console.log(candyMachine);

  const router = useRouter();
  //@ts-ignore
  const [wonnothing, setwonnothing] = useState(false);
  const [showprize, setshowprize] = useState(false);
  const [disordid, setdisordid] = useState<any>("");
  const [open, setOpen] = useState(false);

  const prizes = [
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
    "nothing",
  ];
  //@ts-ignore
  const [prize, setprize] = useState(
    prizes[Math.floor(Math.random() * prizes.length)]
  );

  const { width, height } = useWindowSize();
  const [ip, setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://get-ip-only.herokuapp.com/");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, [prize]);

  const result = () => {
    setwonnothing(true);
    setshowprize(true);
    if (prize === "nothing") {
    } else {
      if (prize === "wl" || prize === "og" || prize === "free") {
        setTimeout(() => {
          setOpen(true);
        }, 2000);
      }
    }
  };

  return (
    <div className="bg-[#0F172A] h-screen w-full px-3 xl:px-10 py-5 relative overflow-hidden">
      <Header></Header>
      <div className=" text-white items-center flex flex-col md:flex-row justify-between ">
        <div className="flex-1 pr-10 justify-center relative  flex-col gap-5  w-full hidden md:flex">
          <img
            className="w-[200px] rotate-12 right-36 top-10 absolute noselect "
            src={`${router.basePath}/assets/images/nothing.png`}
            alt="Your Company"
          />
          <img
            className="w-[200px] rotate-45 left-[40%] top-10 absolute noselect "
            src={`${router.basePath}/assets/images/free.png`}
            alt="Your Company"
          />
          <div className="leading-none flex items-center flex-grow h-auto justify-items-stretch">
            <span className="text-[4em] border-font md:text-[5em] 2xl:text-[7em]">
              MINT
            </span>
          </div>
          <h1 className="mt-3 text-[4em] md:text-[5em] 2xl:text-[7em] border-font leading-none boldfont dellingText">
            & SCRATCH
          </h1>
          <p className="text-lg font-semibold leading-6 text-white w-1/2">
            Each mint will give you the chance to scratch and win a free mint.
          </p>

          {
            //@ts-ignore
            collectionMeta.image ? (
              <>
                <div className="bg-slate-900 w-full rounded-md shadow-xl h-auto p-10 flex-grow flex justify-between mr-20 border-slate-800 border-4">
                  <div className="flex flex-col items-center justify-center gap-2 text-xl">
                    <span>Supply</span>
                    <b>{candyMachine.itemsAvailable.toString()}</b>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-xl">
                    <span>Remaining</span>
                    <b>{candyMachine.itemsRemaining.toString()}</b>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2 text-xl">
                    <span>Price</span>
                    <b>
                      {candyMachine.candyGuard?.guards.solPayment?.amount.basisPoints.toString()
                        ? candyMachine.candyGuard?.guards.solPayment?.amount.basisPoints.toNumber() /
                          LAMPORTS_PER_SOL
                        : "Price: 0"}{" "}
                      ◎
                    </b>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-500 relative rounded-md">
                  <div
                    className="h-3 bg-green-500 absolute rounded-md w-1/2"
                    style={
                      //@ts-ignore
                      {
                        //@ts-ignore
                        width: Number(
                          //@ts-ignore
                          (candyMachine.itemsAvailable.toString() /
                            //@ts-ignore
                            candyMachine.itemsRemaining.toString()) *
                            10
                        ),
                      }
                    }
                  ></div>
                </div>
              </>
            ) : (
              <></>
            )
          }
        </div>
        <div className="w-1/2">
          <MintButton
            loaded={
              //@ts-ignore
              !!collectionMeta.image
            }
          />
        </div>
      </div>
      <div className="absolute bottom-7 w-[95%] flex justify-between z-40 items-center">
        <h1 className="font-semibold noselect flex flex-col text-white  text-xs xl:text-sm opacity-80 leading-none">
          <span>© 2022, PANTERS™</span>
          <span className="font-semibold text-xs xl:text-sm">
            We’re all hungry.
          </span>
        </h1>
        <h1 className="font-semibold noselect flex flex-col items-end text-white text-xs xl:text-sm opacity-80 leading-2 right-20">
          <span className="underline cursor-pointer hover:opacity-70">
            Terms and Conditions
          </span>
          <span className="underline cursor-pointer hover:opacity-70">
            Privacy Policy
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Home;
