import { useNavigate, useParams } from "react-router";
import arrowBack from "~/assets/arrow-back.png";
import heightIcon from "~/assets/height.png";
import pokeball from "~/assets/pokeball.png";
import weightIcon from "~/assets/weight.png";
import { SafeAreaView } from "~/components/SafeAreaView";
import { useFetchPokemon } from "~/lib/pokemon/useFetchPokemon";
import { capitalize } from "~/lib/string";
import "./Pokemon.scss";

export const Pokemon = (props: React.PropsWithChildren) => {
  const { id } = useParams();
  const { isLoading, isError, pokemon } = useFetchPokemon(id);
  const nav = useNavigate();

  if (isLoading) {
    return <text>Loading...</text>;
  }

  if (isError) {
    return <text>Error loading Pokemon</text>;
  }

  const type = pokemon.types[0].type.name;
  const stats = pokemon.stats
    .map((stat) => ({
      [stat.stat.name]: stat.base_stat,
    }))
    .reduce((obj, curr) => ({ ...obj, ...curr }), {});
  const enFlavours = pokemon.flavor_text_entries.filter(
    (ft) => ft.language.name === "en"
  );
  const randomFlavorId = Math.floor(Math.random() * enFlavours.length);
  const flavorText = enFlavours[randomFlavorId].flavor_text.replace(/\n/g, " ");

  const navigateBack = () => {
    nav("/");
  };
  const typeBgClass = `bg--${type}`;
  const typeColorClass = `color--${type}`;

  return (
    <SafeAreaView className={`pokemon-container ${typeBgClass}`}>
      <image className="pokemon-container-bg" src={pokeball} />
      <view className="pokemon-header">
        <view className="pokemon-header-nav" bindtap={navigateBack}>
          <image className="pokemon-header-back" src={arrowBack} />
          <text className="header-headline color--grayscale-white">
            {capitalize(pokemon.name)}
          </text>
        </view>
        <text className="header-subtitle-2 color--grayscale-white">
          #{String(pokemon.id).padStart(3, "0")}
        </text>
      </view>
      <view className="pokemon-middle-control">
        <image
          className="pokemon-image"
          src={pokemon.sprites.other["official-artwork"].front_default}
        />
      </view>
      <view className="pokemon-attributes">
        <view className="pokemon-types">
          {pokemon.types.map((type) => {
            return (
              <text
                key={type.type.name}
                className={`pokemon-type bg--${type.type.name}`}
              >
                {capitalize(type.type.name)}
              </text>
            );
          })}
        </view>
        <text className={`header-subtitle-1 ${typeColorClass}`}>About</text>
        <view className="pokemon-about">
          <view className="pokemon-about-item">
            <view>
              <image src={weightIcon} />
              <text>{pokemon.weight / 10} kg</text>
            </view>
            <text className="body-caption color--grayscale-medium">Weight</text>
          </view>
          <view className="divider"></view>
          <view className="pokemon-about-item">
            <view>
              <image src={heightIcon} />
              <text>{pokemon.height / 10} m</text>
            </view>
            <text className="body-caption color--grayscale-medium">Height</text>
          </view>
          <view className="divider"></view>
          <view className="pokemon-about-item">
            {pokemon.abilities.slice(0, 2).map((a) => {
              return (
                <text className="body-body-3">
                  {capitalize(a.ability.name)}
                </text>
              );
            })}
            <text className="body-caption color--grayscale-medium">Moves</text>;
          </view>
        </view>
        <view className="pokemon-flavor-text">
          <text className="body-body-2">{flavorText}</text>
        </view>
        <text className={`header-subtitle-1 ${typeColorClass}`}>
          Base Stats
        </text>
        <view className="pokemon-stats">
          <view className="pokemon-stat">
            <text
              className={`pokemon-stat-name header-subtitle-3 ${typeColorClass}`}
            >
              HP
            </text>
            <view className="divider"></view>
            <text className="body-body-3">
              {String(stats.hp).padStart(3, "0")}
            </text>
            <view className="pokemon-stat-bar">
              <view className={`pokemon-stat-bar-bg ${typeBgClass}`}></view>
              <view
                style={{ width: `${stats.hp}%` }}
                className={`pokemon-stat-bar-fill ${typeBgClass}`}
              ></view>
            </view>
          </view>
          <view className="pokemon-stat">
            <text
              className={`pokemon-stat-name header-subtitle-3 ${typeColorClass}`}
            >
              ATK
            </text>
            <view className="divider"></view>
            <text className="body-body-3">
              {String(stats.attack).padStart(3, "0")}
            </text>
            <view className="pokemon-stat-bar">
              <view className={`pokemon-stat-bar-bg ${typeBgClass}`}></view>
              <view
                style={{ width: `${stats.attack}%` }}
                className={`pokemon-stat-bar-fill ${typeBgClass}`}
              ></view>
            </view>
          </view>
          <view className="pokemon-stat">
            <text
              className={`pokemon-stat-name header-subtitle-3 ${typeColorClass}`}
            >
              DEF
            </text>
            <view className="divider"></view>
            <text className="body-body-3">
              {String(stats.defense).padStart(3, "0")}
            </text>
            <view className="pokemon-stat-bar">
              <view className={`pokemon-stat-bar-bg ${typeBgClass}`}></view>
              <view
                style={{ width: `${stats.defense}%` }}
                className={`pokemon-stat-bar-fill ${typeBgClass}`}
              ></view>
            </view>
          </view>
          <view className="pokemon-stat">
            <text
              className={`pokemon-stat-name header-subtitle-3 ${typeColorClass}`}
            >
              SATK
            </text>
            <view className="divider"></view>
            <text className="body-body-3">
              {String(stats["special-attack"]).padStart(3, "0")}
            </text>
            <view className="pokemon-stat-bar">
              <view className={`pokemon-stat-bar-bg ${typeBgClass}`}></view>
              <view
                style={{ width: `${stats["special-attack"]}%` }}
                className={`pokemon-stat-bar-fill ${typeBgClass}`}
              ></view>
            </view>
          </view>
          <view className="pokemon-stat">
            <text
              className={`pokemon-stat-name header-subtitle-3 ${typeColorClass}`}
            >
              SDEF
            </text>
            <view className="divider"></view>
            <text className="body-body-3">
              {String(stats["special-defense"]).padStart(3, "0")}
            </text>
            <view className="pokemon-stat-bar">
              <view className={`pokemon-stat-bar-bg ${typeBgClass}`}></view>
              <view
                style={{ width: `${stats["special-defense"]}%` }}
                className={`pokemon-stat-bar-fill ${typeBgClass}`}
              ></view>
            </view>
          </view>
          <view className="pokemon-stat">
            <text
              className={`pokemon-stat-name header-subtitle-3 ${typeColorClass}`}
            >
              SPD
            </text>
            <view className="divider"></view>
            <text className="body-body-3">
              {String(stats.speed).padStart(3, "0")}
            </text>
            <view className="pokemon-stat-bar">
              <view className={`pokemon-stat-bar-bg ${typeBgClass}`}></view>
              <view
                style={{ width: `${stats.speed}%` }}
                className={`pokemon-stat-bar-fill ${typeBgClass}`}
              ></view>
            </view>
          </view>
        </view>
      </view>
    </SafeAreaView>
  );
};
