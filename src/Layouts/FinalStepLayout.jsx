import React, { Suspense } from "react";
import Loading from '@/components/UI/LazyLoading/Loading'
import ContentLayout from "./ContentLayout";
import ThankYou from "@/components/finalPage/ThankYou";
import Advertiser from "@/components/finalPage/Advertiser";
import AdverstiserLayout from "./AdvertiserLayout";
import LineupSpaces from "@/components/finalPage/LineupSpaces";
import useIsWideScreen from "@/hooks/useIsWideScreen"
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";

// Lazy loading heavier components
const PartnerWith =React.lazy(() => import("@/components//UI/Promotional/PartnerWith"));

const FinalStepLayout = () => { 

  const {questionnaireCompleted} = useQuestionnaire()
  const isWideScreen = useIsWideScreen()
   const finalStyle={
   padding:"48px 0px",
  }
   const finalMobileStyle = {
     padding: "32px 16px",
   };
    const stylePartner =  questionnaireCompleted
       ? !isWideScreen
         ? finalMobileStyle
         : finalStyle
       : {}
  return (
    <>
    <AdverstiserLayout bgColor={"#F7F7F7"}>
        <Advertiser/>
      </AdverstiserLayout>
      <ContentLayout bgColor={"rgba(0, 28, 65, 0.05)"} padding={`${isWideScreen ? "48px 40px" :"32px 16px" }`}>
        <ThankYou />
      </ContentLayout>
      <ContentLayout bgColor={"#f6f6f6"} padding={isWideScreen ? "32px 0px 0px 0px" : "16px 16px 0px 16px"}>
      <LineupSpaces/>
      </ContentLayout>
      <ContentLayout bgColor={"#f6f6f6"} padding={stylePartner.padding}>
      <Suspense fallback={<Loading />}>

          <PartnerWith />
          </Suspense>

      </ContentLayout>

  
    </>
  );
};

export default FinalStepLayout;
