import React from 'react'
import styles from './FAQ.module.css'
const FAQ = () => {
  const faqItems = [
    {
      text: "How does your service work?",
      details: "After answering six short questions, our system automatically matches you with the best meal delivery service tailored to your personal preferences according to your answers.",
  },
    {
        text: "Why is it important to compare services?",
        details: "Comparing different meal delivery service providers is key to finding the most relevant one for your dietary preferences. It ensures you receive the most suitable match out of the many options out there.",
    },
    {
      text: "How do you ensure the service is high quality?",
      details: "We regularly review available meal delivery services on the market and curate our site according to our findings. We ensure our site is up to date to guarantee the most relevant recommendations for our users.",
  },
  {
    text: "Is there a fee or cost for using this service?",
    details: "No, our service is completely free to use. You can use our questionnaire to receive matches at no cost at all.",
},
  ]
  const FaqItem = ({item})=>{
    return(
            <details className={styles.faqItem}>
              <summary>
                <h3>{item.text}</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M14 12L9 7L4 12" stroke="#313131" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>

              </summary>
              <p>
                {item.details}
              </p>
            </details>
    )
  }
  return (
    <div className={styles.faqWrapper}>
      <div className={styles.faqContainer}>
      <h2>FAQ</h2>
      <div className={styles.faqItemsContainer}>

      {faqItems.map((item,index)=>(
        <FaqItem key={index} item={item}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ