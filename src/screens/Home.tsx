import { useMemo, useState } from "@lynx-js/react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router";
import pokeball from "~/assets/pokeball.png";
import initialPokemonList from "~/assets/pokemon-list.json";
import tagImg from "~/assets/tag.png";
import textFormatImg from "~/assets/text-format.png";
import { SafeAreaView } from "~/components/SafeAreaView/SafeAreaView.jsx";
import {
  getPokemon,
  getPokemonList,
  transformPokemonIntoListItem,
  type PokemonListItem,
} from "~/lib/pokemon";
import { capitalize } from "~/lib/string";
import { useTheme } from "~/screens/useTheme";
import "./Home.css";

const sortById = (list: PokemonListItem[]) => {
  return [...list].sort((a, b) => a.id - b.id);
};

const sortByName = (list: PokemonListItem[]) => {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
};

export function Home() {
  const theme = useTheme();
  const [pokemonList, setPokemonList] =
    useState<PokemonListItem[]>(initialPokemonList);
  const [displayList, setDisplayList] =
    useState<PokemonListItem[]>(initialPokemonList);
  const [sortBy, setSortBy] = useState<"id" | "name">("id");
  const [maxLength, setMaxLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const sortedList = useMemo(() => {
    if (sortBy === "id") {
      return sortById(displayList);
    }
    if (sortBy === "name") {
      return sortByName(displayList);
    }
    return displayList;
  }, [displayList, sortBy]);

  const handleLoadMore = () => {
    if (loading || pokemonList.length >= maxLength) return;
    setLoading(true);
    getPokemonList({ limit: 20, offset: pokemonList.length }).then((res) => {
      setPokemonList((prev) =>
        Array.from(prev).concat(res.data.pokemons.results)
      );
      setLoading(false);
      setMaxLength(res.data.pokemons.count);
    });
  };

  const handleSearch = debounce((e: any) => {
    const currentValue = e.detail.value.trim().toLocaleLowerCase();
    const isIdSearch = currentValue.match(/^#?\d+$/);

    if (currentValue.length > 3 || isIdSearch) {
      const id = Number(currentValue.replace("#", ""));
      const filteredPokemonList = pokemonList.filter(
        (pokemon) => pokemon.name.includes(currentValue) || pokemon.id === id
      );
      if (filteredPokemonList.length > 0) {
        setDisplayList(filteredPokemonList);
      } else {
        setLoading(true);
        getPokemon(currentValue)
          .then((pokemon) => {
            const transformedPokemon = transformPokemonIntoListItem(pokemon);
            setDisplayList([transformedPokemon]);
          })
          .catch(() => {
            setDisplayList([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setDisplayList(pokemonList);
    }
  }, 150);

  const toggleSort = () => {
    setSortBy((prev) => (prev === "id" ? "name" : "id"));
  };

  return (
    <SafeAreaView className={`app-${theme} home-container`}>
      <view className="home-header">
        <image src={pokeball} />
        <text>Lynxdex</text>
      </view>

      <view className="list-control">
        <input type="text" placeholder="Search" bindinput={handleSearch} />
        <view className="sort-button" bindtap={toggleSort}>
          {sortBy === "id" ? <image src={tagImg} /> : null}
          {sortBy === "name" ? <image src={textFormatImg} /> : null}
        </view>
      </view>
      {loading ? <text>Loading...</text> : null}

      <list
        className="pokemon-list"
        list-type="flow"
        span-count={3}
        scroll-orientation="vertical"
        bindscrolltolower={handleLoadMore}
        preload-buffer-count={6}
        scroll-bar-enable={true}
        key={`pokemon-list-${sortBy}`} // force remount when sort type changes
      >
        {sortedList.map((pokemon) => (
          <list-item
            className="pokemon-item"
            key={`list-item-${pokemon.id}`}
            item-key={`list-item-${pokemon.id}`}
            bindtap={() => nav(`/${pokemon.id}`)}
          >
            <view className="pokemon-item-border"></view>
            <view className="pokemon-item-background"></view>
            <text className="pokemon-item-id">
              #{String(pokemon.id).padStart(3, "0")}
            </text>
            <image src={pokemon.image} />
            <text>{capitalize(pokemon.name)}</text>
          </list-item>
        ))}
      </list>
    </SafeAreaView>
  );
}
