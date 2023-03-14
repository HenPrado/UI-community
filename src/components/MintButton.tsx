import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useCandyMachine } from "../hooks/useCandyMachine";
import { useMetaplex } from "../hooks/useMetaplex";
import { allowedOG } from "../enums/allowedOG";
import { allowedVIP } from "../enums/allowedVIP";
import { allowedTeam } from "../enums/allowedTeam";
import { allowedWL } from "../enums/allowedWL";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Spinner from "./Spinner";
import MerkleTree from "merkletreejs";
import { keccak_256 } from "@noble/hashes/sha3";
import { getMerkleProof } from "@metaplex-foundation/js";
import ScratchCard from "react-scratchcard-v2";
import { useRouter } from "next/router";
import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";
import Countdown from "react-countdown";

const getMerkleTree = (data: string[]) => {
  return new MerkleTree(data.map(keccak_256), keccak_256, {
    sortPairs: true,
  });
};

const MintButton = ({ loaded }: { loaded: boolean }) => {
  const wallet = useWallet();
  if (!wallet.connected) {
    return (
      <>
        <div className="flex-1 bg-cover relative  place-items-center h-screen md:border-l border-[#ffffff26] grid w-full items-center justify-center">
          <WalletMultiButton />
        </div>
      </>
    );
  }
  const { metaplex } = useMetaplex();
  const { candyMachine, collection, setCandyMachine, group } =
    useCandyMachine();
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const proof = getMerkleTree(
    group === "Wl"
      ? allowedWL
      : group === "Og"
      ? allowedOG
      : group === "Vip"
      ? allowedVIP
      : group === "Team"
      ? allowedTeam
      : allowedWL
  )
    .getProof(Buffer.from(keccak_256(wallet.publicKey!.toBase58())))
    .map((proofItem) => proofItem.data);

  const mint = async () => {
    setIsMinting(true);
    try {
      console.log(candyMachine);
      if (!candyMachine) {
        throw new Error("Candy machine not found");
      }
      if (group !== "Public") {
        const auth = await metaplex?.candyMachines().callGuardRoute({
          candyMachine: candyMachine,
          guard: "allowList",
          group: group,
          settings: {
            path: "proof",
            merkleProof: proof,
          },
        });
        console.log("auth", auth);

        if (auth?.response.confirmResponse.value.err) {
          toast(auth?.response.confirmResponse.value.err.toString(), {
            type: "error",
          });
        }
      }

      const resp = await metaplex?.candyMachines().mint({
        candyMachine: candyMachine,
        collectionUpdateAuthority: candyMachine.authorityAddress,
        group: group,
      });
      if (resp?.response.confirmResponse.value.err) {
        toast(resp?.response.confirmResponse.value.err.toString(), {
          type: "error",
        });
        // throw new Error(resp?.response.confirmResponse.value.err.toString());
      }
      setCandyMachine(await metaplex?.candyMachines().refresh(candyMachine));
      toast("Minted successfully!", {
        type: "success",
      });
      setIsMinted(true);
    } catch (error) {
      console.log(error);
      //@ts-ignore
      console.log(Object.keys(error).map((key) => error[key]));
      //@ts-ignore
      if (error.cause && error.cause.name === "AddressNotFoundInAllowedList") {
        toast("You are not whitelisted!", {
          type: "error",
        });
      }
      //@ts-ignore
      if (error.cause && error.cause.name === "AllowedMintLimitReached") {
        toast("The maximum number of allowed mints was reached", {
          type: "error",
        });
      }
      //@ts-ignore
      if (error.cause && error.cause.name === "NotEnoughSOL") {
        toast("Not enough SOL to pay for the mint", {
          type: "error",
        });
      }
      //@ts-ignore
      if (error.cause && error.cause.name === "MintNotLive") {
        toast("Public Mint is not live", {
          type: "error",
        });
      }
      // toast(error.toString(), {
      //     type: 'error',
      // });
    }
    setIsMinting(false);
  };

  const router = useRouter();
  const [showprize, setshowprize] = useState(false);
  const [wonnothing, setwonnothing] = useState(false);
  const { width, height } = useWindowSize();

  const result = () => {
    setwonnothing(true);
    setshowprize(true);
    setTimeout(() => {
      setIsMinted(false);
    }, 2500);
  };

  const Completionist = () => <div className="flynnText font-bold">LIVE</div>;

  return (
    <div className="flex-1 bg-cover relative  place-items-center h-screen md:border-l border-[#ffffff26] grid">
      <div className="bg-transparent bg-opacity-50 absolute left-0 right-0 top-0 bottom-0">
        <ToastContainer />
      </div>

      {isMinted ? (
        <>
          <Confetti width={width} height={height} />
          <div className="mt-[200px] ml-[30px]">
            <div
              className="h-[470px] w-[380px] right-5 md:right-0 md:h-[500px] md:w-[400px]  mt-[-160px] bg-cover bg-transparent flex items-center justify-center bg-transparent  relative z-10"
              style={{
                backgroundImage: `url("${router.basePath}/assets/images/cadre.png")`,
              }}
            >
              <div className="mt-14 ml-8">
                <ScratchCard
                  width={300}
                  height={170}
                  image={`${router.basePath}/assets/images/scratched.png`}
                  finishPercent={90}
                  onComplete={() => result()}
                  customBrush={{
                    image: `${router.basePath}/assets/images/cursor.png`,
                    width: 30,
                    height: 30,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {showprize ? (
                      <>
                        <img
                          className="w-auto mt-2 noselect "
                          src={`${router.basePath}/assets/images/nothing.png`}
                          alt="Your Company"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="w-auto noselect z-0 relative"
                          src={`${router.basePath}/assets/images/prize.gif`}
                          alt="Your Company"
                        />
                      </>
                    )}
                  </div>
                </ScratchCard>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col p-6 justify-around z-20 relative">
            {wallet.connected && loaded ? (
              <>
                <div className="border-slate-800 bg-slate-900 flex items-center justify-between border-4 rounded-md shadow-lg w-full p-5 mb-3">
                  <div className="font-semibold">WL & OG & VIP PHASE</div>
                  <div className="flynnText font-bold">LIVE</div>
                </div>
                <div className="border-slate-800 bg-slate-900 flex items-center justify-between border-4 rounded-md shadow-lg w-full p-5 mb-3">
                  <div className="font-semibold">PUBLIC PHASE</div>

                  <Countdown date={new Date("2022-10-23T20:30:00Z")}>
                    <Completionist />
                  </Countdown>
                </div>
              </>
            ) : (
              <></>
            )}
            <WalletMultiButton />
            {wallet.connected && loaded ? (
              <>
                <button
                  disabled={!loaded}
                  onClick={mint}
                  className={
                    loaded
                      ? "border-2 uppercase text-xl mt-5  w-[300px] border-slate-800 bg-slate-900 shadow-lg active:border-none flex flex-row items-center justify-center "
                      : "cursor-not-allowed hover:border-none mt-4 flex flex-row items-center justify-center"
                  }
                >
                  {isMinting ? <Spinner /> : "Mint NOW!"}
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MintButton;
