import React from "react";

import QuestionnaireLayout from "@/layouts/QuestionnaireLayout";
import { useQuestionnaire } from "@/context/QuestionnaireContext";
import useLoader from "@/hooks/useLoader";
import useAnimations from "@/hooks/useAnimations";
import ProgressBar from "@/components/UI/ProgressBar";
 import AnswersContent from "@/components/Questionnaire/types/AnswersContent";

import Loader from "@/components/Questionnaire/types/Loader";
import QuestionnaireWrapper from "@/layouts/QuestionnaireWrapper";

import FormIcons from "@/components/UI/Form/FormIcons";
import QuestionnaireButtons from "@/components/UI/Form/QuestionnaireButtons";
import QuestionnaireTitle from "@/components/UI/QuestionnaireTitle";
import styles from "./Questionnaire.module.css";

const Questionnaire = () => {

  const {
    currentQuestion,
    currentQuestionCode,
    questionnaireStarted,
  } = useQuestionnaire();
  const showLoader = useLoader();
  const layoutRef = useAnimations();


  const isFormSequence = currentQuestion.type === "form-type";

  if (showLoader) {
    return (
      <QuestionnaireLayout ref={layoutRef}>
        <QuestionnaireWrapper>
          <Loader />
        </QuestionnaireWrapper>
      </QuestionnaireLayout>
    );
  }

  return (
    <QuestionnaireLayout ref={layoutRef}>

      {!questionnaireStarted && (
        <>
          <QuestionnaireTitle />
          <FormIcons   />
        </>
      )}

      <QuestionnaireWrapper>
        {!isFormSequence && <ProgressBar />}
        {currentQuestion.text && (
          <div key={currentQuestionCode} className={`animateTitleItem animateFadeOut ${styles.questionDescriptionText}`}>
            {currentQuestion.text}
            {currentQuestion.instructions && (
              <p className={styles.questionInstructions}>
                {currentQuestion.instructions}
              </p>
            )}
          </div>
        )}
        <div className={styles.contentWrapper}>
          <AnswersContent  />
          <QuestionnaireButtons />
        </div>
      </QuestionnaireWrapper>

    </QuestionnaireLayout>
  );
};

export default Questionnaire;
