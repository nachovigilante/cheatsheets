import { twMerge } from "tailwind-merge";

type SectionProps = {
    id?: string;
    children?: React.ReactNode;
    className?: string;
    row?: boolean;
};

const Section = ({ children, className, row, id }: SectionProps) => {
    return (
        <section
            className={twMerge(className, "flex justify-center items-center")}
            id={id}
        >
            <div
                className={twMerge(
                    "w-[1200px] m-auto flex justify-center items-center",
                    !row && "flex-col"
                )}
            >
                {children}
            </div>
        </section>
    );
};

export default Section;
