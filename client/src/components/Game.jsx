import React, { useState } from "react";
import Board from "./Board";
import Spinner from "./Spinner";

function Game({ channel }) {
  const [playersJoined, setPlayersJoined] = useState(
    // синтаксис сервера який відстежує скільки гравців на сервері і якщо 2 то true
    channel.state.watcher_count === 2
  );

  // Створюємо стан для переможція для компонента Board
  const [result, setResult] = useState({ winner: "none", state: "none" });

  // для відстежування будь-яких подій в середені каналу, channel.on() - це спостерігач, він вбудований у API
  // та івент в середені викликаний коли юзер зайде в канал
  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });

  if (!playersJoined) {
    // return <div>Waiting to other player...</div>;
    return <Spinner/>
  }

  

  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult}/>
      {/* <Chat /> */}
      {/* Leave game button */}
    </div>
  );
}

export default Game;
