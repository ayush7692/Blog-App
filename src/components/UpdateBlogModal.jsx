import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlogModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock pre-filled data based on the ID
  const blogId = id || '1';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="bg-[#111] border border-white/10 w-full max-w-2xl mx-4 p-8 md:p-12 relative overflow-hidden">
        {/* Subtle dot grid pattern on modal bg */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        
        <div className="relative z-10 flex flex-col gap-8">
          <div>
            <h1 className="font-display text-3xl text-white font-medium mb-1">Update Blog</h1>
            <p className="font-mono text-sm text-[#c6c6c6] tracking-wide">
              [SYSTEM_ID: {blogId.padStart(6, '0')}]
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative group">
              <label className="font-mono text-xs text-[#c6c6c6] uppercase tracking-widest absolute top-3 left-4 transition-all duration-300 pointer-events-none">
                Title_
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/20 focus:border-white text-white font-sans text-lg px-4 pt-8 pb-3 outline-none transition-colors"
                defaultValue="Neural Net Dreams"
              />
            </div>

            <div className="flex flex-col gap-2 relative group mt-4">
              <label className="font-mono text-xs text-[#c6c6c6] uppercase tracking-widest absolute top-3 left-4 transition-all duration-300 pointer-events-none">
                Description_
              </label>
              <textarea
                className="w-full bg-transparent border-b border-white/20 focus:border-white text-white font-sans text-base px-4 pt-8 pb-3 min-h-[160px] outline-none transition-colors resize-y leading-relaxed"
                defaultValue="Exploring deep learning architectures from a futuristic lens."
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 relative group mt-4 mb-8">
              <label className="font-mono text-xs text-[#c6c6c6] uppercase tracking-widest absolute top-3 left-4 transition-all duration-300 pointer-events-none">
                Author_
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-white/20 focus:border-white text-white font-sans text-lg px-4 pt-8 pb-3 outline-none transition-colors"
                defaultValue="cyberdev"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <button 
                className="w-full bg-white text-black font-mono uppercase tracking-wider font-semibold py-4 hover:bg-[#d4d4d4] transition-colors"
                onClick={() => {
                  // TODO: Wire API call to update blog
                  navigate('/blogs');
                }}
              >
                [UPDATE]
              </button>
              <button 
                className="w-full bg-transparent border border-white/10 text-white font-mono uppercase tracking-wider py-4 hover:bg-white/5 transition-colors"
                onClick={() => navigate('/blogs')}
              >
                Cancel_
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlogModal;
