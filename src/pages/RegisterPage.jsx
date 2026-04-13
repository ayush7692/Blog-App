import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import toast from 'react-hot-toast';
import { registerUser } from '../features/auth/authSlice';

const RegisterPage = () => {

  const { user, userLoading, userError, userErrorMessage } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const[formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const{name,email,password,confirmPassword} = formData

  const handleSubmit = (e)=>{
    e.preventDefault()
     if(password!==confirmPassword){
        toast.error("Password not match")
     }else{
      dispatch(registerUser(formData))
    }
  }

  const handleChange = (e)=>{
    setFormData({
          ...formData,
        [e.target.name]:e.target.value
    })
  }


  useEffect(() => {
    console.log(user)
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
    <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black overflow-hidden font-sans text-white">
      <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]"></div>
      <div className="fixed inset-0 dot-grid opacity-20 pointer-events-none"></div>

      {/* Background Geometric Outlines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] border border-[#474747]/10 rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] border border-[#474747]/10"></div>
        <div className="absolute top-[40%] right-[10%] w-[15rem] h-[15rem] border border-[#474747]/5 rotate-45"></div>
      </div>

      {/* Default Navigation takes care of top, so we add padding */}
      <main className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 z-10">
        <div className="w-full max-w-[400px]">
          {/* Hero Header for Register */}
          <header className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#919191] mb-4">MEMBER_ONBOARDING</p>
            <h1 className="font-display text-5xl font-bold tracking-tighter text-white leading-none uppercase">Create<br />Account</h1>
          </header>

          {/* Registration Form */}
          <form className="space-y-10" onSubmit={handleSubmit}>
            <div className="relative group">
              <label className="block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-[#c6c6c6] mb-2 group-focus-within:text-white transition-colors" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="ARCHIVE_CITIZEN_01"
                type="text"
                className="w-full bg-transparent border-0 border-b border-[#474747]/50 py-3 px-0 focus:ring-0 focus:border-white text-white font-sans text-sm placeholder:text-[#353535] transition-all outline-none"
              />
            </div>

            <div className="relative group">
              <label className="block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-[#c6c6c6] mb-2 group-focus-within:text-white transition-colors" htmlFor="email">Identity Address (Email)</label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="USER@MONOLITH.ARCHIVE"
                type="email"
                className="w-full bg-transparent border-0 border-b border-[#474747]/50 py-3 px-0 focus:ring-0 focus:border-white text-white font-sans text-sm placeholder:text-[#353535] transition-all outline-none"
              />
            </div>

            <div className="relative group">
              <label className="block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-[#c6c6c6] mb-2 group-focus-within:text-white transition-colors" htmlFor="password">Access Cipher (Password)</label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="••••••••••••"
                type="password"
                className="w-full bg-transparent border-0 border-b border-[#474747]/50 py-3 px-0 focus:ring-0 focus:border-white text-white font-sans text-sm placeholder:text-[#353535] transition-all outline-none"
              />
            </div>
            <div className="relative group">
              <label className="block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-[#c6c6c6] mb-2 group-focus-within:text-white transition-colors" htmlFor="password">Access Cipher (Confirm-Password)</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="••••••••••••"
                type="Password"
                className="w-full bg-transparent border-0 border-b border-[#474747]/50 py-3 px-0 focus:ring-0 focus:border-white text-white font-sans text-sm placeholder:text-[#353535] transition-all outline-none"
              />
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-white text-black py-4 px-8 font-display font-bold uppercase tracking-widest text-xs hover:bg-[#d4d4d4] transition-all active:scale-[0.98]"
              >
                Create Account
              </button>
              <p className="mt-8 text-center">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-[#c6c6c6]">Already have an account? </span>
                <Link to="/login" className="font-mono text-[0.6875rem] uppercase tracking-[0.05em] text-white underline underline-offset-4 hover:text-[#d4d4d4] transition-colors">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      {/* Aesthetic Vertical Decorative Text */}
      <div className="fixed bottom-12 left-8 hidden lg:block z-0 pointer-events-none">
        <p className="font-mono text-[0.5rem] leading-[2] text-[#474747] uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
          SYSTEM_AUTHENTICATION_PROTOCOL_v4.0.2
        </p>
      </div>
      <div className="fixed top-32 right-8 hidden lg:block z-0 pointer-events-none">
        <p className="font-mono text-[0.5rem] leading-[2] text-[#474747] uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
          DATA_ENCRYPTION_ACTIVE
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
