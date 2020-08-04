import React from "react";
import landingLogo from "../../images/DIDYA-Logo-PURPLE-and-WHITE.svg";
import LogIn from "../ui/LogIn";
import { Link } from "react-router-dom";

export default function Landing() {
   return (
      <div className="landing-background">
         <div className="container-fluid">
            <div className="row">
               <div className="col pt-2 pl-2 pr-2 pb-2">
                  <img
                     className="img-fluid img-center"
                     src={landingLogo}
                     alt="Welcome to Didya"
                     id="landing-image"
                  />
               </div>
            </div>
         </div>
         <LogIn />
         <Link to="/signup" className="btn signup-button btn-lg mt-4 ml-4 ">
            SIGN UP
         </Link>
      </div>
   );
}
