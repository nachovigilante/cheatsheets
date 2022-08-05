import { createContext, useState, Dispatch, SetStateAction } from "react";

type LoadingContextType = {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = createContext(null as null | LoadingContextType);

export const LoadingProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <LoadingContext.Provider value={{ loading, setLoading }}>
                {children}
            </LoadingContext.Provider>
        </>
    );
};
