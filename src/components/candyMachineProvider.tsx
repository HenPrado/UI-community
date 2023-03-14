import { useMetaplex } from "../hooks/useMetaplex";
import { CandyMachineContext } from "../hooks/useCandyMachine";
import { useEffect, useState } from "react";
import {
  CandyMachine,
  PublicKey,
  NftWithToken,
  Nft,
  Sft,
  SftWithToken,
} from "@metaplex-foundation/js";
import { useWallet } from "@solana/wallet-adapter-react";

export const CandyMachineProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine | undefined>(
    undefined
  );
  const [collection, setCollection] = useState<
    Nft | NftWithToken | Sft | SftWithToken | undefined
  >(undefined);
  const [group, setGroup] = useState<string>('');
  const [collectionMeta, setCollectionMeta] = useState<Object>({});
  console.log(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);

  const getCandyMachine = async () => {
    const candy = await metaplex?.candyMachines().findByAddress({
      address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!) || "",
    });
    if (!candy) {
      throw new Error("Candy machine not found");
    }
    setCandyMachine(candy);
    const coll = await metaplex?.nfts().findByMint({
      mintAddress: candy!.collectionMintAddress,
    });
    setCollection(coll);
    const collMeta = JSON.parse(await (await fetch(coll!.uri)).text());
    setCollectionMeta(collMeta);
    if (wallet.publicKey) {
      const resp = await fetch("/api/wlproof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: wallet.publicKey?.toBase58(),
        }),
      });
      setGroup(await resp.json());
    }
  };

  useEffect(() => {
    getCandyMachine();
  }, [metaplex?.connection.rpcEndpoint, wallet.publicKey]);

  return (
    <CandyMachineContext.Provider
      value={{
        candyMachine: candyMachine ? candyMachine : null,
        collection,
        collectionMeta,
        setCandyMachine,
        group,
      }}
    >
      {children}
    </CandyMachineContext.Provider>
  );
};
