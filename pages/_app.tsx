import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import "../styles/cheatsheet.scss";
import Header from "../components/layout/Header";
import { useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import Loading from "../components/utils/Loading";
import { LoadingProvider } from "../contexts/LoadingContext";

function App({ Component, pageProps }: AppProps) {
    const [theme] = useState(true);

    return (
        <ThemeProvider>
            <LoadingProvider>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                </Head>
                <div id="root">
                    <Header />
                    <Component {...pageProps} />
                </div>
                <Loading />
            </LoadingProvider>
        </ThemeProvider>
    );
}

export default App;
