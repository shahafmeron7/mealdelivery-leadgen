import React from 'react'
import styles from '@/components/Questionnaire/Questionnaire.module.css'
import { useQuestionnaire } from "@/context/QuestionnaireContext";
const QuestionnaireTitle = () => {
    const {currentQuestionCode} = useQuestionnaire();
    return (
      <div key={currentQuestionCode} className={`${styles.titleWrapper}`}>
      <h1 className={styles.title}>Find the right meal delivery service</h1>
      <h2 className={styles.titleDescription}>Answer 6 questions to find the Meal Delivery Service That Best Suits You</h2>
    </div>
    );
  };

export default QuestionnaireTitle