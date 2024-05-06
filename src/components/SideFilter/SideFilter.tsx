import React, { useEffect, useState } from "react";
import SpellLevel from "../SpellLevel/SpellLevel";
import SpellType from "../SpellType/SpellType";

import styles from "./styles.module.scss";
import { FaWindowClose } from "react-icons/fa";
import { CiFilter, CiSearch } from "react-icons/ci";
import { createSearchParams, useNavigate } from "react-router-dom";
const SideFilter = ({
  handleQueryValue,
}: {
  handleQueryValue: (query: string) => void;
}) => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [spellName, setSpellName] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpellName(event.target.value);
  };

  const handleSearchClick = () => {
    handleQueryValue(spellName.toLowerCase().split(" ").join("-"));
    setSpellName("");
    navigate({
      search: createSearchParams({}).toString(),
    });
    handleFilterClick();
  };

  function handleFilterClick() {
    setActive(!active);
  }

  useEffect(() => {
    active
      ? (document.getElementById("overlay").style.display = "block")
      : (document.getElementById("overlay").style.display = "none");
  }, [active]);
  return (
    <>
      <div className={styles.flex}>
        <p>Filter : </p>
        <span
          hover-tooltip="Filter Spells"
          tooltip-position="bottom"
          className={` tool`}
          onClick={handleFilterClick}
        >
          {" "}
          <CiFilter />
        </span>
        <button onClick={() => (window.location.href = "/")}>Clear Filter</button>
      </div>
      <div className={`${styles.filter} ${!active && styles.active}`}>
        <div className={styles.filterTop}>
          <h2>Filter</h2>
          <FaWindowClose onClick={handleFilterClick} />
        </div>
        <hr
          style={{
            borderTop: "1px solid orangered",
          }}
        />
        <SpellLevel />
        <SpellType />
        <div className={styles.search}>
          <h3>Search Using Name</h3>
          <input
            type="text"
            placeholder="Enter spell name"
            value={spellName}
            onChange={handleInputChange}
          />
          <button
            className={styles["button-3"]}
            role="button"
            onClick={handleSearchClick}
          >
            Search <CiSearch />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideFilter;
