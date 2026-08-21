import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Marriage from "./pages/Marriage";
import Puja from "./pages/Puja";
import Birthday from "./pages/Birthday";
import Reception from "./pages/Reception";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import CategoryPage from "./pages/CategoryPage";
import DesignDetails from "./pages/DesignDetails";
import Footer from "./components/Footer";

//ADMIN SECTION
import AddDesign from "./Admin/AddDesign";
import ManageDesigns from "./Admin/ManageDesigns";
import Dashboard from "./Admin/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./Admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/design/:id" element={<DesignDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/add-design"
          element={
            <ProtectedRoute>
              <AddDesign/>
            </ProtectedRoute>
          }
        />
        <Route path="/admin/manage-designs"
          element={
            <ProtectedRoute>
              <ManageDesigns/>
            </ProtectedRoute>
          }
        />
        <Route path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<Login />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;