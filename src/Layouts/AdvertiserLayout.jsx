import React from 'react'
import styles from './AdverstiserLayout.module.css'
const AdverstiserLayout = ({children,bgColor}) => {
  return (
    <div className={styles.advLayoutContainer } style={{backgroundColor:bgColor}}>
      <div className={styles.advLayoutWrapper}>
        {children}

      </div>
    </div>
  )
}

export default AdverstiserLayout