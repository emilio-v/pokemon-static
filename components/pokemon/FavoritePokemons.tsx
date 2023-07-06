import { FC } from "react";
import { Grid } from "@nextui-org/react";
import { FavoriteCardPokemon } from ".";

interface FavoritePokemonsProps {
  favoritePokemons: number[];
}

export const FavoritePokemons: FC<FavoritePokemonsProps> = ({
  favoritePokemons,
}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favoritePokemons.map((id) => (
        <FavoriteCardPokemon id={id} key={id} />
      ))}
    </Grid.Container>
  );
};
