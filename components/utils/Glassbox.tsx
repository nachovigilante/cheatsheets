import { twMerge } from "tailwind-merge";

const Glassbox = ({
    children,
    className,
    containerClassName,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    props?: any;
}) => {
    return (
        <div className={twMerge(className, "glass")} {...props}>
            <div
                className={twMerge(
                    containerClassName,
                    "glass-container flex flex-col justify-between"
                )}
            >
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
        <Glassbox className={twMerge(className, "flex flex-col")}>
            <h1 className="text-3xl font-medium font-space no-ligature">
                {title}
            </h1>
            {children}
        </Glassbox>
    );
};

export default Glassbox;
