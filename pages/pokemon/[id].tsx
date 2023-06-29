import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

interface PokemonPageProps {
  pokemon: Pokemon;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  console.log(pokemon);
  return (
    <Layout title="Pokemon">
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...Array(151)].map((_, i) => ({ params: { id: `${i + 1}` } }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
