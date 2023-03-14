import { AppProps } from "next/app";
import Head from "next/head";
import Providers from "../Providers";
import "./style.css";
import "../App.css";
import "../index.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <link rel="icon" type="image/ico" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>PANTERS MINT</title>
            </Head>
            <Providers>
                <div className="w-screen flex flex-row justify-center items-center">
                    <Component {...pageProps} />
                </div>
            </Providers>
        </>
    );
}
  
export default MyApp;