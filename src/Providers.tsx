import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { GlowWalletAdapter, PhantomWalletAdapter, SlopeWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo, useState } from "react";
import { MetaplexProvider } from "./components/metaplexProvider";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { CandyMachineProvider } from "./components/candyMachineProvider";
import React from 'react';

const Providers = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet);

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <MetaplexProvider>
                        <CandyMachineProvider>
                            {children}
                        </CandyMachineProvider>
                    </MetaplexProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default Providers;