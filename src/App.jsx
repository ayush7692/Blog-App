import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogsPage from './pages/BlogsPage';
import AddBlogPage from './pages/AddBlogPage';
import ReadBlogPage from './pages/ReadBlogPage';
import NotFoundPage from './pages/NotFound';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<ReadBlogPage />} />
        <Route element={<PrivateComponent />}>
          <Route path="/blogs/add" element={<AddBlogPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
