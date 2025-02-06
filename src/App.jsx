import HomePage from "./components/HomePage/home-page.jsx";
import '../app.css'
import {Route, Routes} from "react-router";
import WantedPage from "./components/WantedPage/wanted-page.jsx";
import RightSection from "./components/RightSection/right-section.jsx";
import WantedPageSingle from "./components/WantedPageSingle/wanted-page-single.jsx";
function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage />}>
            <Route index element={<RightSection />} />
            <Route path='wanted/:slug' element={<WantedPage />}/>
            <Route path='wanted/:slug/:uuid' element={<WantedPageSingle />}/>
        </Route>
      </Routes>

  )
}

export default App
