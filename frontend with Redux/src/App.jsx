import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import LayOut from "./layout/LayOut";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Services from "./components/Services/Services";
import DashBoardLayout from "./layout/DashBoardLayout";
import Inbox from "./components/Inbox/inbox";
import UserDashboard from "./layout/userDashboard";
import UserAllProducts from "./components/user/UserAllProducts";
import { AdminRoute } from "./components/protected routes/adminProtected";
import { UserProtectedRoute } from "./components/protected routes/userProtected";
import UserProfile from "./components/user/UserProfile";
// import { Navigate } from "react-router-dom";
// const AdminRoute = ({ element }) => {
//   const token = localStorage.getItem("mytoken");
//   const tokenPayload = JSON.parse(atob(token.split(".")[1]));
//   // console.log(tokenPayload,"tttt");
//   const isAdmin = token && tokenPayload.role === "admin";

//   return isAdmin ? element : <Navigate to="/login" />;
// };
function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route element={<LayOut />}>
          <Route index path="/" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* admin routes */}
        <Route
          path="/admin-dashboard"
          element={<AdminRoute element={<DashBoardLayout />} />}
        />
        <Route path="/inbox" element={<AdminRoute element={<Inbox />} />} />

        {/* user routes */}
        <Route
          path="/user-dashboard"
          element={<UserProtectedRoute element={<UserDashboard />} />}
        />
        <Route
          path="/user-profile"
          element={<UserProtectedRoute element={<UserProfile />} />}
        />
        <Route
          path="/allproducts"
          element={<UserProtectedRoute element={<UserAllProducts />} />}
        />


        {/* <Route path="/inbox" element={<Inbox />} /> */}

      </Routes>
    </>
  );
}

export default App;
