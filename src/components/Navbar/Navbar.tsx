import styles from "./styles.module.scss"; // Import your SCSS styles
import Logo from "src/assets/logo.png";
const Navbar = () => {
  return (
    <>

        <nav className={styles["nav-bar"]}>
          <a href="/">
            <img src={Logo} className={styles["logo"]} />
          </a>
          <ul className={styles["nav-ul"]}>
            <li className={styles["nav-point"]}>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/my-fav">My Favourites</a>
            </li>
          </ul>
        </nav>

    </>
  );
};

export default Navbar;
