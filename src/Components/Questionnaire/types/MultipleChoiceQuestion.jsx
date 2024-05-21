import React, { useState, useEffect,useRef } from "react";
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";

import UnselectedCheckboxSVG from "@/images/unselectedbox.svg";
import SelectedCheckboxSVG from "@/images/selectedbox.svg";

import styles from "./AnswersContent.module.css";
import useIsWideScreen from "@/hooks/useIsWideScreen.jsx";
import InputWithValidation from "@/components/UI/Form/InputWithValidation";
const MultipleChoiceQuestion = () => {
  const {
    currentQuestion,
    currentQuestionCode,
    responses,
    changeNextBtnState,
    handleMultipleAnswerSelection,
    isAnimatingOut
  } = useQuestionnaire();
  const otherInputRef = useRef(null);

  const [selectedIndexes, setSelectedIndexes] = useState(
    responses[currentQuestionCode]?.answerIndexes || []
  );
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const isWideScreen = useIsWideScreen();

  const isDisplayDirectionCol =
    currentQuestion.display_list_direction === "col";
    useEffect(() => {
      if (isOtherSelected) {
        changeNextBtnState(otherInputValue.trim() !== "");
      } else {
        changeNextBtnState(selectedIndexes.length > 0);
      }
    }, [selectedIndexes, isOtherSelected, otherInputValue]);
    useEffect(() => {
      const response = responses[currentQuestionCode];
      if (response && response.answerIndexes) {

        setSelectedIndexes(response.answerIndexes);
        if (response.hasOwnProperty("other_text")) {
          setIsOtherSelected(true);
          setOtherInputValue(response.other_text);
        } else {
          setIsOtherSelected(false);
          setOtherInputValue("");
        }
      } else {
        setSelectedIndexes([]);
        setIsOtherSelected(false);
        setOtherInputValue("");
      }
    }, [currentQuestionCode, responses]);

  // const handleClick = (index) => {
  //   if(isAnimatingOut) return;
  //   const newSelectedIndexes = selectedIndexes.includes(index)
  //     ? selectedIndexes.filter(i => i !== index)
  //     : [...selectedIndexes, index];

  //   setSelectedIndexes(newSelectedIndexes);

  //   handleMultipleAnswerSelection(currentQuestionCode, newSelectedIndexes);
  // };
  const handleClick = (index) => {
    if (isAnimatingOut) return;
  
    const selectedAnswer = currentQuestion.answers[index];
    let newSelectedIndexes;

    if (selectedAnswer.isOther) {
      console.log('isOther')
      if (selectedIndexes.includes(index)) {
        console.log('')

        // Unselect the 'Other' option if it is already selected
        newSelectedIndexes = selectedIndexes.filter(i => i !== index);
        setIsOtherSelected(false);
        changeNextBtnState(newSelectedIndexes.length > 0);
      } else {
        // Reset to only include the 'Other' option
        newSelectedIndexes = [index];
        setIsOtherSelected(true);
        changeNextBtnState(false);
      }
    } else {
      // Remove the "Other" selection if it was previously selected
      newSelectedIndexes = selectedIndexes.includes(index)
        ? selectedIndexes.filter(i => i !== index)
        : [...selectedIndexes, index].filter(i => !currentQuestion.answers[i].isOther);
  
      setIsOtherSelected(false);
      changeNextBtnState(newSelectedIndexes.length > 0);

    }
    setSelectedIndexes(newSelectedIndexes);
    handleMultipleAnswerSelection(currentQuestionCode, newSelectedIndexes);
  };
  return (
    <>
    <div
            key={currentQuestionCode}
    

      className={`animateFadeOut ${styles.answersContainer} ${
        isDisplayDirectionCol ? styles.listCol : styles.listRow
      } `}
    >
      {currentQuestion.answers.map((answer, index) => {
        return (
         <div
              key={`${currentQuestionCode}-${index}`}
              className={`animateStaggerItem
          ${styles.answerItem} 
          ${selectedIndexes.includes(index) ? styles.selected : ""}
          ${
            isWideScreen
              ? isDisplayDirectionCol
                ? styles.answerRowItem
                : styles.answerCardItem
              : styles.answerRowItem
          }
        `}
              onClick={() => handleClick(index)}
            >
               {isWideScreen && answer.imgUrl && (
  <img src={answer.imgUrl} alt="Logo" width="64" height="64" />
)}

              <span>{answer.text}</span>
              {selectedIndexes.includes(index) ? (
                <SelectedCheckboxSVG />
              ) : (
                <UnselectedCheckboxSVG />
              )}
            </div>
        );
      })}
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

export default MultipleChoiceQuestion;
