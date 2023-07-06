import { Layout } from "@/components/layouts";
import { FavoritePokemons } from "@/components/pokemon";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    if (!window) return;
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Favorites Page">
      {!!favoritePokemons.length ? (
        <FavoritePokemons favoritePokemons={favoritePokemons} />
      ) : (
        <NoFavorites />
      )}
    </Layout>
  );
};

export default FavoritesPage;
