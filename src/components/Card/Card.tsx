import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidBullseye } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaArrowRight, FaHeart, FaSchool } from "react-icons/fa";
import { GiDuration } from "react-icons/gi";
import { toast } from "react-toastify";
import { ICardProps, ISpell } from "../../types";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { SiLevelsdotfyi } from "react-icons/si";

const Card = ({ url, index }: ICardProps) => {
  const [spell, setSpell] = useState<ISpell | null>();
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    async function fetchSpell() {
      try {
        const response = await axios.get(url);
        setSpell(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong !");
      }
    }
    fetchSpell();
  }, [url]);

  function addToFavourite(index: string) {
    setIsFavourite(true);
    const fav = localStorage.getItem("fav");
    if (!fav) {
      localStorage.setItem("fav", index);
      toast.success("Spell added  in your favourites !");
      return;
    }
    const favArray = fav.split(",");

    if (favArray.includes(index)) {
      toast.info(index.toLocaleUpperCase() + " already in your favourites !");
      return;
    }

    localStorage.setItem("fav", fav + "," + index);
    toast.success("Spell added  in your favourites !");
  }
  function removeFavourite(name: string) {
    const fav = localStorage.getItem("fav");
    if (!fav) {
      return;
    }
    const favArray = fav.split(",");
    const updatedFavArray = favArray.filter((index) => index !== name);
    const joinedArray = updatedFavArray.join(",");
    localStorage.setItem("fav", joinedArray);
    setIsFavourite(false);
    toast.warn(index.toLocaleUpperCase() + " removed from your favourites !");
  }
  useEffect(() => {
    const fav = localStorage.getItem("fav");
    if (!fav) {
      return;
    }
    const favArray = fav.split(",");
    if (favArray.includes(index)) {
      setIsFavourite(true);
    }
  }, []);
  return (
    <>
      {spell && (
        <article className={styles["card"]}>
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
            <Link to={`/spell/?index=${spell.index}`}>
              <button className={styles["button"]}>
                <span>Learn more</span>
                <FaArrowRight />
              </button>
            </Link>
            <span
              hover-tooltip="Add to your favourite"
              tooltip-position="bottom"
              onClick={() => {
                isFavourite
                  ? removeFavourite(spell.index)
                  : addToFavourite(spell.index);
              }}
  
            >
              {isFavourite ? (
                <FaHeart className={`${styles["favourite"]} `} />
              ) : (
                <CiHeart className={`${styles["not-favourite"]} `} />
              )}
            </span>
          </div>
        </article>
      )}
    </>
  );
};

export default Card;
