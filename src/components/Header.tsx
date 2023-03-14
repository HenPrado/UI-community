import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import router from "next/router";
import React from "react";
import { useCandyMachine } from "../hooks/useCandyMachine";

const Header = () => {
  const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Scratch", href: "/scratch", current: false },
    { name: "Roadmap", href: "/roadmap", current: false, soon: false },
    {
      name: "Whitepaper",
      href: "https://docs.panters.app/",
      current: false,
      soon: false,
      open: true,
    },
    { name: "Team", href: "/team", current: false },
    { name: "Collab form", href: "/collab", current: false, open: true },
    {
      name: (
        <>
          <i className="fa-brands  fa-twitter text-white cursor-pointer"></i>
        </>
      ),
      href: "https://twitter.com/PantersNFT",
      current: false,
      soon: false,
      open: true,
    },
    {
      name: (
        <>
          <i className="fa-brands fa-discord text-white cursor-pointer"></i>
        </>
      ),
      href: "https://discord.gg/panters",
      current: false,
      soon: false,
      open: true,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const { candyMachine, collection, collectionMeta, group } = useCandyMachine();

  return (
    <>
      <div className="absolute w-[95%] z-20  bg-slate-900 flex items-center justify-between">
        <div>
          <Link href="/">
            <div className="flex flex-1">
              <img
                className="h-[60px] xl:h-[100px] w-auto noselect"
                src={`${router.basePath}/assets/images/logo.png`}
                alt="Your Company"
              />
            </div>
          </Link>
        </div>
        <div className="ml-[13%] flex-1 bg-slate-900 text-center">
          {group === "Wl" ? (
            <>
              <h1 className="text-[2em] uppercase md:text-[3em] 2xl:text-[3em] border-font leading-none neonTextorange">
                YOU HAVE {group} ROLE
              </h1>
            </>
          ) : group === "Og" ? (
            <>
              <h1 className="text-[2em] uppercase md:text-[3em] 2xl:text-[3em] border-font leading-none tshalaText">
                YOU HAVE {group} ROLE
              </h1>
            </>
          ) : group === "Vip" ? (
            <>
              <h1 className="text-[2em] uppercase md:text-[3em] 2xl:text-[3em] border-font leading-none lucciText">
                YOU HAVE {group} ROLE
              </h1>
            </>
          ) : group === "Team" ? (
            <>
              <h1 className="text-[2em] uppercase md:text-[3em] 2xl:text-[3em] border-font leading-none flynnText">
                YOU HAVE {group} ROLE
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-[2em] uppercase md:text-[3em] 2xl:text-[3em] border-font leading-none neonTextpurple">
                YOU HAVE PUBLIC ROLE
              </h1>
            </>
          )}
        </div>
        <div>
          <div className="font-bold gap-2 flex items-center leading-none  text-white text-4xl uppercase">
            <img
              className="h-[50px] w-auto noselect"
              src={`${router.basePath}/assets/images/protection.png`}
              alt="Your Company"
            />
            <div className="flex flex-col leading-none">
              <span>Team Doxxed</span>
              <span className="text-xs font-medium ml-1.5">By Alder Mage</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
