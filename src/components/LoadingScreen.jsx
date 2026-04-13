const LoadingScreen = ({loadingMessage = " INITIALIZING SYSTEM..."}) => {
    return (
        <div className="fixed inset-0 min-h-screen bg-[#131313] z-[9999] flex flex-col justify-center items-center font-sans text-white pointer-events-none">
            <div className="grain-overlay fixed inset-0 w-full h-full z-[10000]"></div>

            <div className="relative z-[10001] flex flex-col items-center">
                {/* Blinking Loader Dot */}
                <div className="w-4 h-4 bg-white mb-6 animate-pulse"></div>

                {/* Loading Text */}
                <span className="font-mono text-sm uppercase tracking-[0.4em] text-white">
                   {loadingMessage}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#c6c6c6] mt-4 opacity-50">
                    AWAITING DATALINK
                </span>
            </div>
        </div>
    );
};

export default LoadingScreen;
