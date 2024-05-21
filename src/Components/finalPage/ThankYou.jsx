import React from "react";
import styles from "./ThankYou.module.css";
import  TrohpyIcon  from "@/images/thank you/Trophy.svg";
const Lineup = () => {
  return (
    <div className={styles.thankYouContainer}>
       <TrohpyIcon aria-label={"Trophy Icon"}/>
      <div className={styles.titleWrapper}>
        <h1 className={styles.thankYouTitle}>We found your match!</h1>
        <p className={styles.thankYouDesc}>
        Thank you! Based on the information you provided us with, we found you the best meal delivery service for you.
        </p>
      </div>
    </div>
  );
};

export default Lineup;
