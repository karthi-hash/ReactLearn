import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header=()=>{
  const [btnNameReact, setBtnNameReact] =useState("Login");
   const onlineStatus=useOnlineStatus();
   const {loggedInUser}=useContext(UserContext);
//subscribing to the stre using a selctor
   const cartItems = useSelector((store) => store.cart.items);
   

    return(
      <div className="flex justify-between  ">
        <div className="logo-container">
         <img className="w-56" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png?nwm=1&nws=1&industry=fast-food&sf=&txt_keyword=All"/>
          </div>
          <div className="flex items-center">
            <ul className="flex p-4 m-4">
              <li className="px-4">onlineStatus: {onlineStatus ? "🟢" : "🔴"}</li>
              <li className="px-4"><Link to={"/"}>Home</Link></li>
              <li className="px-4"> <Link to={"/about"}>About Us</Link></li>
              <li className="px-4"> <Link to={"/contact"}>Contact</Link></li>
              <li  className="px-4"> <Link to={"/grocery"}>grocery</Link></li>
              
              <li className="px-4 font-bold text-xl">cart - ({cartItems.length} items)</li>
              <button className="login"
              onClick={() => {
                btnNameReact === "Login"
                ?setBtnNameReact("Logout")
                :setBtnNameReact("Login");
              }}
              >
                {btnNameReact}
              </button>
              <li className="px-4 font-bold">{loggedInUser}</li>
            </ul>
          </div>
        </div>
    ); 
  };

  export default Header;