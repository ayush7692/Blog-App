import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBlogs } from '../features/blog/blogSlice';
import LoadingScreen from '../components/LoadingScreen';

const BlogsPage = () => {

    const {blogs,blogError,blogLoading,blogErrorMessage} = useSelector(state => state.blog)
    const dispatch = useDispatch()


    useEffect(()=>{

      if(!blogError){
        dispatch(getBlogs())
      }
      

      if(blogError){
        toast.error(blogErrorMessage)
      }
    },[blogError,blogErrorMessage])


    if(blogLoading){
      return (<LoadingScreen loadingMessage='Blogs Loading...' />)
    }
    
  
    return (
      <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black font-sans text-white">
        <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999;]"></div>
        
        <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto relative z-10">
          
         {
          blogs?.length===0 ?(  <header className="mb-20 grid grid-cols-12 gap-6 relative">
            <div className="col-span-12 md:col-span-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c6c6c6] mb-4 block">Archive Index v.01</span>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white uppercase">
                  NO BLOGS YET...
              </h1>
            </div>
          </header>):(
            <>
        {/* Header Section */}
          <header className="mb-20 grid grid-cols-12 gap-6 relative">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c6c6c6] mb-4 block">Archive Index v.01</span>
              <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white uppercase">
                  The Monolith <br /> Perspectives
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col justify-end items-end text-right mt-4 md:mt-0">
              <p className="font-sans text-[#c6c6c6] text-sm max-w-[280px;]">
                  A curated collection of digital architecture, brutalist design thinking, and the future of minimal interfaces.
              </p>
            </div>
          </header>
  
          {/* blog Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
            {blogs?.map((blog) => (
              <article 
                key={blog?._id}
                className="group relative aspect-square bg-[#131313] border-b border-r border-white/10 p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-[#1b1b1b]"
              >
                <div className="flex justify-between items-start">
                  <span className="font-display text-2xl font-light text-white/40">{blog?._id[0] + blog._id[blog._id.length - 1]}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border border-white/20 overflow-hidden bg-[#1b1b1b]">
                      <img src={blog.user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} alt={blog.author} className="w-full h-full object-cover grayscale-0 opacity-80" />
                    </div>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#c6c6c6]">{blog?.author}</span>
                  </div>
                </div>
                
                <div className="w-full">
                  {/* {blog.hasImage && (
                    <div className="h-48 w-full bg-[#1b1b1b] mb-6 overflow-hidden">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" 
                      />
                    </div>
                  )} */}
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#c6c6c6] mb-2 block">{new Date(blog?.createdAt).toDateString("en-IN")}</span>
                  <h2 className="font-display text-3xl font-bold tracking-tighter leading-tight text-white mb-6 group-hover:underline underline-offset-8">
                    {blog.title}
                  </h2>
                  <Link to={`/blogs/${blog?._id}`} className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white border-b border-white/20 pb-1 hover:border-white transition-all inline-block cursor-pointer">
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
            </>
          )
         }
  
          {/* Pagination */}
          {/* <div className="mt-24 flex justify-center items-center gap-12 border-t border-white/5 pt-12">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-[#c6c6c6] cursor-pointer hover:text-white transition-colors">PREVIOUS</span>
            <div className="flex gap-4 items-center">
              <span className="font-display text-xl text-white">01</span>
              <span className="font-display text-xl text-[#c6c6c6]">/</span>
              <span className="font-display text-xl text-[#c6c6c6]">12</span>
            </div>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-white hover:underline underline-offset-4 cursor-pointer">NEXT PAGE</span>
          </div> */}
  
        </main>
      </div>
    );
  };
  
export default BlogsPage;
