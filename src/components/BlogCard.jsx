import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { editBlog, removeBlog } from '../features/blog/blogSlice';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const id = blog?._id;

  const handleEdit = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Sign in to edit');
      navigate('/login');
      return;
    }
    if (String(blog.user) !== String(user._id)) {
      toast.error('You can only edit your own posts');
      return;
    }
    dispatch(editBlog(blog));
    navigate('/blogs/add');
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error('Sign in to delete');
      navigate('/login');
      return;
    }
    if (String(blog.user) !== String(user._id)) {
      toast.error('You can only delete your own posts');
      return;
    }
    dispatch(removeBlog(id));
    toast.success('Deleted');
  };

  return (
    <div
      className="group bg-[#111111] border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.02] flex flex-col p-6 h-full cursor-pointer"
      onClick={() => id && navigate(`/blogs/${id}`)}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#00FF41]/70 mb-2 block">
            [SYS_LOG]
          </span>
          <h2 className="font-display text-xl font-medium text-white group-hover:text-white transition-colors">
            {blog.title}
          </h2>
          <div className="flex items-center gap-3 mt-3">
             <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-[#1b1b1b]">
                <img 
                    src={blog.user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"} 
                    alt={blog.author} 
                    className="w-full h-full object-cover grayscale opacity-80"
                />
             </div>
             <span className="font-mono text-xs text-white/40">
                by_ {blog.author}
             </span>
          </div>
        </div>
        <p className="font-sans text-sm text-[#c6c6c6] line-clamp-2 leading-relaxed">
          {blog.description}
        </p>
      </div>

      <div className="flex items-center gap-6 mt-8 pt-4 border-t border-white/[0.08]">
        <button
          type="button"
          onClick={handleEdit}
          className="font-mono text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0"
        >
          {'>'} Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors bg-transparent border-none appearance-none cursor-pointer p-0"
        >
          {'>'} Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
