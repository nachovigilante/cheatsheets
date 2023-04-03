import { twMerge } from "tailwind-merge";

const defaultClassName =
    "bg-accent rounded-full xl:w-16 xl:h-16 w-12 h-12 flex items-center justify-center text-white xl:text-2xl text-xl shadow-default transition-all duration-150 ease-in-out cursor-pointer border-none hover:bg-accent-hover active:bg-accent-active focus:outline-none";

const FloatingButton = ({
    className,
    onClick,
    children,
    ariaLabel,
    link,
    download,
}: {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    ariaLabel?: string;
    link?: string;
    download?: boolean;
}) => {
    return link ? (
        <a
            href={link}
            className={twMerge(className, defaultClassName)}
            aria-label={ariaLabel}
            download={download}
        >
            {children}
        </a>
    ) : (
        <button
            className={twMerge(className, defaultClassName)}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

export default FloatingButton;
