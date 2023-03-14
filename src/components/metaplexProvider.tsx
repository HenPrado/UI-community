import { useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { MetaplexContext } from "../hooks/useMetaplex";

export const MetaplexProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const metaplex = useMemo(
        () => Metaplex.make(connection).use(walletAdapterIdentity(wallet)),
        [connection, wallet]
    );

    return (
        <MetaplexContext.Provider value={{ metaplex: metaplex }} >
            {children}
        </MetaplexContext.Provider>
    );
};