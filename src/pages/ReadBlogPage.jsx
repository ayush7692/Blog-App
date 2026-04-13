import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { getBlog } from '../features/blog/blogSlice';
import toast from 'react-hot-toast';

const ReadBlogPage = () => {
  const { id } = useParams();

  const { blog, blogError, blogLoading, blogErrorMessage, blogSuccess } = useSelector(state => state.blog)
  const dispatch = useDispatch()

  
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date());



  useEffect(() => {

    if (!blogError) {
      dispatch(getBlog(id))
    }


    if (blogError) {
      toast.error(blogErrorMessage)
    }
  }, [blogError, blogErrorMessage,id])



  if (blogLoading) {
    return (<LoadingScreen loadingMessage='Blogs Loading...' />)
  }
    

  return (
    <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black font-sans text-white overflow-x-hidden">
      <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999;]"></div>
      <div className="dot-grid fixed inset-0 opacity-20 pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="relative pt-32 pb-24 px-6 max-w-4xl mx-auto z-10 min-h-screen">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-12 border-b border-[#474747]/30 pb-4">
          
            <Link to="/blogs" className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#c6c6c6] hover:text-white transition-colors cursor-pointer">
                &lsaquo; RETURN TO ARCHIVE
            </Link>
        </div>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex justify-between items-start mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#919191]">SYSTEM_LOG_{id || '01'}</span>
            <span className="font-mono text-xs uppercase tracking-[0.1em'] text-[#c6c6c6]">{new Date(blog.createdAt).toDateString("en-IN")}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-white mb-8 border-b border-[#474747]/20 pb-8">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 cursor-pointer rounded-full border border-white/20 overflow-hidden bg-[#1b1b1b] hover:scale-280  transition-all duration-700 ">
                  <img 
                      src={blog.user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} 
                      alt={blog.author} 
                      className="w-full h-full object-cover grayscale-0 opacity-80"
                  />
               </div>
               <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-[#00FF41]">{blog.author}</span>
            </div>
            <span className="font-mono text-[0.625rem] px-3 py-1 border border-white/10 uppercase tracking-widest text-white/70">Read_Time_{time}</span>
          </div>
        </header>

        {/* Article Body */}
        <article className="font-sans text-lg md:text-xl leading-relaxed text-[#c6c6c6] space-y-8 max-w-3xl">
          <p>
            {blog.description}
          </p>
          {/* <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAr8X1r8h9pfOIliKcMcbHmNsm4Tmpy5wjsYoT4VJXZIW7JFDR2vTZ-WcU6o_mkRtJKJN3XqPmDJio-4r2LYZ-jd6UnpkYkQ1PXjab5M7H2FmyBQdUqgTV51FUK9IbC7V5kR0dlCM6Hy5ka3nRrweAxl22Z8nRMJVE9ALy5yPpqFrjTnaGOryRn7Qibnt0zE6MU9QmC4d_skw6Xvvdx_2BtCbyU3RSyi-fFqkZ-1zeIRbtDJtzssaD7ehrngRuk8r2u2OR1dUHWUAtZ" 
               alt="Brutalist Design"
               className="w-full grayscale opacity-70 border border-white/10 my-12 object-cover object-center"
          /> */}
         
        </article>

        {/* Footer Meta */}
        <footer className="mt-24 pt-8 border-t border-[#474747]/20 flex justify-between items-center opacity-50">
           <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#c6c6c6]">END_OF_RECORD</span>
           <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#c6c6c6]">AUTHOR_UID{blog?._id?.toString().slice(2,15)}</span>
        </footer>
      </main>

      {/* Decorative Elements */}
      <div className="hidden lg:block fixed left-8 bottom-32 w-48 pointer-events-none">
        <div className="flex flex-col gap-6 opacity-30">
        <div className="border-t border-[#474747] pt-2">
            <span className="font-mono text-[0.625rem] uppercase tracking-widest block mb-1">VIEW_STATE</span>
            <span className="font-mono text-[0.6875rem] block text-white">ACTIVE_READING</span>
        </div>
        </div>
      </div>
      <div className="absolute left-[50%] -translate-x-1/2 top-0 h-full w-[1px;] bg-[#474747]/5 -z-10 pointer-events-none"></div>
    </div>
  );
};

export default ReadBlogPage;
