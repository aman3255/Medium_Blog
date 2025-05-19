import { BrowserRouter, Route, Routes } from "react-router-dom";
import  { Blog }  from './pages/Blog';
import  Signin from './pages/Signin';
import  Signup from './pages/Signup';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route />
          <Route />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;