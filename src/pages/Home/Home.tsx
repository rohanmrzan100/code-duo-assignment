import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/Card/Card";
import Search from "../../components/Search/Search";
import SideFilter from "../../components/SideFilter/SideFilter";
import SpellLevel from "../../components/SpellLevel/SpellLevel";
import SpellType from "../../components/SpellType/SpellType";
import { ICardProps } from "../../types";
import styles from "./styles.module.scss";
import VerticalDivider from "../../components/VerticalDivider";
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
    let url = "/api/spells";
    if (school || lvl) {
      url += "?";
      if (school) {
        url += "school=" + school;
        if (lvl) {
          url += "&";
        }
      }
      if (lvl) {
        url += "level=" + lvl;
      }
    }

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
        
        <div className={styles.schools}>
          <SpellLevel />
          <SpellType />
          <Search handleQueryValue={handleDataFromChild} />
          <br />
          <button
            className={styles.clearFilter}
            onClick={() => (window.location.href = "/")}
          >
            Clear Filter
          </button>
        </div>
      </div>
      <VerticalDivider />
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.leftSide}>
            <h1>Spells</h1>
            <p>(Total {spells.length})</p>
          </div>

          <SideFilter handleQueryValue={handleDataFromChild} />
        </div>
        <hr
          style={{
            borderTop: "1px solid orangered",
          }}
        />

        {loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div className={styles.cardsContainer}>
            <div className={styles.cards}>
              {displaySpells && displaySpells.length > 0 ? (
                displaySpells.map((spell, index) => (
                  <Card key={index} {...spell} />
                ))
              ) : (
                <h1>Not Found</h1>
              )}
            </div>
            {!loading &&
              displaySpells.length >= DEFAULT_PAGE_SIZE &&
              spells.length > displaySpells.length && (
                <div id={styles.LoadMore}>
                  <button
                    className={styles["button-3"]}
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
