import { BrowserRouter, Route, Routes } from "react-router-dom";
import  { Blog }  from '../src/pages/Blog';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Blogs from './pages/Blogs';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;