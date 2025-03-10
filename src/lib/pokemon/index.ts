type GetPokemonArgs = {
  limit: number;
  offset: number;
};

type PokemonListItem = {
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

const cache = new Map<string, any>();

cache.set(JSON.stringify({ limit: 20, offset: 0 }), {
  data: {
    pokemons: {
      count: 1304,
      results: [
        {
          name: "bulbasaur",
          id: 1,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
        {
          name: "ivysaur",
          id: 2,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
        },
        {
          name: "venusaur",
          id: 3,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        },
        {
          name: "charmander",
          id: 4,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        },
        {
          name: "charmeleon",
          id: 5,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        },
        {
          name: "charizard",
          id: 6,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        },
        {
          name: "squirtle",
          id: 7,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        },
        {
          name: "wartortle",
          id: 8,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
        },
        {
          name: "blastoise",
          id: 9,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        },
        {
          name: "caterpie",
          id: 10,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
        },
        {
          name: "metapod",
          id: 11,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
        },
        {
          name: "butterfree",
          id: 12,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
        },
        {
          name: "weedle",
          id: 13,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
        },
        {
          name: "kakuna",
          id: 14,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
        },
        {
          name: "beedrill",
          id: 15,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
        },
        {
          name: "pidgey",
          id: 16,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
        },
        {
          name: "pidgeotto",
          id: 17,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
        },
        {
          name: "pidgeot",
          id: 18,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
        },
        {
          name: "rattata",
          id: 19,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
        },
        {
          name: "raticate",
          id: 20,
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
        },
      ],
    },
  },
});

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

  const cacheKey = JSON.stringify(args);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const response = await fetch("https://graphql-pokeapi.graphcdn.app/", {
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: args,
    }),
    method: "POST",
  }).then((res) => res.json());

  cache.set(cacheKey, response);
  return response;
};
