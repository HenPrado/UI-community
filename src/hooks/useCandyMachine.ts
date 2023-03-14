import {
  CandyMachine,
  getMerkleTree,
  Nft,
  NftWithToken,
  Sft,
  SftWithToken,
} from "@metaplex-foundation/js";
import { createContext, useContext } from "react";

const DEFAULT_CONTEXT: {
  candyMachine: CandyMachine | null;
  collection: Nft | NftWithToken | Sft | SftWithToken | undefined;
  collectionMeta: Object;
  group: string;
  setCandyMachine: (candyMachine: CandyMachine | undefined) => void;
} = {
  candyMachine: null,
  collection: undefined,
  collectionMeta: {},
  group: "",
  setCandyMachine: () => {},
};

export const CandyMachineContext = createContext(DEFAULT_CONTEXT);

export function useCandyMachine() {
  // const proof = getMerkleTree(allowed);
  // console.log(proof);

  return useContext(CandyMachineContext);
}
