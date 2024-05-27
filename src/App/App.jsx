import React, { Suspense } from "react";

// Absolute imports for cleaner and more maintainable code
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import Questionnaire from "@/components/Questionnaire/Questionnaire.jsx";
import Navbar from "@/components/Navbar/Navbar.jsx";
import FinalStepLayout from "@/layouts/FinalStepLayout.jsx";
import ContentLayout from "@/layouts/ContentLayout.jsx";
import Loading from "@/components/UI/LazyLoading/Loading";
import useIsWideScreen from "@/hooks/useIsWideScreen"
import "./App.css";
const Footer = React.lazy(() => import("@/components/Footer/Footer.jsx"));
const BestMatch = React.lazy(() => import("@/components/UI/Promotional/BestMatch.jsx"));
const FAQ = React.lazy(() => import("@/components/UI/Content/FAQ.jsx"));
const PartnerWith = React.lazy(
  () => import("@/components/UI/Promotional/PartnerWith.jsx")
);



function App() {

  
  const { questionnaireCompleted, questionnaireStarted } = useQuestionnaire();
  const isWideScreen = useIsWideScreen()
  if (questionnaireCompleted) {
    return (
      <div className="AppWrapper">
        <Navbar />
        <FinalStepLayout />
        <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
      </div>
    );
  }

  return (
    <div className="AppWrapper">
      <Navbar />
      <Questionnaire />
      {!questionnaireStarted && (
        <>
        <ContentLayout bgColor={"#f6f6f6"} padding={isWideScreen ? "0px" : "8px 16px 32px 16px"}>
            <Suspense fallback={<Loading />}>
              <PartnerWith />
            </Suspense>
            </ContentLayout>
            <ContentLayout bgColor={"#f6f6f6"} padding={isWideScreen ? "64px 0px" : "0px 16px 32px"}>

            <Suspense fallback={<Loading />}>
              <BestMatch />
            </Suspense>
            </ContentLayout>
            <ContentLayout bgColor={"#f6f6f6"} padding={isWideScreen ? "0px 0px 64px 0px" : "0px 16px 32px"}>

            <Suspense fallback={<Loading />}>
              <FAQ />
            </Suspense>
          </ContentLayout>
          <Suspense fallback={<Loading />}>
            <Footer />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
