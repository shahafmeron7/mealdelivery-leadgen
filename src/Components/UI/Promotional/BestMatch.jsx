import React from "react";
import styles from "./BestMatch.module.css";
import  ExpertsLogo  from "@/images/best matchs/experts.svg";
import  TailoredMatchesLogo  from "@/images/best matchs/tailored_matches.svg";
import  TrustedProvidedLogo  from "@/images/best matchs/trusted_providers.svg";
const BestMatch = () => {
  const cards = [
    {
      title: "Expert Insight",
      info: "We leverage our expertise to match you with the best service for your needs quickly",
      Logo: ExpertsLogo,
      alt: "Experts Logo",
    },
    {
      title: "Trusted Services",
      info: "We exclusively partner with reputable & leading meal delivery services to ensure quality & reliability",
      Logo: TrustedProvidedLogo,
      alt: "Trusted Services Logo",
    },
    {
      title: "Personalized Matches",
      info: "A few quick questions to find the correct fit for your needs. Let us do all the hard work for you",
      Logo: TailoredMatchesLogo,
      alt: "Personalized Matches Logo",
    },
  ];

  const Card = ({ card }) => {
    return (
      <div className={styles.bestMatchCard}>
        <card.Logo className={styles.bestMatchLogo} aria-label={card.alt} /> 
        <div className={styles.cardInfoWrapper}>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={styles.cardInfo}>{card.info}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.bestMatchWrapper}>
      <div className={styles.bestMatchContainer}>
        <h3 className={styles.bestMatchTitle}>How we find you a match</h3>
        <div className={styles.bestMatchCardsContainer}>
          {cards.map((card) => (
            <Card key={card.alt} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestMatch;
