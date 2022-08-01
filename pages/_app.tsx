import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import "../styles/cheatsheet.scss";
import Header from "../components/layout/Header";
import { useState } from "react";

function App({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState(true);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <div className="app" data-theme={theme ? "light" : "dark"}>
                <div id="root">
                    <Header switchTheme={() => setTheme(!theme)} />
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    );
}

export default App;
