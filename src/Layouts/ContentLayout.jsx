import React from 'react'
import styles from './ContentLayout.module.css'
const ContentLayout = ({children,bgColor,padding,width}) => {
  return (
    <div className={styles.layoutContainer} style={{backgroundColor:bgColor,padding:padding}}>
      <div className={styles.layoutWrapper} style={{width:width}}>
        {children}

      </div>
    </div>
  )
}

export default ContentLayout