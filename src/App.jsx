import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" children={<Pokedex/>} />
    <Route
      exact
      path="/:pokemonId"
      children={<Pokemon/>}
    />
  </Switch>
);

export default App;