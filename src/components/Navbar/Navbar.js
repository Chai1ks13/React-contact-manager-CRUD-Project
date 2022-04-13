import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <React.Fragment>
      
       <nav className=" navbar navbar-expand-sm navbar-dark bg-dark ">
         <div className=" container fw-bolder" >
             <Link to = {'/contacts/list'} className = "navbar-brand">
             <i class="bi bi-phone text-warning"/> Contact  <span className=" text-warning">Manager</span>
             </Link>
             </div>
       </nav>
       
    </React.Fragment>
  );
};

export default Navbar;
