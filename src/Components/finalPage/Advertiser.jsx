import styles from './Advertiser.module.css';

const Advertiser = () => {
  return (
    <div className={styles.advertiserContainer}>
      We receive advertising fees from the brands we review that affect the ranking and scoring of such brands.&#8194;
      <div className={styles.disclaimerWrapper}>
        <span className={styles.disclaimerLink}>Advertiser Disclosure</span>
      </div>
      {/* <div className={styles.disclaimerText} style={{ position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate(1302px, 24px)' }} data-popper-placement="bottom-start">
        <div>
          This website is an informative comparison site that aims to offer its users helpful information regarding the products and offers that will be suitable for their needs. We are able to maintain a free, high-quality service by receiving advertising fees from the brands and service providers we review on this website (though we may also review brands we are not engaged with). These advertising fees, combined with our criteria and methodology, such as the conversion rates, our team of reviewer's findings and subjective experience, and product popularity, impact the placement and position of the brands within the comparison table. In the event rating or scoring are assigned by us, they are based on the position in the comparison table, or according to other formulas specifically detailed by us. See our <a target="_blank" href="/how-we-rate/" className={styles.textLink}>How we Rate</a> page and <a className={styles.textLink} target="_blank" href="/terms-and-conditions/">Terms of Use</a> for information. The reviews, rating, and scoring are provided “as-is” without guarantees or warranties regarding the information contained on our website, which shall not be considered as endorsement. We make the best efforts to keep the information up-to-date, however, an offer’s terms might change at any time. We do not compare or include all service providers, brands, and offers available in the market.
        </div>
        <div className={styles.disclaimerCloseContainer}>
          <img className={styles.disclaimerClose} src="/app/themes/lendstart/public/images/close.5c1474.svg" width="24" height="24" alt="close" loading="lazy" />
        </div>
      </div> */}
    </div>
  );
}

export default Advertiser;
