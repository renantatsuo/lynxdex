type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

type FlavorTextEntries = {
  flavor_text: string;
  version: {
    name: string;
  };
  language: {
    name: string;
  };
};
export type Pokemon = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: PokemonType;
    };
  }>;
  flavor_text_entries: Array<FlavorTextEntries>;
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
};

type PokemonSpecies = {
  flavor_text_entries: Array<FlavorTextEntries>;
};
type GetPokemonArgs = {
  limit: number;
  offset: number;
};

export type PokemonListItem = {
  name: string;
  id: number;
  image: string;
};

type GQLResponse<R> = {
  data: {
    pokemons: {
      count: number;
      results: Array<R>;
    };
  };
};

export const getPokemonList = async (
  args: GetPokemonArgs
): Promise<GQLResponse<PokemonListItem>> => {
  const query = `query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      results {
        name
        image: artwork
        id
      }
    }
  }`;

  const response = await fetch("https://graphql-pokeapi.graphcdn.app/", {
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: args,
    }),
    method: "POST",
  }).then((res) => res.json());

  return response;
};

const cachePokeAPI = new Map<string, Pokemon>();

export const getPokemon = async (search: number | string): Promise<Pokemon> => {
  const cacheKey = String(search);
  if (cachePokeAPI.has(cacheKey)) {
    return cachePokeAPI.get(cacheKey)!;
  }

  const speciesQuery = fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${search}`
  );
  const pokemonQuery = fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
  const [speciesRes, pokemonRes] = await Promise.all([
    speciesQuery,
    pokemonQuery,
  ]);
  if (!speciesRes.ok || !pokemonRes.ok) {
    throw new Error("Pokemon not found");
  }
  const pokemon = (await pokemonRes.json()) as Pokemon;
  const species = (await speciesRes.json()) as PokemonSpecies;
  pokemon.flavor_text_entries = species.flavor_text_entries;
  cachePokeAPI.set(pokemon.name, pokemon);
  cachePokeAPI.set(String(pokemon.id), pokemon);
  return pokemon;
};

export const transformPokemonIntoListItem = (pokemon: Pokemon) => {
  return {
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.sprites.other["official-artwork"].front_default,
  };
};
