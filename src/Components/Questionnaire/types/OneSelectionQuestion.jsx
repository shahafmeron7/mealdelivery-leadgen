import React, { useState, useEffect, useRef } from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";
import styles from "./AnswersContent.module.css";
import  UnselectedCheckboxSVG  from "@/images/unselectedCircleCheckbox.svg";
import  SelectedCheckboxSVG  from "@/images/selectedCircleCheckbox.svg";
import InputWithValidation from "@/components/UI/Form/InputWithValidation.jsx";
import useIsWideScreen from "@/hooks/useIsWideScreen";

const OneSelectionQuestion = () => {
  const {
    currentQuestion,
    responses,
    handleAnswerSelection,
    isAnimatingOut,
    changeNextBtnState,
    currentQuestionCode,
  } = useQuestionnaire();
  const otherInputRef = useRef(null);
  const [localSelectedIndex, setLocalSelectedIndex] = useState(
    responses[currentQuestionCode]?.answerIndexes?.[0] || undefined
  );

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const isWideScreen = useIsWideScreen();

  const isDisplayDirectionCol =
    currentQuestion.display_list_direction === "col";

  useEffect(() => {
    const response = responses[currentQuestionCode];
    if (!response) {
      setIsOtherSelected(false);
      setLocalSelectedIndex(undefined);
      setOtherInputValue("");
      return;
    }

    if (response.hasOwnProperty("other_text")) {
      setIsOtherSelected(true);
      setOtherInputValue(response.other_text);

    } else {
      setIsOtherSelected(false);
      setOtherInputValue("");
    }
    setLocalSelectedIndex(response.answerIndexes[0]);
  }, [currentQuestionCode, responses]);

  const handleClick = (index) => {
    if (isAnimatingOut) return;
    const selectedAnswer = currentQuestion.answers[index];
    if (!selectedAnswer.isOther) {
      setLocalSelectedIndex(index);
      setIsOtherSelected(false);

      handleAnswerSelection(currentQuestionCode, index);
    } else {
      changeNextBtnState(false);
      setLocalSelectedIndex(index);
      setIsOtherSelected(true);
    }
  };

  return (
    <>
      <div
        key={currentQuestionCode}
        className={`animateFadeOut ${styles.answersContainer} ${
          isDisplayDirectionCol ? styles.listCol : styles.listRow
        }`}
      >
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={`${currentQuestion.code}-${index}`}
            className={`animateStaggerItem ${styles.answerItem} ${
              index === localSelectedIndex ? styles.selected : ""
            }  ${
            isWideScreen
              ? isDisplayDirectionCol
                ? styles.answerRowItem
                : styles.answerCardItem
              : styles.answerRowItem
          }  `}
            onClick={() => handleClick(index)}
          >
                        {isWideScreen && answer.imgUrl && (
  <img src={answer.imgUrl} alt="Logo" width="64" height="64" />
)}


            <span>{answer.text}</span>
            {index === localSelectedIndex ? (
              <SelectedCheckboxSVG />
            ) : (
              <UnselectedCheckboxSVG />
            )}
          </div>
        ))}
      </div>
      {isOtherSelected && (
        <InputWithValidation
          ref={otherInputRef}
          type="text"
          name={currentQuestion.code}
          value={otherInputValue}
          placeholder="Please specify"
          isOther={true}
        />
      )}
    </>
  );
};
export default OneSelectionQuestion;
