import { twMerge } from "tailwind-merge";

const Glassbox = ({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    props?: any;
}) => {
    return (
        <div className={twMerge(className, "glass")} {...props}>
            <div className="glass-container py-10 px-9 flex flex-col justify-between gap-5">
                {children}
            </div>
        </div>
    );
};

export const TitledGlassBox = ({
    title,
    children,
    className,
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <Glassbox className={twMerge(className, "flex flex-col gap-5")}>
            <h1 className="text-3xl font-medium font-space no-ligature">
                {title}
            </h1>
            {children}
        </Glassbox>
    );
};

export default Glassbox;
