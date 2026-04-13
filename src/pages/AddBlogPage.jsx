import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { createBlog, editBlog, updateBlog } from "../features/blog/blogSlice";

const AddBlogPage = () => {

  const { blog,edit,blogSuccess,blogError,blogLoading,blogErrorMessage } = useSelector(state => state.blog)
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const[formData,setformData]=useState({
    title:"",
    description:"",
    author:user?.name
  })

  const{title,description,author}=formData

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!formData.title) return
    if(edit.isEdit){
      dispatch(updateBlog(formData))
      toast.success("SuccessFully Updated")
    }else{
      dispatch(createBlog(formData))
    
     
    }
  }

  const handleChange = (e)=>{
    setformData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }


  useEffect(() => {

    if (!user) {
      navigate("/login")
    }
     if(blogSuccess){
      navigate("/blogs")
     }

    if(edit.isEdit){
      setformData(edit.blog)
    }

    if(blogError){
      toast.error(blogErrorMessage)
    }


  }, [user,blogError,blogErrorMessage,blogSuccess])

  if(blogLoading){
    return(<LoadingScreen loadingMessage='Hurry of Writing 😁...' />)
  }

  return (
    <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black font-sans text-white overflow-x-hidden">
      <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]"></div>

      {/* Editor Canvas */}
      <form onSubmit={handleSubmit} className="min-h-screen pt-32 pb-20 relative dot-grid overflow-x-hidden z-10">

        {/* Action Toolbar (Ghosted) */}
        <div className="max-w-4xl mx-auto mb-12 flex justify-between items-end border-b border-[#474747]/20 pb-4 px-4 sm:px-0">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#919191]">DRAFT_MODE</span>
            <span className="font-mono text-[0.6875rem] text-[#c6c6c6]">WORDS: 0</span>
          </div>
          <button type="submit" className="bg-white text-black font-mono text-[0.6875rem] uppercase tracking-[0.1em] px-6 py-3 font-bold hover:bg-[#d4d4d4] transition-all duration-100 outline-none">
            {edit.isEdit?"UPDATED":"PUBLISH"}
          </button>
        </div>

        {/* Main Input Area */}
        <div className="max-w-4xl mx-auto px-4 z-20 relative">
          <div className="relative group">
            <input
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="w-full bg-transparent border-none p-0 mb-8 font-display text-5xl md:text-7xl font-bold tracking-tighter text-white placeholder:text-[#353535] focus:ring-0 outline-none"
              placeholder="Untitled Blog Post"
              type="text"
            />
          </div>
          <div className="relative mt-4">
            <div className="absolute -top-10 right-0 py-2 hidden sm:block">
              <span className="font-mono text-[0.625rem] text-[#919191] uppercase tracking-[0.1em]">Markdown Enabled</span>
            </div>

            {/* Standard Textarea for writing logic without blinking animation which glitches css sometimes in React without keyframes */}
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              className="w-full min-h-[60vh] bg-transparent border-none p-0 font-sans text-lg md:text-xl leading-relaxed text-[#c6c6c6] placeholder:text-[#353535] focus:ring-0 resize-none overflow-auto outline-none"
              placeholder="Begin the archive..."
            ></textarea>
          </div>
           <div className="relative group">
            <input
               name="author"
              value={author}
              onChange={handleChange}
              className="w-full bg-transparent border-none p-0 mb-8 font-display text-3xl md:text-4xl font-bold tracking-tighter text-white placeholder:text-[#353535] focus:ring-0 outline-none"
              placeholder="Written By"
              type="text"
            />
          </div>
        </div>

        {/* Structural Metadata (Asymmetric Layout) */}
        <aside className="hidden lg:block fixed left-8 bottom-32 w-48 pointer-events-none">
          <div className="flex flex-col gap-6 opacity-30">
            <div className="border-t border-[#474747] pt-2">
              <span className="font-mono text-[0.625rem] uppercase tracking-widest block mb-1">OBJECT_ID</span>
              <span className="font-mono text-[0.6875rem] block text-white">8239-XLR-2024</span>
            </div>
            <div className="border-t border-[#474747] pt-2">
              <span className="font-mono text-[0.625rem] uppercase tracking-widest block mb-1">VISIBILITY</span>
              <span className="font-mono text-[0.6875rem] block text-white">RESTRICTED_ACCESS</span>
            </div>
          </div>
        </aside>

        {/* Aesthetic Vertical Line */}
        <div className="absolute left-[50%] -translate-x-1/2 top-0 h-full w-[1px] bg-[#474747]/10 -z-10 pointer-events-none"></div>
      </form>
    </div>
  );
};

export default AddBlogPage;
