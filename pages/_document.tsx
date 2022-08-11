import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html lang="en">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="theme-color" content="#170c60" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="black-translucent"
                />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Una colección de cheatsheets de distintos lenguajes de programación y herramientas, principalmente pensada para alumnos de TIC ORT."
                />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
                    integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
                    crossOrigin="anonymous"
                ></link>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
