import { twMerge } from "tailwind-merge";

type SectionProps = {
    children?: React.ReactNode;
    className?: string;
    row?: boolean;
};

const Section = ({ children, className, row }: SectionProps) => {
    return (
        <section
            className={twMerge(className, "flex justify-center items-center")}
        >
            <div
                className={twMerge(
                    "w-[1200px] m-auto flex justify-center items-center",
                    !row && "flex-col",
                )}
            >
                {children}
            </div>
        </section>
    );
};

export default Section;
