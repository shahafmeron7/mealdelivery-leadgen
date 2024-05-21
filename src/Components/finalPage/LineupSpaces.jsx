import React, { useEffect } from 'react';
import { SPACES_URL } from '@/utils/data/spacesURL';
import styles from './LineupSpaces.module.css';
const LineupSpaces = () => {
  useEffect(() => {
   const template = document.querySelector("#hiddenlist");
   const div = document.getElementById("list");
   div.append(template);
   template.style = "display: block;"

    async function fetch(){
      try {
          const response = fetch(SPACES_URL);
          if(!response.ok){
             throw new Error('spaces could not be fetched.')
          }
          const data = await response.json();
          return data;
      } catch (error) {
         console.log(error.message);
      }
    }
    //fetch();
  }, []);

  return (
   <div>
    <div id="list"></div>
      <span className={styles.termsText}>*Featured prices and terms can be updated. Free offers may include additional terms.</span>
   </div>
  );
};

export default LineupSpaces;
