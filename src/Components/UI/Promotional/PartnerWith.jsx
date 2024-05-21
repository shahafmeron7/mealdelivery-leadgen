import React from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import styles from './PartnerWith.module.css';
import useIsWideScreen from "@/hooks/useIsWideScreen";
import { partnerBrands}  from "@/utils/data/partnerWithBrands";
const PartnerWith = () => {


  const { questionnaireCompleted } = useQuestionnaire();
  const isWideScreen = useIsWideScreen();

 const finalStyle={
  padding:"64px 0px",
 }
  const finalMobileStyle = {
    padding: "32px 16px 32px",
  };
  console.log(isWideScreen)
  return (
    <div className={styles.partnerWithWrapper}   style={
      questionnaireCompleted
        ? !isWideScreen
          ? finalMobileStyle
          : finalStyle
        : {}
    }>
      <div className={styles.partnerWithContainer}>
        <h2 className={styles.partnerWithTitle}>We proudly partner with</h2>
        <div className={styles.partnerWithDivider}></div>
        <div className={styles.partnerWithBrandsContainer}>
          {partnerBrands.map((logo, index) => (
            <div key={logo.alt} className={styles.partnerWithLogoContainer} >
              <img height="30" width="100" className={styles.partnerWithLogo} src={logo.src} alt={logo.alt} loading="lazy" />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerWith;
