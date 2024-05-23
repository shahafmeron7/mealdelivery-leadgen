import React, { useEffect, useRef } from 'react';
import styles from './LineupSpaces.module.css';
import { setSpacesDynamic } from '@/utils/data/spacesScript'; 
import { useQuestionnaire } from "@/context/QuestionnaireContext.jsx";

const LineupSpaces = () => {
  const {spacesListId} = useQuestionnaire();

  const spacesRef = useRef(null);
  const hasLoadedRef = useRef(false); 
  // 1492 & 1496

  useEffect(() => {
    if (!hasLoadedRef.current) {
      setSpacesDynamic(spacesListId);
      hasLoadedRef.current = true; 
    }
    }, [spacesListId]);

  return (
    <div className={styles.spacesWrapper}>
      <div id="spaces" ref={spacesRef}></div>
      <span className={styles.termsText}>*Featured prices and terms can be updated. Free offers may include additional terms.</span>
    </div>
  );
};

export default LineupSpaces;
