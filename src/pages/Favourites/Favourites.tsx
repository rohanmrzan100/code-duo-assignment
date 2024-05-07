import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidBullseye } from "react-icons/bi";
import { FaArrowRight, FaSchool } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ISpell } from "../../types";
import styles from "./styles.module.scss";

axios.defaults.baseURL = "https://www.dnd5eapi.co";
axios.defaults.headers.post["Content-Type"] = "application/json";

const Favourites = () => {
  const [loading, setLoading] = useState(true);
  const [spells, setSpells] = useState<ISpell[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fav = localStorage.getItem("fav");
      if (!fav) {
        setLoading(false);
        return;
      }
      const favArray = fav.split(",");
      try {
        const spellPromises = favArray.map(async (index) => {
          const response = await axios.get(`/api/spells/${index}`);
          return response.data as ISpell;
        });
        const fetchedSpells = await Promise.all(spellPromises);
        setSpells(fetchedSpells);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  function removeFavourite(name: string) {
    console.log(name);
    const fav = localStorage.getItem("fav");
    if (!fav) {
      setLoading(false);
      return;
    }
    const favArray = fav.split(",");
    const updatedFavArray = favArray.filter((index) => index !== name);
    const joinedArray = updatedFavArray.join(",");
    localStorage.setItem("fav", joinedArray);

    const updatedSpellArray = spells.filter((spell) => spell.index !== name);
    setSpells(updatedSpellArray);
  }
  return (
    <div className={styles.favourite}>
      <h2>My Favourites</h2>
      {loading ? (
        <h2>Loading ...</h2>
      ) : (
        <div className={styles.cards}>
          {spells.map((spell, index) => (
            <article className={styles["card"]} key={index}>
              <div className={styles["tag-list"]}>
                <span
                  hover-tooltip="Range"
                  tooltip-position="bottom"
                  className={`${styles["tag"]} tool`}
                >
                  <GiDuration className={styles.icon} />
                  {spell.range}
                </span>

                <span
                  hover-tooltip="Duration"
                  tooltip-position="bottom"
                  className={`${styles["tag"]} tool`}
                >
                  <BiSolidBullseye className={styles.icon} />
                  {spell.duration}
                </span>
                <span
                  hover-tooltip="School"
                  tooltip-position="bottom"
                  className={`${styles["tag"]} tool`}
                >
                  <FaSchool className={styles.icon} />
                  {spell.school.name}
                </span>

                <span
                  hover-tooltip="Level"
                  tooltip-position="bottom"
                  className={`${styles["tag"]} tool`}
                >
                  <SiLevelsdotfyi className={styles.icon} />
                  Level {spell.level}
                </span>
              </div>{" "}
              <span className={styles["tag"]}>{spell.range}</span>
              <h2 className={styles["title"]}>{spell.name}</h2>
              <p className={styles["info"]}>
                {spell.desc[0].substring(0, 150) + "..."}
              </p>
              <div className={styles["bottom"]}>
                <Link to={`/spell/?index=/${spell.index}`}>
                  <button className={styles["button"]}>
                    <span>Learn more</span>
                    <FaArrowRight />
                  </button>
                </Link>
                <button
                  onClick={() => removeFavourite(spell.index)}
                  className={`${styles.button} ${styles.remove}`}
                >
                  <span>Remove</span>
                  <MdDeleteOutline />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {spells.length < 1 && <h3>You have not added any favourites</h3>}
    </div>
  );
};

export default Favourites;
