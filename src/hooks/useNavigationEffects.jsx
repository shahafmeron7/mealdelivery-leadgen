// useNavigationEffects.js
import { useEffect } from 'react';
import { buildEventData,sendImpressions } from '@/utils/impression/impressionUtils';

export const useNavigationEffects = (state,moveToPrevQuestion) => {
    const { questionHistory, currentQuestion,flowID,flowName, currentQuestionCode, questionnaireCompleted } = state;
    
      
     useEffect(() => {
         const handlePopState = () => {
             if (questionHistory.length > 1) {
                 if (questionnaireCompleted) {
                    moveToPrevQuestion();

                    //  window.location.href = "https://top5mealdelivery.com/";
                 } else if (currentQuestionCode !== "loader") {
                     sendImpressions(
                         buildEventData(currentQuestion,flowID,flowName,import.meta.env.REACT_APP_USER_ACTION_CLICK_PREV_BROWSER),
                         import.meta.env.REACT_APP_USER_EVENT_NAME,
                         import.meta.env.REACT_APP_STREAM_STEP_NAME
                     );
                     moveToPrevQuestion();
                 }
             } else {
                 window.history.go(-1);
             }
         };

         window.addEventListener("popstate", handlePopState);
         return () => window.removeEventListener("popstate", handlePopState);
     }, [questionHistory, currentQuestionCode, questionnaireCompleted, moveToPrevQuestion, sendImpressions, buildEventData]);
};
