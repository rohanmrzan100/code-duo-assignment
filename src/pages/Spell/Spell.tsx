import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { ISpell } from "../../types";
import Markdown from "react-markdown";

const SpellDetails = () => {
  const [loading, setLoading] = useState(false);
  const [spell, setSpell] = useState<ISpell>();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const index = params.get("index");
    if (!index) {
      toast.error("Something went wrong!");
    }
    async function getSpell(index: string) {
      setLoading(true);
      try {
        const response = await axios.get("/api/spells/" + index);
        console.log(response.data);

        setSpell(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong !");
      } finally {
        setLoading(false);
      }
    }

    if (index) getSpell(index);
  }, []);
  if (loading) {
    return <h3>Loading ...</h3>;
  }
  return (
    <>
      {spell && (
        <div className={styles["spell-details"]}>
          <h1>{spell.name}</h1>
          <hr
            style={{
              borderTop: "1px solid orangered",
            }}
          />
          <div className={styles["description"]}>
            {spell.desc.map((paragraph) => (
              <Markdown>{paragraph}</Markdown>
            ))}
          </div>

          <div className={styles["list"]}>
            <ul>
              <li>
                <span>Level : </span> {spell.level}
              </li>

              {spell.area_of_effect && (
                <li>
                  <span>Area of effect : </span>
                  <ul>
                    <li>
                      <span>size</span> {spell.area_of_effect.size}{" "}
                    </li>
                    <li>
                      <span>type</span> {spell.area_of_effect.type}{" "}
                    </li>
                  </ul>
                </li>
              )}

              <li>
                <span>School : </span> {spell.school.name}
              </li>
              <li>
                <span>Duration : </span> {spell.duration}
              </li>

              <li>
                <span>Components : </span>
                {spell.components.map((c) => (
                  <span key={c}>{c + "  "}</span>
                ))}
              </li>
              <li>
                <span>Range : </span>
                {spell.range}
              </li>
              <li>
                <span>Ritual : </span>
                {spell.ritual.toString()}
              </li>
              <li>
                <span>Concentration : </span>
                {spell.concentration.toString()}
              </li>
              <li>
                <span>Casting Time : </span>
                {spell.casting_time}
              </li>
              {spell.classes && (
                <li>
                  <span>Classes : </span>
                  <ul>
                    {spell.classes.map(
                      (spellClass: { [key: string]: string }) => (
                        <li key={spellClass.name}>{spellClass.name}</li>
                      )
                    )}
                  </ul>
                </li>
              )}
              {spell.subclasses && (
                <li>
                  <span>Sub Classes : </span>
                  <ul>
                    {spell.subclasses.map(
                      (spellClass: { [key: string]: string }) => (
                        <li key={spellClass.name}>{spellClass.name}</li>
                      )
                    )}
                  </ul>
                </li>
              )}
            </ul>
          </div>

          {spell.material && (
            <div className={styles["description"]}>
              <span>Material. </span>
              {spell.material}
            </div>
          )}
          {/* <div className={styles["higher-level"]}>
            <h3>Higher Levels:</h3>
            {higher_level.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div> */}
        </div>
      )}
    </>
  );
};

export default SpellDetails;
