import { useEffect, useState } from "@lynx-js/react";
import { getPokemon, type Pokemon } from "~/lib/pokemon";

type Return =
  | {
      isLoading: true;
      isError: false;
      pokemon?: never;
    }
  | {
      isLoading: false;
      isError: true;
      pokemon?: never;
    }
  | {
      isLoading: false;
      isError: false;
      pokemon: Pokemon;
    };

export const useFetchPokemon = (
  id?: Parameters<typeof getPokemon>[0]
): Return => {
  const [isLoading, setIsLoading] = useState(id !== undefined);
  const [isError, setIsError] = useState(id === undefined);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getPokemon(id)
      .then(setPokemon)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return { isLoading, isError: false };
  }
  if (isError) {
    return { isLoading: false, isError };
  }
  if (!pokemon) {
    throw Error(
      "Unreachable state. " + JSON.stringify({ isLoading, isError, pokemon })
    );
  }

  return {
    isLoading,
    isError,
    pokemon,
  };
};
