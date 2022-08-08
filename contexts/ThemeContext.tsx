import { createContext } from "react";
import Head from "next/head";
import { useLocalStorage } from "usehooks-ts";

export type ThemeType = "light" | "dark";

type ThemeContextType = {
    theme: ThemeType;
    setTheme: any;
};

export const ThemeContext = createContext(null as null | ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useLocalStorage("theme", "light");

    return (
        <>
            <ThemeContext.Provider value={{ theme: theme === "dark" ? "dark" : "light", setTheme }}>
                <div className="app" data-theme={theme}>
                    {children}
                </div>
            </ThemeContext.Provider>
        </>
    );
};
