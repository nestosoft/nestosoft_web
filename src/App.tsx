import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CaseStudies from "./pages/CaseStudies"
import Rememberthis from "./components/Rememberthis"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"

function App() {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="showcase" element={<CaseStudies />} />
              <Route path="rememberthis" element={<Rememberthis />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </BrowserRouter>
      )
}

export default App
