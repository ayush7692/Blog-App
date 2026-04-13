import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { editBlog, getBlogs, removeBlog } from '../features/blog/blogSlice';
import { updateProfile } from '../features/auth/authSlice';
import { NARUTO_AVATARS } from '../constants/avatarConstants';
import LoadingScreen from '../components/LoadingScreen';
import toast from 'react-hot-toast';

const ProfilePage = () => {

  const { user } = useSelector(state => state.auth)
  const { blogs, edit, blogError, blogLoading, blogErrorMessage, blogSuccess } = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showAvatars, setShowAvatars] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(user?.bio || "");

  const myBlogs = blogs.filter(blog => blog.user?._id === user?._id || blog.user === user?._id)

  const handleAvatarChange = (avatarUrl) => {
    dispatch(updateProfile({ avatar: avatarUrl }))
    toast.success("Avatar Synchronization Complete")
    setShowAvatars(false)
  }

  const handleBioSave = () => {
    dispatch(updateProfile({ bio: bioText }))
    toast.success("Bio Data Updated")
    setIsEditingBio(false)
  }

  const handleDelete = (id) => {
    dispatch(removeBlog(id))
    toast.success("Deleted")

  }

  const handleEdit = (blog) => {
    console.log(blog)
    dispatch(editBlog(blog))
    navigate('/blogs/add')
  }

  useEffect(() => {
    if (user?.bio) {
        setBioText(user.bio)
    }

    if (!user) {
      navigate("/")
    }

    if (!blogError) {
      dispatch(getBlogs())
    }

    if (blogError) {
      toast.error(blogErrorMessage)
    }
  }, [user?.bio, blogError, blogErrorMessage])



  if (blogLoading) {
    return (<LoadingScreen loadingMessage='Blogs Loading...' />)
  }

  return (
    <div className="relative min-h-screen bg-[#131313] selection:bg-white selection:text-black font-sans text-white">
      <div className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-[9999]"></div>

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto relative z-10">

        {/* Profile Header Section */}
        <header className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#c6c6c6] mb-4 block">IDENTIFICATION v.01</span>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 border-t border-white/10 pt-12 items-end">
            <div className="md:col-span-4 lg:col-span-3">
              <div className="group relative aspect-square bg-[#1b1b1b] overflow-hidden border flex items-center justify-center border-white/10 p-2 cursor-pointer" onClick={() => setShowAvatars(!showAvatars)}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.name}
                    className="w-full h-full object-cover grayscale-0 brightness-75 group-hover:grayscale-8 group-hover:brightness-100 transition-all duration-500"
                  />
                ) : (
                  <h1 className='text-8xl font-bold '>{user?.name[0]}</h1>
                )}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[10px] uppercase tracking-widest">[ CHANGE_AVATAR ]</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 lg:col-span-9 flex flex-col h-full justify-between pb-2">
              <div>
                <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter leading-none text-white uppercase mb-4">
                  {user?.name}
                </h1>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00FF41] block mb-8">
                  // {user?.email}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#c6c6c6] block">USER_BIO</span>
                    {!isEditingBio ? (
                      <button 
                        onClick={() => setIsEditingBio(true)}
                        className="font-mono text-[9px] uppercase tracking-wider text-white/40 hover:text-[#00FF41] transition-colors"
                      >
                        [ EDIT_BIO ]
                      </button>
                    ) : (
                      <button 
                        onClick={handleBioSave}
                        className="font-mono text-[9px] uppercase tracking-wider text-[#00FF41] hover:text-white transition-colors"
                      >
                        [ SAVE_LOG ]
                      </button>
                    )}
                  </div>
                  
                  {isEditingBio ? (
                    <textarea 
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      maxLength={200}
                      className="w-full bg-[#1b1b1b] border border-white/10 p-3 font-sans text-[#c6c6c6] text-sm leading-relaxed outline-none focus:border-[#00FF41] transition-colors h-24 resize-none"
                      placeholder="Enter bio data..."
                    />
                  ) : (
                    <div className="group relative">
                      <p className="font-sans text-[#c6c6c6] text-sm leading-relaxed min-h-[5rem] whitespace-pre-wrap">
                        {user?.bio || "No bio data recorded in the current session."}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#c6c6c6] mb-1 block">COMMS LINK</span>
                    <p className="font-sans text-white text-sm">{user?.email}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#c6c6c6] mb-1 block">SYSTEM ENTRY</span>
                    <p className="font-sans text-white text-sm">Member since {new Date(user?.createdAt || Date.now()).getFullYear()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Selection Grid */}
          {showAvatars && (
            <div className="mt-12 border-t border-white/10 pt-12 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[#00FF41]">SELECT_SHINOBI_AVATAR</h3>
                <button onClick={() => setShowAvatars(false)} className="font-mono text-[10px] uppercase text-white/40 hover:text-white">[ CLOSE ]</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-4">
                {NARUTO_AVATARS.map((avatar, index) => (
                  <div
                    key={index}
                    onClick={() => handleAvatarChange(avatar.url)}
                    className="group relative aspect-square bg-[#1b1b1b] border border-white/10 p-1 cursor-pointer hover:border-[#00FF41] transition-all duration-300"
                    title={avatar.name}
                  >
                    <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                    <div className="absolute inset-0 bg-[#00FF41]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>

                {/* User's Blogs Feed */}
                <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
                    <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tighter uppercase">My Postings</h2>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#c6c6c6]">
                        TOTAL: {myBlogs.length < 10 ? `0${myBlogs.length}` : myBlogs.length}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
                    {myBlogs.map((article) => (
                        <article
                            key={article._id}
                            className="group relative aspect-square bg-[#131313] border-b border-r border-white/10 p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-[#1b1b1b]"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-display text-2xl font-light text-white/40">{article._id[0]+article._id[article._id.length-1]}</span>
                                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-[#c6c6c6]">{article.author}</span>
                            </div>

                            <div className="w-full mt-auto">
                                {/* {article.hasImage && (
                                    <div className="h-40 w-full bg-[#1b1b1b] mb-6 overflow-hidden hidden md:block">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover grayscale opacity-50 transition-all duration-500"
                                        />
                                    </div>
                                )} */}
                                <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-[#c6c6c6] mb-2 block">{new Date(article.createdAt).toDateString("en-IN")}</span>
                                <h3 className="font-display text-2xl font-bold tracking-tighter leading-tight text-white mb-6">
                                    {article.title}
                                </h3>

                                <div className="flex items-center gap-4 mt-8 pt-4 border-t border-white/5">
                                    <button
                                        onClick={()=>handleEdit(article)}
                                        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-white hover:text-white/70 transition-colors"
                                    >
                                        [ EDIT ]
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article._id)}
                                        className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-red-500 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
                                    >
                                        [ DELETE ]
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                    {myBlogs.length === 0 && (
                        <div className="col-span-full py-24 text-center border-b border-r border-white/10">
                            <span className="font-mono text-sm uppercase tracking-[0.2em] text-[#c6c6c6]">NO POST FOUND</span>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};

export default ProfilePage;
