import styles from "./styles.module.scss"; // Import your SCSS styles

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container}`}>
        <h2 className={styles.footer__title}>Rohan Maharjan</h2>
        <p className={styles.footer__description}>
          I am Rohan Maharjan and these are Dungeons & Dragons Spells.
        </p>

        <p className={styles.footer__copy}>
          &#169; 2024 Rohan Maharjan. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
