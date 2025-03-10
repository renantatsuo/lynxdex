import { useEffect, useState } from "@lynx-js/react";
import { SafeAreaView } from "~/components/SafeAreaView/SafeAreaView.jsx";
import { getPokemonList } from "~/lib/pokemon";
import "./App.css";
import pokeball from "./assets/pokeball.png";

type Theme = "light" | "dark";

export function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [maxLength, setMaxLength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTheme(lynx.__globalProps.theme.toLocaleLowerCase() as Theme);
  }, [lynx.__globalProps.theme]);

  useEffect(() => {
    setLoading(true);
    getPokemonList({ limit: 20, offset: 0 }).then((res) => {
      setPokemonList(res.data.pokemons.results);
      setLoading(false);
      setMaxLength(res.data.pokemons.count);
    });
  }, []);

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

  return (
    <SafeAreaView className={`app-${theme} home-container`}>
      <view className="home-header">
        <image src={pokeball} />
        <text>Lynxdex</text>
      </view>
      {loading ? <text>Loading...</text> : null}

      <list
        className="pokemon-list"
        list-type="flow"
        span-count={3}
        scroll-orientation="vertical"
        bindscrolltolower={handleLoadMore}
      >
        {pokemonList.map((pokemon) => (
          <list-item
            className="pokemon-item"
            key={`list-item-${pokemon.id}`}
            item-key={`list-item-${pokemon.id}`}
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

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
