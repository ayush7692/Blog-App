import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black font-sans text-white flex flex-col items-center justify-center p-8">
            <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]"></div>

            <main className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
                <span className="font-mono text-sm uppercase tracking-[0.4em] text-[#c6c6c6] mb-8 block">ERROR CODES // 404</span>

                <h1 className="font-display text-8xl md:text-[10rem] font-bold tracking-tighter leading-none text-white uppercase mb-8">
                    404
                </h1>

                <p className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-[#c6c6c6] mb-12">
                    THE REQUESTED DIRECTORY DOES NOT EXIST IN THIS SYSTEM
                </p>

                <Link
                    to="/"
                    className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 inline-block"
                >
                    [ RETURN TO INDEX ]
                </Link>
            </main>
        </div>
    );
};

export default NotFoundPage;
