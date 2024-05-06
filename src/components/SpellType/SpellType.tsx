import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import styles from "../SpellLevel/styles.module.scss";

const SpellType = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedTag, setSelectedTag] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const spellTypes = [
    { name: "All", search: "" },
    { name: "Divination", search: "divination" },
    { name: "Evocation", search: "evocation" },
    { name: "Enchantment", search: "enchantment" },
    { name: "Illusion", search: "illusion" },
    { name: "Transmutation", search: "transmutation" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(location.search);
    const school = params.get("school");
    const lvl = params.get("level");
    console.log({ school, lvl });
    if (tag == "") {
      params.delete("school");
    }
    if (lvl) {
      navigate({
        search: createSearchParams({
          school: tag,
          level: lvl,
        }).toString(),
      });
    } else {
      navigate({
        search: createSearchParams({
          school: tag,
        }).toString(),
      });
    }
    setSelectedTag(tag);
    toggleDropdown();
  };
  const getSpellTypeName = (searchValue: string) => {
    const spellType = spellTypes.find((spell) => spell.search === searchValue);
    return spellType ? spellType.name : "All";
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const school = params.get("school");
    if (school) {
      console.log(school);
      setSelectedTag(school);
    }
  }, []);
  return (
    <div className={styles.spellDropdown}>
      <h3>Spell Type</h3>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownHeader} onClick={toggleDropdown}>
          {spellTypes && <p>{getSpellTypeName(selectedTag)}</p>}
          <FaChevronDown />
        </div>
        {isDropdownOpen && (
          <ul className={styles.dropdownList}>
            {spellTypes.map((spell, index) => (
              <li onClick={() => handleTagSelect(spell.search)} key={index}>
                <p> {spell.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SpellType;
