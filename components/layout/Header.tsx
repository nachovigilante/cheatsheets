import Link from "next/link";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

const Header = () => {
    const { pathname } = useRouter();

    return (
        <header className="flex items-center justify-between w-screen lg:pb-20 xl:px-12 px-4 py-4 pb-12 md:pb-14 md:px-5 md:py-6 absolute z-50 top-0 backdrop-blur-sm fade-bottom">
            <Link href="/">
                <a className="flex items-center no-underline 3xl:gap-5 gap-2 md:gap-4">
                    <img
                        src="/assets/icons/Logo.svg"
                        className="xl:h-[45px] h-[30px] md:h-[35px]"
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
