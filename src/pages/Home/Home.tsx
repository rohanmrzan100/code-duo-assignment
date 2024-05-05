import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";
import Card from "../../components/Card/Card";
import { ICardProps } from "../../types";
import { useLocation } from "react-router-dom";
import SpellType from "../../components/SpellType/SpellType";
import SpellLevel from "../../components/SpellLevel/SpellLevel";
import VerticalDivider from "../../components/VerticalDivider";
import Search from "../../components/Search/Search";
axios.defaults.baseURL = "https://www.dnd5eapi.co";
axios.defaults.headers.post["Content-Type"] = "application/json";
const DEFAULT_PAGE_SIZE = 12;
const Home = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [spells, setSpells] = useState<ICardProps[]>([]);
  const [displaySpells, setDisplaySpells] = useState<ICardProps[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  function handleDataFromChild(query: string) {
    setQuery(query);
  }
  useEffect(() => {
    if (query == "") {
      return;
    }
    async function fetchSpellFromQuery() {
      setLoading(true);

      try {
        const response = await axios.get("/api/spells/" + query);
        console.log(response.data);

        setDisplaySpells([response.data]);
      } catch (error) {
        setDisplaySpells([]);
        console.log(error);
        toast.error("Something went wrong !");
      } finally {
        setLoading(false);
      }
    }
    fetchSpellFromQuery();
  }, [query]);
  async function fetchSpells() {
    setLoading(true);

    const params = new URLSearchParams(location.search);
    const school = params.get("school");
    const lvl = params.get("level");
    let url;
    if (school == "") {
      url = "/api/spells?level=" + lvl;
    } else if (
      (school == null && lvl == null) ||
      (school == "" && lvl == null) ||
      (school == null && lvl == "") ||
      (school == "" && lvl == "")
    ) {
      url = "/api/spells";
    } else if (school == null) {
      url = "/api/spells?level=" + lvl;
    } else if (lvl == "") {
      url = "/api/spells?school=" + school;
    } else if (lvl == null) {
      url = "/api/spells?school=" + school;
    } else {
      url = "/api/spells?school=" + school + "&level=" + lvl;
    }
    console.log(url);

    try {
      const response = await axios.get(url);
      setSpells(response.data.results);
      setDisplaySpells(response.data.results.slice(0, DEFAULT_PAGE_SIZE));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong !");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSpells();
  }, [location.search]);

  useEffect(() => {
    fetchSpells();
  }, []);

  // function handleLoadMore() {
  //   if (page === 0) {
  //     setDisplaySpells([
  //       ...displaySpells,
  //       ...spells.slice(DEFAULT_PAGE_SIZE, 24),
  //     ]);
  //   } else {
  //     setDisplaySpells([
  //       ...displaySpells,
  //       ...spells.slice(
  //         page * DEFAULT_PAGE_SIZE,
  //         (page + 1) * DEFAULT_PAGE_SIZE
  //       ),
  //     ]);
  //   }
  //   setPage(page + 1);
  // }

  function handleLoadMore() {
    const nextPage = page + 1;
    const startIndex = nextPage * DEFAULT_PAGE_SIZE;
    const endIndex = (nextPage + 1) * DEFAULT_PAGE_SIZE;

    if (startIndex >= spells.length) {
      return;
    }

    const adjustedEndIndex = Math.min(endIndex, spells.length);

    setDisplaySpells([
      ...displaySpells,
      ...spells.slice(startIndex, adjustedEndIndex),
    ]);
    setPage(nextPage);
  }
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        {" "}
        <div className={styles.schools}>
          <SpellLevel />
          <SpellType />
          <Search handleQueryValue={handleDataFromChild} />
        </div>
      </div>
      <VerticalDivider />
      <div className={styles.right}>
        <div className={styles.top}>
          <h1>Spells</h1>
          <p>(Total {spells.length})</p>
   
        </div>

        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div className={styles.cards}>
            {displaySpells && displaySpells.length > 0 ? (
              displaySpells.map((spell, index) => (
                <Card key={index} {...spell} />
              ))
            ) : (
              <h1>Not Found</h1>
            )}
          </div>
        )}
        {spells.length > displaySpells.length &&
        displaySpells.length >= DEFAULT_PAGE_SIZE ? (
          <div id={styles.LoadMore}>
            <button className={styles["button-3"]} onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
