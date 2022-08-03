import { createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Head from "next/head";

export type ThemeType = "light" | "dark";

type ThemeContextType = {
    theme: ThemeType;
    setTheme: Dispatch<SetStateAction<ThemeType>>;
};

export const ThemeContext = createContext(null as null | ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("light" as ThemeType);

    return (
        <>
            <Head>
                <meta
                    name="theme-color"
                    content={theme === "light" ? "#e2e2e2" : "#282828"}
                />
            </Head>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                <div className={"app"} data-theme={theme}>
                    {children}
                </div>
            </ThemeContext.Provider>
        </>
    );
};
