import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const SpellLevel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const spellLevel = [
    { name: "All", search: "" },
    { name: "Level 0", search: "0" },
    { name: "Level 1", search: "1" },
    { name: "Level 2", search: "2" },
    { name: "Level 3", search: "3" },
    { name: "Level 4", search: "4" },
    { name: "Level 5", search: "5" },
    { name: "Level 6", search: "6" },
    { name: "Level 7", search: "7" },
    { name: "Level 8", search: "8" },
    { name: "Level 9", search: "9" },
  ];
  const getSpellTypeName = (searchValue: string) => {
    const spelllevel = spellLevel.find((spell) => spell.search === searchValue);
    return spelllevel ? spelllevel.name : "All";
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(location.search);
    const school = params.get("school");
    // const lvl = params.get("level");
    // console.log({ school, lvl });

    if (school) {
      navigate({
        search: createSearchParams({
          school: school,
          level: tag,
        }).toString(),
      });
    } else {
      navigate({
        search: createSearchParams({
          level: tag,
        }).toString(),
      });
    }
    setSelectedTag(tag);
    toggleDropdown();
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lvl = params.get("level");
    if (lvl) {
      console.log(lvl);
      setSelectedTag(lvl.toString());
    }
  }, []);

  return (
    <div className={styles.spellDropdown}>
      <h3>Spell Level</h3>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownHeader} onClick={toggleDropdown}>
          {spellLevel && <p>{getSpellTypeName(selectedTag)}</p>}
          <FaChevronDown />
        </div>
        {isDropdownOpen && (
          <ul className={styles.dropdownList}>
            {spellLevel.map((spell, index) => (
              <li key={index} onClick={() => handleTagSelect(spell.search)}>
                <p> {spell.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SpellLevel;
