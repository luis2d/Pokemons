import { useState } from "react";

import { GetStaticPaths, GetStaticProps } from "next";
import { NextPage } from "next";
import { Card, Grid, Text, Image, Button, Container } from "@nextui-org/react";

import { pokeApi } from "@/Api";
import { Layout } from "../../components/layouts/Layout";
import { Pokemon } from "@/interfaces";
import { localFavorites } from "@/utils";
import { PokemonListResponse } from "../../interfaces/pokemon-list";
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [isInfavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInfavorites);
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable isPressable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
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
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInfavorites}
                onClick={onToggleFavorite}
              >
                {isInfavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={25}>Sprites:</Text>
              <Container direction="row" display="flex" gap={4}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokeNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokeNames.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  
  return {
    props: {
      pokemon: await getPokemonInfo(name)
    },
  };
};

export default PokemonByNamePage;
