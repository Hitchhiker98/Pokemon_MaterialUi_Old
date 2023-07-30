import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  withRouter,
} from "react-router-dom";
import Typography from '@mui/material/Typography';

import Link from '@mui/material/Link';
import { toFirstCharUppercase } from "./constants";
// import mockData from "./mockData"; 
import { LinearProgress, Button } from '@mui/material';
import axios from "axios";

function Pokemon(props) {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState();
  console.log(pokemon);


  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
        setPokemon(false);
      });
  }, []);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Typography variant="h1">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography>
        {types.map((typeInfo) => {
          const { name } = typeInfo.type;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <LinearProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => props.history.push("/")}>
          back to pokedex
        </Button>
      )}
    </>
  );
}

export default withRouter(Pokemon);
