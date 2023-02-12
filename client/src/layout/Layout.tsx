import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => (
  <>
    <Navbar />
    <div className="flex-1">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default Layout;
