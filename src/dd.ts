import {
  Metaplex,
  toBigNumber,
  keypairIdentity,
  getMerkleProof,
  CreateCandyMachineOutput,
  DefaultCandyGuardSettings,
  getMerkleRoot,
} from "@metaplex-foundation/js";
import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import fs from "fs";
// import md5 from "md5";
import MerkleTree from "merkletreejs";
// import keccak256 from "keccak256";
import { keccak_256 } from "@noble/hashes/sha3";
// @ts-ignore
import bs58 from "@project-serum/anchor/dist/cjs/utils/bytes";

const parseCache = (path: string) => {
  return JSON.parse(fs.readFileSync(path, "utf8"));
};

const dd = async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = new Metaplex(connection);
  metaplex.use(
    keypairIdentity(loadWalletKey("/Users/hana/Downloads/panter.json")));
  const addresses = parseCache("./VIP.json");
  const root = getMerkleRoot(addresses);
  const resp = await metaplex.candyMachines().updateCandyGuard({
    candyGuard: new PublicKey("9fvMLdQzF251FQYNdLbC2uek39mFb2vHSpZ9LJrzSvW"),
    groups: [
      {
        label: "Team",
        guards: {
          allowList: {
            merkleRoot: root,
          },
        },
      },
      {
        label: "OG",
        guards: {
          allowList: {
            merkleRoot: root,
          },
        },
      },
      {
        label: "WL",
        guards: {
          allowList: {
            merkleRoot: root,
          },
        },
      },
      {
        label: "Vip",
        guards: {
          allowList: {
            merkleRoot: root,
          },
        },
      },
      {
        label: "Public",
        guards: {
          allowList: {
            merkleRoot: root,
          },
        },
      },
    ],
    guards: {
      solPayment: {
        amount: {
          basisPoints: toBigNumber(1.5 * LAMPORTS_PER_SOL),
          currency: {
            decimals: 9,
            symbol: "SOL",
          },
        },
        destination: metaplex.identity().publicKey,
      },
    },
  });
  console.log(resp);
};

function loadWalletKey(arg0: string): import("@solana/web3.js").Keypair {
  throw new Error("Function not implemented.");
}
