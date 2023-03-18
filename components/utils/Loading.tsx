import Image from "next/image";
import { useContext } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import { twMerge } from "tailwind-merge";

const Loading = () => {
    const { loading } = useContext(LoadingContext);

    return (
        <div className={twMerge("fixed top-0 left-0 z-50 flex-col justify-center items-center w-full h-full bg-black/50 filter drop-shadow-default backdrop-blur-md", loading ? "flex" : "hidden")}>
            <Image
                src="/assets/images/Logo-anim.gif"
                height="100"
                width="100"
            />
            <h1 className="mt-4 select-none">Cargando...</h1>
        </div>
    );
};

export default Loading;
