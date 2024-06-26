// src/context/questionnaire/eventHandlers.js
import * as actionTypes from "./../../reducers/actionTypes.js"
import { useCallback } from "react";
import { validateField } from "@/utils/validationUtils";
import { gsap } from "gsap";
import questionnaireData from "@/utils/data/questionnaireData.json";
import {
  buildEventData,
  sendImpressions,
} from "@/utils/impression/impressionUtils";


const TIME_DELAY_NEXT_QUESTION = 0.2;

export const QuestionnaireHandlers = (
  state,
  dispatch
) => {
  const findStepNumber = (questionCode) => {
    return questionnaireData.questions.find((q) => q.code === questionCode)
      .step;
  };
  const animateAndNavigate = (onComplete, nextProgressWidth, delay = 0) => {
    dispatch({ type: actionTypes.SET_IS_ANIMATING_OUT, payload: true });
    const tl = gsap.timeline({
      onComplete: () => {
        dispatch({ type: actionTypes.SET_IS_ANIMATING_OUT, payload: false });
        onComplete();
      },
    });

    tl.to(".progressLine", {
      width: `${nextProgressWidth}%`,
      duration: 0.3,
      ease: "none",
    });

    tl.to(
      ".animateFadeOut",
      {
        opacity: 0,
        delay: delay,
        duration: 0.1,
      },
      `+=0.1`
    );
  };
  const moveToPrevQuestion = () => {
    const { questionHistory } = state;
    if (questionHistory.length > 1) {
      const newHistory = questionHistory.slice(0, -1);
      const prevQuestionCode = newHistory[newHistory.length - 1];
      const prevStep = findStepNumber(prevQuestionCode);
      const newProgressBarWidth = Math.min(
        100,
        Math.round(((prevStep - 1) / (7 - 1)) * 100)
      );

      dispatch({
        type: actionTypes.SET_PROGRESS_BAR_WIDTH,
        payload: newProgressBarWidth,
      });
      animateAndNavigate(() => {
        dispatch({
          type: actionTypes.SET_CURRENT_QUESTION_CODE,
          payload: prevQuestionCode,
        });
      }, newProgressBarWidth);

      dispatch({ type: actionTypes.SET_QUESTION_HISTORY, payload: newHistory });
    }
  };

  const moveToNextQuestion = () => {
    let proceedToNext = true;
    let nextQuestionCode;

    const {
      currentQuestion,
      currentQuestionCode,
      responses,
      flowID,
      flowName,
    } = state;
    const newErrResponses = {};
    if (
      currentQuestion.type === "details-question" ||
      currentQuestion.type === "form-type"
    ) {
      currentQuestion.subquestions.forEach((sub) => {
        if (!validateField(sub.code, responses[sub.code]?.answer)) {
          proceedToNext = false;
          newErrResponses[sub.code] = true; // Set error for this sub-question
        }
      });
      nextQuestionCode = currentQuestion.answers[0]?.next_question_code;
    } else if (currentQuestion.type === "one-selection") {
      const response = responses[currentQuestion.code];
      if (response && response.answerIndexes) {
        const selectedIndex = response.answerIndexes[0];
        // checkAndUpdateFormID(currentQuestionCode, selectedIndex);

        nextQuestionCode =
          currentQuestion.answers[selectedIndex]?.next_question_code;
      } else {
        proceedToNext = false;
      }
    } else if (currentQuestion.type === "multi-selection") {
      const response = responses[currentQuestion.code];
      if (
        response &&
        response.answerIndexes &&
        response.answerIndexes.length > 0
      ) {
        nextQuestionCode =
          currentQuestion.answers[response.answerIndexes[0]]
            ?.next_question_code;
      } else {
        proceedToNext = false;
      }
    }

    if (proceedToNext && nextQuestionCode) {
      const eventData = buildEventData(
        currentQuestion,
        flowID,
        flowName,
        import.meta.env.REACT_APP_USER_ACTION_CLICK_NEXT
      );
      sendImpressions(
        eventData,
        import.meta.env.REACT_APP_USER_EVENT_NAME,
        import.meta.env.REACT_APP_STREAM_STEP_NAME
      );
      dispatch({ type: actionTypes.CHANGE_NEXT_BTN_STATE, isEnabled: true });

      const nextStep = findStepNumber(nextQuestionCode);
      const newProgressBarWidth = Math.min(
        100,
        Math.round(((nextStep - 1) / (7 - 1)) * 100)
      );
      dispatch({
        type: actionTypes.SET_PROGRESS_BAR_WIDTH,
        payload: newProgressBarWidth,
      });

      animateAndNavigate(
        () => {
          handleNavigateNextQuestion(nextQuestionCode);
        },
        newProgressBarWidth,
        TIME_DELAY_NEXT_QUESTION
      );
    } else {
      dispatch({ type: actionTypes.CHANGE_NEXT_BTN_STATE, isEnabled: false });
      dispatch({
        type: actionTypes.SET_ERR_RESPONSES,
        payload: newErrResponses,
      });
    }
  };

  const handleNavigateNextQuestion = (nextQuestionCode) => {
    if (nextQuestionCode !== "loader") {
      dispatch({
        type: actionTypes.APPEND_TO_QUESTION_HISTORY,
        payload: nextQuestionCode,
      });
    }
    dispatch({
      type: actionTypes.SET_CURRENT_QUESTION_CODE,
      payload: nextQuestionCode,
    });
    window.history.pushState({}, null, " ");
  };

  const handleMultipleAnswerSelection = (questionCode, selectedIndexes) => {
    const { currentQuestion,responses } = state;
    // console.log(selectedIndexes)
    const answersData = selectedIndexes.map((index) => {
      return {
        text: currentQuestion.answers[index].text,
        index: index,
        isOther: currentQuestion.answers[index].isOther
      };
    });

    const existingResponse = responses[questionCode] || {};
  let newResponse = {
    ...existingResponse,
    answer: answersData.map((answer) => answer.text).join(", "),
    answerIndexes: selectedIndexes,
    step: currentQuestion.step,
    question: currentQuestion.text,
  };
  const otherAnswer = answersData.find(answer => answer.isOther);
  if (otherAnswer) {
    newResponse.other_text = existingResponse.other_text || "";

  } else {
    if (newResponse.hasOwnProperty("other_text")) {
      // console.log('delete new other response')
      delete newResponse.other_text;
    }
  }

    

    dispatch({
      type: actionTypes.UPDATE_RESPONSES,
      questionCode: questionCode,
      response: newResponse,
    });
  };
  const isOtherTextFilled = (response) => {
    return response.other_text !== undefined &&
           response.other_text !== null &&
           response.other_text.trim() !== "";
  };
  const checkAndEnableNextButton = useCallback(() => {
    const { currentQuestion, responses } = state;
    if (
      currentQuestion.type === "details-question" ||
      currentQuestion.type === "form-type"
    ) {
      // Check if all subquestions have been answered
      const allSubquestionsAnswered = currentQuestion.subquestions.every(
        (sub) => {
          const response = responses[sub.code];
          return response && response.answer && response.answer.trim() !== "";
        }
      );
      dispatch({
        type: actionTypes.CHANGE_NEXT_BTN_STATE,
        isEnabled: allSubquestionsAnswered,
      });
    } else {
      const response = responses[currentQuestion.code];
      let isAnswered = false;

      if (response) {
        // Separate logic for one-selection, which may include an 'other' text input
        if (currentQuestion.type === "one-selection") {
          if (response.answerIndexes.length > 0) {
            const answerIndex = response.answerIndexes[0]; // Since one-selection should have only one index
            if (currentQuestion.answers[answerIndex].isOther) {
              // Check if other text is not empty when 'Other' option is selected
              isAnswered = isOtherTextFilled(response);

            } else {
              // Regular answer is selected

              isAnswered = true;
            }
          }
        } else if (currentQuestion.type === "multi-selection") {
          if (response.answerIndexes.length > 0) {
            const otherSelected = response.answerIndexes.some(index => currentQuestion.answers[index].isOther);
            if (otherSelected) {
              // Check if other text is not empty when 'Other' option is selected
              isAnswered = isOtherTextFilled(response);

            } else {
              // Regular answers are selected
              isAnswered = true;
            }
          }
        }
      }
      dispatch({
        type: actionTypes.CHANGE_NEXT_BTN_STATE,
        isEnabled: isAnswered,
      });
    }
  }, [state.currentQuestion, state.responses, dispatch]);

  const handleAnswerSelection = (questionCode, answerIndex) => {
    const { currentQuestion, responses } = state;
    const answer = currentQuestion.answers[answerIndex];
    const answerText = answer?.text;
    const existingResponse = responses[questionCode] || {};

    const newResponse = {
      ...existingResponse,
      answer: answerText,
      answerIndexes: [answerIndex],
      step: currentQuestion.step,
      question: currentQuestion.text,
    };

    if (answer?.isOther) {
      newResponse.other_text = existingResponse.other_text || "";
    } else {
      if (newResponse.other_text) {
        delete newResponse.other_text;
      }
    }

    dispatch({
      type: actionTypes.UPDATE_RESPONSES,
      questionCode: questionCode,
      response: newResponse,
    });
    const nextQuestionCode = answer?.next_question_code;
    if (nextQuestionCode) {
      const nextStep = findStepNumber(nextQuestionCode);
      const newProgressBarWidth = Math.min(
        100,
        Math.round(((nextStep - 1) / (7 - 1)) * 100)
      );
      dispatch({
        type: actionTypes.SET_PROGRESS_BAR_WIDTH,
        payload: newProgressBarWidth,
      });

      animateAndNavigate(
        () => {
          //goToNext(nextQuestionCode)
          handleNavigateNextQuestion(nextQuestionCode);
        },
        newProgressBarWidth,
        TIME_DELAY_NEXT_QUESTION
      );
    }
  };
  const handleInputChange = (questionCode, inputValue, isOther = false) => {
    const { currentQuestion, responses, errResponses } = state;
    const currentResponse = responses[questionCode] || {
      step: currentQuestion.step,
      question:
        currentQuestion.type === "details-question" ||
        currentQuestion.type === "form-type"
          ? currentQuestion.subquestions.find(
              (sub) => sub.code === questionCode
            ).text
          : currentQuestion.text,
      answerIndexes: [],
    };

    let updatedResponse;

    if (!isOther) {
      updatedResponse = {
        ...currentResponse,
        answer: inputValue,
      };
    } else {
      const otherIndex = currentQuestion.answers.findIndex(
        (answer) => answer.isOther
      );
      const otherAnswerText = currentQuestion.answers[otherIndex].text;
      updatedResponse = {
        ...currentResponse,
        answer: otherAnswerText,
        other_text: inputValue,
        answerIndexes: [otherIndex],
      };
    }
    dispatch({
      type: actionTypes.UPDATE_RESPONSES,
      questionCode: questionCode,
      response: updatedResponse,
    });
    dispatch({
      type: actionTypes.CHANGE_NEXT_BTN_STATE,
      isEnabled: inputValue.trim().length > 0,
    });
    // Check if there's an existing error and clear it
    if (errResponses[questionCode]) {
      const newErrResponses = { ...errResponses };

      delete newErrResponses[questionCode]; // Remove the error entry for this question

      dispatch({
        type: actionTypes.SET_ERR_RESPONSES,
        payload: newErrResponses,
      });
    }
  };
 
  const completeQuestionnaire = useCallback(() => {
    const { responses } = state;
    let finalResponses = {};
    Object.entries(responses).forEach(([key, value]) => {
      value.users_answer = value.answer;
    });
    const spacesListId = 
    [0, 2].some(index => responses['meal_service_type'].answerIndexes.includes(index)) ?
    import.meta.env.REACT_APP_HELLOFRESH_LIST_ID : import.meta.env.REACT_APP_FACTOR_LIST_ID  
    dispatch({
      type: actionTypes.SET_SPACES_LIST_ID,
      payload: spacesListId,
    });
    finalResponses = Object.keys(responses).reduce((acc, key) => {
      const { answerIndexes, ...responseWithoutIndexes } = responses[key];
      acc[key] = responseWithoutIndexes;
      return acc;
    }, {});
    
    //  console.log(finalResponses);
    
    sendImpressions(
      finalResponses,
      import.meta.env.REACT_APP_FINAL_SUBMIT_EVENT_NAME,
      import.meta.env.REACT_APP_STREAM_FINAL_NAME,
    );
    dispatch({
      type: actionTypes.TOGGLE_QUESTIONNAIRE_COMPLETED,
      payload: true,
    });
  }, [state.targetFormID, state.responses]);

  const changeNextBtnState = (isEnabled) => {
    dispatch({ type: actionTypes.CHANGE_NEXT_BTN_STATE, isEnabled: isEnabled });
  };





  return {
    animateAndNavigate,
    moveToPrevQuestion,
    checkAndEnableNextButton,
    moveToNextQuestion,
    handleNavigateNextQuestion,
    handleMultipleAnswerSelection,
    handleAnswerSelection,
    handleInputChange,
    completeQuestionnaire,
    changeNextBtnState,
  };
};
