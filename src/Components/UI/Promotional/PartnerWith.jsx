import React from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import styles from './PartnerWith.module.css';
import useIsWideScreen from "@/hooks/useIsWideScreen";
import { partnerBrands}  from "@/utils/data/partnerWithBrands";
const PartnerWith = () => {


  const { questionnaireCompleted } = useQuestionnaire();
  const isWideScreen = useIsWideScreen();
//  const finalStyle={
//   padding:"48px 0px",
//  }
//   const finalMobileStyle = {
//     padding: "0px 16px 16px",
//   };
  // console.log(isWideScreen)
  return (
    <div className={styles.partnerWithWrapper}   
      // questionnaireCompleted
      //   ? !isWideScreen
      //     ? finalMobileStyle
      //     : finalStyle
      //   : {}
    >
      <div className={styles.partnerWithContainer}>
        <h2 className={styles.partnerWithTitle}>We proudly partner with</h2>
        <div className={styles.partnerWithDivider}></div>
        <div className={styles.partnerWithBrandsContainer}>
          {partnerBrands.map((logo, index) => {

          const outlink = `https://out.top5mealdelivery.com/track/click/?pid=${logo.pid}&internal=true&page=${window.location.pathname}&action=partnerwith`
          return (
            <a key={logo.alt} href={outlink} target="_blank" rel="nofollow" className={styles.partnerWithLogoContainer}   style={{
                '--orderDesktop': logo.orderDesktop,
                '--orderMobile': logo.orderMobile,
              }} >
              <img height="30" width="100" className={styles.partnerWithLogo} src={logo.src} alt={logo.alt} loading="lazy" />

            </a>
          
          )})}
        </div>
      </div>
    </div>
  );
};

export default PartnerWith;
