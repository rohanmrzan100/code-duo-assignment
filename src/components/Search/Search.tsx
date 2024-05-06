import React, { useState } from "react";
import styles from "../SideFilter/styles.module.scss";
import { CiSearch } from "react-icons/ci";
import { createSearchParams, useNavigate } from "react-router-dom";

const Search = ({
  handleQueryValue,
}: {
  handleQueryValue: (query: string) => void;
}) => {
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
    
  };

  return (
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
  );
};

export default Search;
