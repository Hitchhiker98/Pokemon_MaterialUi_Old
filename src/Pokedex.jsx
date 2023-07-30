import { React, useEffect, useState } from "react";
import { withRouter } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
// import { makeStyles, fade } from "@mui/material";
// import mockData from "./mockData";
import { LinearProgress } from "@mui/material";
import Typography from "@mui/material/Typography";
import { toFirstCharUppercase } from "./constants";
import SearchIcon from "@mui/icons-material/Search";

import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   gridPadding: {
//     padding: "20px 50px 0 50px",
//   },
//   progressBar: {
//     background: "none",
//   },
//   cardMedia: {
//     margin: "auto",
//   },
//   cardContent: {
//     textAlign: "center",
//   },
//   searchContainer: {
//     display: "flex",
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     paddingLeft: "20px",
//     paddingRight: "20px",
//     marginTop: "5px",
//     marginBottom: "5px",
//   },
//   searchIcon: {
//     alignSelf: "flex-end",
//     marginBottom: "5px",
//   },
//   searchInput: {
//     width: "200px",
//     margin: "5px",
//   },
// }));

function Pokedex(props) {
  const { history } = props;
  console.log(props);
  const [pokemonData, setpokemonData] = useState({});
  // const classes = useStyles();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=15`).then((response) => {
      const { results } = response.data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      });
      setpokemonData(newPokemonData);
    });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const generatePokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <Grid item xs={12} sm={3} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokemonId}`)}>
          <CardMedia
            image={sprite}
            style={{ width: "130px", height: "130px", margin: "auto" }}
          />
          <CardContent style={{ textAlign: "center" }}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  console.log(pokemonData);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <div
            style={{
              display: "flex",
              backgroundColor: "#fff",
              paddingLeft: "20px",
              paddingRight: "20px",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          >
            <SearchIcon
              style={{ alignSelf: "flex-end", marginBottom: "5px" }}
            />
            <TextField
              style={{ width: "200px", margin: "5px" }}
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ? (
        <Grid container spacing={2} style={{padding: "20px 50px 0 50px"}}>
          {Object.keys(pokemonData).map((pokemonId) => {
            return (
              pokemonData[pokemonId].name.includes(filter) &&
              generatePokemonCard(pokemonId)
            );
          })}
        </Grid>
      ) : (
        <LinearProgress color="secondary" />
      )}
    </>
  );
}

export default withRouter(Pokedex);
