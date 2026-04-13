import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import toast from "react-hot-toast";
import { loginUser } from "../features/auth/authSlice";

const LoginPage = () => {


  const { user, userLoading, userError, userErrorMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[formData,setformData] = useState({
    email:"",
    password: ""
  })

  const{email,password} = formData  


  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(loginUser(formData))
  } 

  const handleChange = (e)=>{
    setformData({
        ...formData,
        [e.target.name]:e.target.value
    })
  }

  useEffect(() => {

    if (user) {
      navigate("/")
    }

    if (userError && userErrorMessage) {
      toast.error(userErrorMessage, { position: "bottom-right" })
    }


  }, [user, userError, userErrorMessage])


  if (userLoading) {
    return (
      <LoadingScreen />
    )
  }



  return (
    <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black font-sans text-white">
      <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]"></div>
      <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none"></div>

      {/* Background Ghost Typography */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="font-display font-bold text-[40vw] leading-none text-white opacity-[0.03] tracking-tighter">LOG</span>
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="mb-12 space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#919191]">Authentication Gate</span>
            <h1 className="font-display text-4xl font-bold tracking-tighter text-white">ACCESS_SECURE</h1>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[#c6c6c6]">Email Identification</label>
              <input
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 px-4 py-4 text-sm font-mono tracking-wider placeholder:text-white/30 focus:border-white focus:ring-0 transition-colors duration-200 outline-none rounded-none text-white"
                placeholder="USER@ARCHIVE.SYS"
                type="email"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[#c6c6c6]">Security Cipher</label>
              <input
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full bg-transparent border border-white/20 px-4 py-4 text-sm font-mono tracking-wider placeholder:text-white/30 focus:border-white focus:ring-0 transition-colors duration-200 outline-none rounded-none text-white"
                placeholder="••••••••••••"
                type="password"
              />
            </div>
            <div className="pt-4 space-y-6">
              <button
                type="submit"
                className="w-full bg-white text-black font-display font-bold uppercase tracking-widest py-5 text-sm hover:bg-[#d4d4d4] transition-all duration-100 active:scale-[0.98]"
              >
                Sign In
              </button>
              <div className="flex flex-col items-center gap-4">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#c6c6c6] hover:text-white transition-colors duration-100 underline-offset-4 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
            </div>
          </form>
          <div className="mt-24 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-white/10"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Encrypted Session</span>
            <div className="h-[1px] flex-1 bg-white/10"></div>
          </div>
        </div>
      </main>

      {/* Decorative Corner Accents */}
      <div className="fixed top-24 left-8 w-4 h-4 border-t border-l border-white/20 pointer-events-none hidden md:block"></div>
      <div className="fixed top-24 right-8 w-4 h-4 border-t border-r border-white/20 pointer-events-none hidden md:block"></div>
      <div className="fixed bottom-12 left-8 w-4 h-4 border-b border-l border-white/20 pointer-events-none hidden md:block"></div>
      <div className="fixed bottom-12 right-8 w-4 h-4 border-b border-r border-white/20 pointer-events-none hidden md:block"></div>
    </div>
  );
};

export default LoginPage;
