type Props = {
    width?: number;
    height?: number;
};

export default function Logo({ width = 150, height = 100 }: Props) {
    return (
        <>
            {/* I use an image or svg here as my logo  */}
            {/* // <img
                src="/assets/logo.png"
                alt="Petraits"
                width={width}
                height={height}
                /> */}

            <h1 className="text-2xl font-bold text-primary">LOGO</h1>
        </>
    );
}
