import { NextApiRequest, NextApiResponse } from "next";
import { getMerkleProof } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import WL from "../../wl.json";
import OG from "../../OG.json";
import VIP from "../../VIP.json";
import Team from "../../Team.json";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).send("Invalid request methode.");
    return;
  }
  console.log(req.body);

  // const body = JSON.parse(req.body);
  // console.log(body);

  if (!("address" in req.body)) {
    res.status(401).send("Invalid request body.");
    return;
  }
  try {
    const address = new PublicKey(req.body.address);
    //const proof = getMerkleProof(allowed, address.toBase58());

    if (PublicKey.isOnCurve(address.toBuffer())) {
      for (const cAddress of Team) {
        if (cAddress === req.body.address) {
          return res.status(200).json("Team");
          break;
        }
      }
      for (const cAddress of WL) {
        if (cAddress === req.body.address) {
          return res.status(200).json("Wl");
          break;
        }
      }
      for (const cAddress of OG) {
        if (cAddress === req.body.address) {
          return res.status(200).json("Og");
          break;
        }
      }
      for (const cAddress of VIP) {
        if (cAddress === req.body.address) {
          return res.status(200).json("Vip");
          break;
        }
      }
      return res.status(200).json("Public");
      return;
    } else {
      throw new Error("Invalid address.");
    }
  } catch (err) {
    console.log(err);
    res.status(402).send("Invalid address.");
    return;
  }
};

export default handler;
