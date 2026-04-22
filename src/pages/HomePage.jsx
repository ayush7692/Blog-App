import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const{authorised} = useAuthStatus()

  
  const fadeUpRef1 = useRef(null);
  const fadeUpRef2 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, observerOptions);

    if (fadeUpRef1.current) observer.observe(fadeUpRef1.current);
    if (fadeUpRef2.current) observer.observe(fadeUpRef2.current);

    return () => observer.disconnect();
  }, []);

  // Compute Parallax values
  // scrollY increases as user scrolls down.
  // We want elements to move up at different rates relative to the scroll.
  const fastOut = scrollY * -0.5;
  const mediumOut = scrollY * -0.3;
  const slowOut = scrollY * -0.15;
  
  // Calculate percentage of typical full window scroll height (dummy value 2000)
  const scrollProgress = Math.min((scrollY / 2000) * 100, 100);

  return (
    <div className="relative min-h-[300vh] bg-[#131313] selection:bg-white selection:text-black">
      
      {/* Grain Overlay */}
      <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]"></div>
      
      {/* Background Dot Grid Layer (Fixed) */}
      <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none z-0"></div>

      {/* Main Content Area */}
      <main className="relative pt-16 z-10 w-full">
        
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex flex-col items-center justify-center px-8 overflow-hidden">
          
          {/* Ghost Text (Parallax Fast) */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{ transform: `translate(-50%, ${fastOut}px)` }}
          >
            <h1 className="font-display font-bold text-[20vw] leading-none text-outline select-none opacity-40 mix-blend-screen">
              THOUGHTS
            </h1>
          </div>

          {/* Floating Geometric Shapes */}
          <div 
            className="absolute top-20 right-[15%] w-32 h-32 border border-white/10 rotate-12"
            style={{ transform: `translateY(${mediumOut}px) rotate(12deg)` }}
          ></div>
          <div 
            className="absolute top-40 left-[10%] w-16 h-16 bg-[#2a2a2a] -rotate-45"
            style={{ transform: `translateY(${fastOut}px) rotate(-45deg)` }}
          ></div>

          {/* Hero Content (Shifted Up Slow) */}
          <div 
            className="relative z-10 text-center max-w-4xl"
            style={{ transform: `translateY(${slowOut}px)` }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c6c6c6] mb-6 block">
              Volume 01 — Edition 2026
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-white font-bold tracking-tight mb-8">
              Architectural Narrative
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={"/blogs"} className="bg-white cursor-pointer text-black px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#d4d4d4] transition-all duration-300">
                EXPLORE ARCHIVE
              </Link>
              {authorised?(<Link to={"/blogs/add"} className="border border-white/20 text-white cursor-pointer  px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest hover:border-white transition-all duration-300">
                WRITE YOUR BLOG
              </Link>):(<Link to={"/login"} className="border border-white/20 text-white cursor-pointer px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest hover:border-white transition-all duration-300">
                JOIN SYSTEM
              </Link>)}
            </div>
          </div>
        </section>

        {/* Section 2: Typography Impact */}
        <section className="relative bg-[#1b1b1b] py-32 px-8 md:px-24">
          <div 
            ref={fadeUpRef1}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="md:col-span-12 lg:col-span-5">
              <h2 className="font-display text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
                Built for<br />writers.
              </h2>
            </div>
            
            <div className="md:col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-end pb-4">
              <p className="font-sans text-xl md:text-2xl text-[#c6c6c6] leading-relaxed max-w-lg mb-8">
                A monolithic repository for high-fidelity technical discourse and editorial precision. 
                No distractions. No clutter. Just the weight of the word.
              </p>
              <div className="flex items-center gap-4 text-white group cursor-pointer w-fit">
                <span className="font-mono text-xs tracking-widest uppercase">READ MANIFESTO</span>
                <div className="h-[1px] w-12 bg-white transition-all duration-300 group-hover:w-24"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-white/5"></div>
        </section>

        {/* Section 3: Preview Cards / Bento */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div 
            ref={fadeUpRef2}
            className="grid grid-cols-1 md:grid-cols-3 gap-1 opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            
            <div className="aspect-square bg-[#1f1f1f] flex flex-col p-10 justify-between group cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-500">
              <span className="font-mono text-[10px] tracking-widest text-[#c6c6c6] uppercase">01 / Typography</span>
              <div>
                <h3 className="font-display text-2xl text-white font-bold mb-4">Precision over decoration.</h3>
                <p className="font-sans text-sm text-[#c6c6c6] leading-relaxed">
                  Our grid-based layout ensures mathematical harmony between text and whitespace.
                </p>
              </div>
            </div>
            
                <div className="aspect-square group relative flex items-center justify-center cursor-pointer overflow-hidden border border-white/5 bg-[#171717] hover:bg-[#2a2a2a] transition-colors duration-500">
              <div className="absolute inset-0 dot-grid opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
              <div className="relative  z-10 text-center p-8 grayscale-85 hover:scale-110 transition-all duration-600">
               <h2 className=" hidden md:block md:opacity-0 md:hover:opacity-100 absolute z-99 text-xl text-white left-35 top-65 font-black">  Think Loud.. </h2>

                <img src="src\image\lamp-image.jpg" alt="[-]" />   
              </div>
            </div>
            
            <div className="aspect-square bg-[#1f1f1f] flex flex-col p-10 justify-between cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-500">
              <span className="font-mono text-[10px] tracking-widest text-[#c6c6c6] uppercase">02 / Open Source</span>
              <div>
                <h3 className="font-display text-2xl text-white font-bold mb-4">Decentralized knowledge.</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-white/10 text-[10px] font-mono text-white/80 uppercase">Node.js</span>
                  <span className="px-3 py-1 border border-white/10 text-[10px] font-mono text-white/80 uppercase">Markdown</span>
                  <span className="px-3 py-1 border border-white/10 text-[10px] font-mono text-white/80 uppercase">Git-Driven</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer Details */}
      <footer className="w-full flex justify-center items-center bg-transparent py-12 relative z-10">
        <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/20">
          © 2026 BLOG_SYS
        </div>
      </footer>

      {/* Fixed UI Overlays */}
      <div className="fixed bottom-8 left-8 z-40 hidden md:block pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-white/20 tracking-tighter uppercase">Coordinate_System</span>
          <span className="font-mono text-[9px] text-white/40 tracking-tighter uppercase">Lat: 52.5200° N | Lon: 13.4050° E</span>
        </div>
      </div>
      
      <div className="fixed bottom-8 right-8 z-40 hidden md:block pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">
            Scroll_Progress_{Math.round(scrollProgress)}%
          </span>
          <div className="w-32 h-[1px] bg-white/10 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-white transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
