import React from "react";
import  styles  from './Navbar.module.css';
import mealDeliveryLogo from "@/images/top5mealdelivery_logo.svg?url";


const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>

    <nav className={styles.navbar}>
      <div>
      <img src={mealDeliveryLogo} alt="Logo" width="198" height="32" />
        </div>

    </nav>
    </div>
  );
};

export default Navbar;
