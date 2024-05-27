import React, { useState, useEffect, useRef } from "react";
import useIsWideScreen from "@/hooks/useIsWideScreen";
import styles from "./Advertiser.module.css";

const Advertiser = () => {
  const [isDisclaimerVisible, setIsDisclaimerVisible] = useState(false);
  const {isWideScreen} = useIsWideScreen();
  const disclaimerRef = useRef(null);
  const advTextRef = useRef(null);
  const toggleDisclaimer = (event) => {
    event.stopPropagation();

    setIsDisclaimerVisible(!isDisclaimerVisible);
  };
  const handleClickOutside = (event) => {
    if (
      disclaimerRef.current &&
      !disclaimerRef.current.contains(event.target)
    ) {
      setIsDisclaimerVisible(false);
    }
  };
  useEffect(() => {
    if (isDisclaimerVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDisclaimerVisible]);
  useEffect(() => {
    if (isDisclaimerVisible && disclaimerRef.current && !isWideScreen) {
      const disclaimerElement = disclaimerRef.current;
      const advTextElement = advTextRef.current;
      const advTextElementBoundingRect = advTextElement.getBoundingClientRect();

      const viewportWidth = window.outerWidth;
      const containerWidth = viewportWidth * 0.95;
      const leftAndRightGaps = viewportWidth * 0.05;
      disclaimerElement.style.width = `${containerWidth}px`;
      disclaimerElement.style.right = `-${
        viewportWidth - advTextElementBoundingRect.right - leftAndRightGaps / 2
      }px`;
      disclaimerElement.style.transform = "";
    } else if (disclaimerRef.current && isWideScreen) {
      const disclaimerElement = disclaimerRef.current;
      disclaimerElement.style.width = "";
      disclaimerElement.style.left = "";
      disclaimerElement.style.transform = "translateX(-50%)";
    }
  }, [isDisclaimerVisible, isWideScreen]);
  return (
    <div className={styles.advertiserContainer}>
      We receive advertising fees from the brands we review that affect the
      ranking and scoring of such brands.&#8194;
      <div className={styles.disclaimerWrapper}>
        <span
          className={styles.disclaimerLink}
          ref={advTextRef}
          onClick={toggleDisclaimer}
        >
          Advertiser Disclosure
        </span>
        <div
          className={styles.disclaimerTextContainer}
          ref={disclaimerRef}
          style={{
            visibility: isDisclaimerVisible ? "visible" : "hidden",
            opacity: isDisclaimerVisible ? 1 : 0,
            top: "22px",
            // width: isWideScreen ? '375px' : '95%'
          }}
        >
          <div className={styles.disclaimerTextWrapper}>
            This website is an informative comparison site that aims to offer
            its users helpful information regarding the products and offers that
            will be suitable for their needs. We are able to maintain a free,
            high-quality service by receiving advertising fees from the brands
            and service providers we review on this website (though we may also
            review brands we are not engaged with). These advertising fees,
            combined with our criteria and methodology, such as the conversion
            rates, our team of reviewer's findings and subjective experience,
            and product popularity, impact the placement and position of the
            brands within the comparison table. In the event rating or scoring
            are assigned by us, they are based on the position in the comparison
            table, or according to other formulas specifically detailed by us.
            See our{" "}
            <a target="_blank" href="/how-we-rate/" className={styles.textLink}>
              How we Rate
            </a>{" "}
            page and{" "}
            <a
              className={styles.textLink}
              target="_blank"
              href="/terms-and-conditions/"
            >
              Terms of Use
            </a>{" "}
            for information. The reviews, rating, and scoring are provided
            “as-is” without guarantees or warranties regarding the information
            contained on our website, which shall not be considered as
            endorsement. We make the best efforts to keep the information
            up-to-date, however, an offer’s terms might change at any time. We
            do not compare or include all service providers, brands, and offers
            available in the market.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertiser;
