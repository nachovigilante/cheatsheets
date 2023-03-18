import Link from "next/link";
import Logo from "../../public/assets/icons/Logo.svg";
import ThemeSwitch from "../utils/ThemeSwitch";
import { useRouter } from "next/router";

const Header = () => {
    const { pathname } = useRouter();

    return (
        <header className="py-4 pb-20 px-8 flex items-center justify-between fixed z-50 top-0 w-screen backdrop-blur-sm fade-bottom">
            <Link href="/">
                <a className="flex items-center no-underline gap-5">
                    <Logo height="45    " />
                    <h1 className="text-2xl select-none mt-1 font-space no-ligature">
                        {"<TIC_Cheatsheets/>"}
                    </h1>
                </a>
            </Link>
            <div className="flex">
                <a
                    href="https://github.com/nachovigilante/cheatsheets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-github bg-contain bg-no-repeat bg-center rounded-full mr-4"
                    aria-label="Repositorio en GitHub"
                />
                {pathname === "/cheatsheet/[slug]" ? <ThemeSwitch /> : null}
            </div>
        </header>
    );
};

export default Header;
