import React from "react";
import styles from "./ThankYou.module.css";
import  TrohpyIcon  from "@/images/thank you/Trophy.svg";
import StarsHero from "../UI/StarsHero";
const ThankYou = () => {
  return (
    <div className={styles.thankYouContainer}>
    {/* <StarsHero/> */}
        {/* <TrohpyIcon aria-label={"Trophy Icon"}/> */}
      <img src="https://assets.trafficpointltd.com/app/uploads/sites/134/2024/04/17132506/3-Stars.svg" width="91" height="39" alt="logo MS"/>
      <div className={styles.titleWrapper}>
        <h1 className={styles.thankYouTitle}>We found your match</h1>
        <p className={styles.thankYouDesc}>
        Based on the information you provided us with, we found you the best meal delivery service for you.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
