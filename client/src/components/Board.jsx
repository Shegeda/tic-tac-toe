import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import { Patterns } from "./WinningPatterns";
import ResetButton from "./ResetButton";

function Board({ result, setResult }) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    checkIfTie();
    checkWin();
  }, [board]);

  const chooseSquare = async (square) => {
    if (!gameOver && turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({
        type: "game-move",
        data: { square, player },
      });

      const updatedBoard = board.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      });

      setBoard(updatedBoard);
    }
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;

      currPattern.forEach((idx) => {
        if (firstPlayer !== board[idx]) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setMessage(
          `Переможець, гравець - ${board[currPattern[0]]}. Вітання 🥳`
        );
        setShowMessage(true);
        setResult({ winner: board[currPattern[0]], state: "won" });
        setGameOver(true);
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;

    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setMessage(`Хмм.. Нічия, спробуй ще.`);
      setShowMessage(true);
      setResult({ winner: "none", state: "tie" });
      setGameOver(true);
    }
  };

  const resetBoard = () => {
    setIsResetting(true);

    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setTurn("X");
    setGameOver(false);
    setShowMessage(false);
    setMessage("");
    setResult({ winner: null, state: null });

    setIsResetting(false);
  };

  const handleResetButtonClick = async () => {
    if (!isResetting) {
      setIsResetting(true);
      resetBoard();
      await channel.sendEvent({
        type: "game-reset",
      });
      setIsResetting(false);
    }
  };

  channel.on((event) => {
    if (event.type === "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      const updatedBoard = board.map((val, idx) => {
        if (idx === event.data.square && val === "") {
          return event.data.player;
        }
        return val;
      });
      setBoard(updatedBoard);
    } else if (event.type === "game-reset" && event.user.id !== client.userID) {
      resetBoard();
    }
  });

  return (
    <>
      {showMessage && (
        <div className="message">
          {message}
          {/* <button onClick={() => setShowMessage(false)}>OK</button> */}
        </div>
      )}

      <div className="board">
        <Square chooseSquare={() => chooseSquare(0)} value={board[0]} />
        <Square chooseSquare={() => chooseSquare(1)} value={board[1]} />
        <Square chooseSquare={() => chooseSquare(2)} value={board[2]} />

        <Square chooseSquare={() => chooseSquare(3)} value={board[3]} />
        <Square chooseSquare={() => chooseSquare(4)} value={board[4]} />
        <Square chooseSquare={() => chooseSquare(5)} value={board[5]} />

        <Square chooseSquare={() => chooseSquare(6)} value={board[6]} />
        <Square chooseSquare={() => chooseSquare(7)} value={board[7]} />
        <Square chooseSquare={() => chooseSquare(8)} value={board[8]} />
      </div>

      {gameOver && <ResetButton resetBoard={handleResetButtonClick} />}
    </>
  );
}

export default Board;
