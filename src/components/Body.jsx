import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const Body = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <NavBar />
      <Outlet />
      {user && <Footer />}
    </div>
  );
};

export default Body;
