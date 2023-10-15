import './App.css';
import { Route, Switch } from "react-router-dom";
import GameDisplay from './components/GameDisplay';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function App() {
  return (
    <div>
    <NavBar />
    <Switch>
      <Route exact path="/">
        <GameDisplay />
      </Route>
    </Switch>
  </div>
  );
}

export default App;
