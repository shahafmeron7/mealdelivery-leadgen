import React from "react"
import styles from './StarsHero.module.css'
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";

const StarsHero = ()=>{
const {currentQuestionCode} = useQuestionnaire();
  return (
      <div key={currentQuestionCode} className={`animateStaggerItem animateFadeOut ${styles.starsLogoContainer}`}>
        <div className={styles.logoPosWrapper}>
        <img src="https://assets.trafficpointltd.com/app/uploads/sites/134/2024/04/17132506/3-Stars.svg" width="91" height="39" alt="logo MS"/>
          <p className={styles.logoPosTitle}>We found your match</p>
          <span className={styles.logoPosTitleDesc}>Thank You! Based on the information you provided us with, we found you the best Meal Delivery Services for your needs.</span>
        </div>
      </div>
    )
  }

  export default StarsHero