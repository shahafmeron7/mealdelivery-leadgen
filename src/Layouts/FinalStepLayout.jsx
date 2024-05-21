import React, { Suspense } from "react";
import Loading from '@/components/UI/LazyLoading/Loading'
import ContentLayout from "./ContentLayout";
import ThankYou from "@/components/finalPage/ThankYou";
import Advertiser from "@/components/finalPage/Advertiser";
import AdverstiserLayout from "./AdvertiserLayout";
import LineupSpaces from "@/components/finalPage/LineupSpaces";
// Lazy loading heavier components
const PartnerWith =React.lazy(() => import("@/components//UI/Promotional/PartnerWith"));

const FinalStepLayout = () => {
  return (
    <>
    <AdverstiserLayout bgColor={"#F7F7F7"}>
        <Advertiser/>
      </AdverstiserLayout>
      <ContentLayout bgColor={"rgba(0, 28, 65, 0.05)"}>
        <ThankYou />
      </ContentLayout>
      <ContentLayout bgColor={"#f6f6f6"}>
      <LineupSpaces/>
      </ContentLayout>
      <ContentLayout bgColor={"#f6f6f6"}>
      <Suspense fallback={<Loading />}>

          <PartnerWith />
          </Suspense>

      </ContentLayout>

  
    </>
  );
};

export default FinalStepLayout;
