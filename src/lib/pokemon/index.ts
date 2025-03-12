type Pokemon = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
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

export const getPokemon = async (search: number | string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
  if (!response.ok) {
    throw new Error("Pokemon not found");
  }
  return response.json();
};

export const transformPokemonIntoListItem = (pokemon: Pokemon) => {
  return {
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.sprites.other["official-artwork"].front_default,
  };
};
