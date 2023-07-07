import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { Layout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { capitalize, getPokemonInfo, localFavorites } from "@/utils";

interface PokemonPageProps {
  pokemon: Pokemon;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon }) => {
  const { name, sprites, id } = pokemon;
  const [isInFavorites, setIsInFavorites] = useState<boolean>();

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(id));
  }, [id]);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites(!isInFavorites);

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={capitalize(name)}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={sprites.other?.dream_world.front_default || ""}
                alt={name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>
              <Button
                color="gradient"
                bordered={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? "In Favorites" : "Save to Favorites"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...Array(151)].map((_, i) => ({ params: { id: `${i + 1}` } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};

export default PokemonPage;
