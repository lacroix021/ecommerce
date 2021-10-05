import React, {useState, useEffect} from "react";
import {Loader} from "semantic-ui-react";
import {size} from "lodash";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import {getLastGamesApi} from "../api/game";
import ListGames from "../components/ListGames/ListGames";

export default function Home() {
  const [games, setGames] = useState(null);
  //console.log(games);

  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(50);
      if(size(response) > 0) setGames(response);
      else setGames([]);
    })();
  }, []);
  
  return (
    <div className="home">
      <BasicLayout>
      {!games && <Loader active>Cargando Juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games = {games}/>}
      </BasicLayout>
    </div>
  )
}
