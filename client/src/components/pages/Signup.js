import React from "react";
import landingLogo from "../../images/DIDYA-Logo-PURPLE-and-WHITE.svg";
import SignUp from "../ui/SignUp";

export default function Landing() {
   return (
      <div className="landing-background">
         <div className="container-fluid">
            <div className="row">
               <div className="col pt-2 pl-2 pr-2 pb-2">
                  <img
                     className="img-fluid"
                     src={landingLogo}
                     alt="Welcome to Didya"
                     id="landing-image"
                  />
               </div>
            </div>
         </div>

         <SignUp />
      </div>
   );
}
