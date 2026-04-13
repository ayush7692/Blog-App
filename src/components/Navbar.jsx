import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
      <Link to="/blogs" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Blogs</Link>
      {!user ? (
        <>
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Login</Link>
          <Link to="/register" onClick={() => setIsMenuOpen(false)} className="border border-white/15 px-4 py-2 hover:bg-white hover:text-black transition-all duration-300">
            Register
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">Profile</Link>
          <Link to="/blogs/add" onClick={() => setIsMenuOpen(false)} className="border border-white/15 px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 text-center">
            Write Blog
          </Link>
          <button 
            onClick={() => { dispatch(logout()); setIsMenuOpen(false); }} 
            className="border border-white/15 px-4 py-2 bg-red-500/80 text-white hover:bg-red-600 cursor-pointer transition-all duration-300 w-full md:w-auto uppercase tracking-widest text-[10px]"
          >
            Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen
        ? 'bg-black/95 backdrop-blur-md border-b border-white/10'
        : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="font-display font-bold text-xl tracking-tight text-white hover:text-white/80 transition-colors z-[60]">
          BLOG_SYS
        </Link>

        {/* Action Area (Desktop & Mobile) */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Profile & Write (Always visible high-priority actions) */}
          {user && (
            <div className="flex md:hidden items-center gap-4 z-[60]">
               <Link 
                to="/blogs/add" 
                onClick={() => setIsMenuOpen(false)}
                className="font-mono text-[9px] uppercase tracking-widest text-white/60 border border-white/10 px-3 py-1.5 hover:bg-white hover:text-black transition-all"
              >
                Write
              </Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-[#1b1b1b]">
                 <img 
                    src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                 />
              </Link>
            </div>
          )}

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-[#e2e2e2]">
            {navLinks}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-[60] text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between overflow-hidden">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'translate-x-full opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/98 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
          <div className="flex flex-col items-center gap-12 font-mono text-lg uppercase tracking-[0.3em] text-[#e2e2e2]">
            {navLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
