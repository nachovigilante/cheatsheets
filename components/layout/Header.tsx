import Link from "next/link";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { useWindowSize } from "usehooks-ts";

const Header = () => {
    const { pathname } = useRouter();
    const windowSize = useWindowSize();

    return (
        <header className="flex items-center justify-between w-screen lg:pb-20 xl:px-12 px-4 py-4 pb-12 md:pb-14 md:px-5 md:py-6 absolute z-50 top-0 backdrop-blur-sm fade-bottom">
            <Link href="/">
                <a className="flex items-center no-underline 3xl:gap-5 gap-2 md:gap-4">
                    <Image
                        src="/assets/icons/Logo.svg"
                        height={
                            windowSize.width >= 1250
                                ? 45
                                : windowSize.width >= 800
                                ? 35
                                : 30
                        }
                        width={
                            windowSize.width >= 1250
                                ? 45
                                : windowSize.width >= 800
                                ? 35
                                : 30
                        }
                        alt="Logo"
                    />
                    <h1 className="xl:text-2xl text-base md:text-lg select-none 3xl:mt-1 font-space no-ligature">
                        {"<TIC_Cheatsheets/>"}
                    </h1>
                </a>
            </Link>
            <div className="flex">
                <a
                    href="https://github.com/nachovigilante/cheatsheets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={twMerge(
                        "xl:w-8 xl:h-8 md:h-7 md:w-7 w-6 h-6 bg-github bg-contain bg-no-repeat bg-center rounded-full",
                        pathname.startsWith("/cheatsheet") && "hidden"
                    )}
                    aria-label="Repositorio en GitHub"
                />
                {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : null}
            </div>
        </header>
    );
};

export default Header;
