import React from "react";
import Header from "./Header";

export default function BodyTemplate(props) {
   return (
      <>
         <Header />
         <div className="container"></div>
         {props.children}
      </>
   );
}
