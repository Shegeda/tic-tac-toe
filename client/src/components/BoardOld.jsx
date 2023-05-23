// import React, { useEffect, useState } from "react";
// import { useChannelStateContext, useChatContext } from "stream-chat-react";
// import Square from "./Square";
// import { Patterns } from "./WinningPatterns";
// import ResetButton from "./ResetButton";

// function Board({ result, setResult }) {
//   // Будемо стежити за кожним <Square /> де буде Х або О
//   const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
//   // Додаємо першого гравця
//   const [player, setPlayer] = useState("X");
//   // Змінюємо гравців
//   const [turn, setTurn] = useState("X");

//   // Підключили канал який буде передавати подію натискання на поле
//   const { channel } = useChannelStateContext();
//   const { client } = useChatContext();

//   // useEffect буде викликаний коли board буде змінено викликаємо функції перемога та нічия
//   useEffect(() => {
//     checkIfTie();
//     checkWin();
//   }, [board]);

//   const chooseSquare = async (square) => {
//     // перевірка на співпадіння гравця зі зміною сторони та на порожній квадрат
//     if (turn === player && board[square] === "") {
//       // Змінюємо сторону, якщо значення гравця дорівнює з "Х" на "О"
//       setTurn(player === "X" ? "O" : "X");

//       // Передача на дій на другий канал
//       await channel.sendEvent({
//         type: "game-move",
//         data: { square, player },
//       });
//       setBoard(
//         // проходимось по значеннях дошки і перевір на співпадіння значення поля та його індексу
//         board.map((val, idx) => {
//           if (idx === square && val === "") {
//             return player;
//           }
//           return val;
//         })
//       );
//       const chooseSquare = async (square) => {
//         if (turn === player && board[square] === "") {
//           setTurn(player === "X" ? "O" : "X");
      
//           await channel.sendEvent({
//             type: "game-move",
//             data: { square, player },
//           });
      
//           // Оновлення дошки після отримання події від іншого гравця
//           const updatedBoard = board.map((val, idx) => {
//             if (idx === square && val === "") {
//               return player;
//             }
//             return val;
//           });
      
//           setBoard(updatedBoard);
//         }
//       };
//     }
    
    
//   };

//   // Визначаємо переможця
//   const checkWin = () => {
//     Patterns.forEach((currPattern) => {
//       const firstPlayer = board[currPattern[0]];
//       if (firstPlayer === "") return;
//       let foundWinningPattern = true;
//       currPattern.forEach((idx) => {
//         if (firstPlayer !== board[idx]) {
//           foundWinningPattern = false;
//         }
//       });
//       if (foundWinningPattern) {
//         alert(`Переможець, гравець - ${board[currPattern[0]]}. Вітання :)`);
//         setResult({ winner: board[currPattern[0]], state: "won" });
//       }
//     });
//   };

//   // Перевірка на нічию
//   const checkIfTie = () => {
//     let filled = true;
//     // проходимо по кожному квадрату
//     board.forEach((square) => {
//       if (square === "") {
//         filled = false;
//       }
//     });

//     if (filled) {
//       alert(`Хмм.. Нічия, спробуй ще.`);
//       setResult({ winner: "none", state: "tie" });
//     }
//   };

//   // Кнопка перезапуску гри
//   const resetBoard = () => {
//     setBoard(["", "", "", "", "", "", "", "", ""]);
//     setResult({ winner: "", state: "" });

//      // Повідомляємо іншого гравця про скидання дошки
//      channel.sendEvent({
//       type: "game-reset",
//     });
//   };

//   // Так слухає подію інший гравець
//   channel.on((event) => {
//     if (event.type === "game-move" && event.user.id !== client.userID) {
//       // Робимо хак щоб змінювати Х на О
//       const currentPlayer = event.data.player === "X" ? "O" : "X";
//       setPlayer(currentPlayer);
//       setTurn(currentPlayer);
//       setBoard(
//         board.map((val, idx) => {
//           if (idx === event.data.square && val === "") {
//             return event.data.player;
//           }
//           return val;
//         })
//       );
//     }
//   });

//   return (
//     <>
//       <div className="board">
//         {/* value це індекс массиву board */}
//         <Square chooseSquare={() => chooseSquare(0)} value={board[0]} />
//         <Square chooseSquare={() => chooseSquare(1)} value={board[1]} />
//         <Square chooseSquare={() => chooseSquare(2)} value={board[2]} />

//         <Square chooseSquare={() => chooseSquare(3)} value={board[3]} />
//         <Square chooseSquare={() => chooseSquare(4)} value={board[4]} />
//         <Square chooseSquare={() => chooseSquare(5)} value={board[5]} />

//         <Square chooseSquare={() => chooseSquare(6)} value={board[6]} />
//         <Square chooseSquare={() => chooseSquare(7)} value={board[7]} />
//         <Square chooseSquare={() => chooseSquare(8)} value={board[8]} />
//       </div>
//       <ResetButton resetBoard={resetBoard}/>
//     </>
//   );
// }

// export default Board;




// import React, { useEffect, useState } from "react";
// import { useChannelStateContext, useChatContext } from "stream-chat-react";
// import Square from "./Square";
// import { Patterns } from "./WinningPatterns";
// import ResetButton from "./ResetButton";

// function Board({ result, setResult }) {
//   const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
//   const [player, setPlayer] = useState("X");
//   const [turn, setTurn] = useState("X");

//   const { channel } = useChannelStateContext();
//   const { client } = useChatContext();

//   useEffect(() => {
//     checkIfTie();
//     checkWin();
//   }, [board]);

//   const chooseSquare = async (square) => {
//     if (turn === player && board[square] === "") {
//       setTurn(player === "X" ? "O" : "X");

//       await channel.sendEvent({
//         type: "game-move",
//         data: { square, player },
//       });

//       const updatedBoard = board.map((val, idx) => {
//         if (idx === square && val === "") {
//           return player;
//         }
//         return val;
//       });

//       setBoard(updatedBoard);
//     }
//   };

//   const checkWin = () => {
//     Patterns.forEach((currPattern) => {
//       const firstPlayer = board[currPattern[0]];
//       if (firstPlayer === "") return;
//       let foundWinningPattern = true;
//       currPattern.forEach((idx) => {
//         if (firstPlayer !== board[idx]) {
//           foundWinningPattern = false;
//         }
//       });
//       if (foundWinningPattern) {
//         alert(`Переможець, гравець - ${board[currPattern[0]]}. Вітання :)`);
//         setResult({ winner: board[currPattern[0]], state: "won" });
//       }
//     });
//   };

//   const checkIfTie = () => {
//     let filled = true;
//     board.forEach((square) => {
//       if (square === "") {
//         filled = false;
//       }
//     });

//     if (filled) {
//       alert(`Хмм.. Нічия, спробуй ще.`);
//       setResult({ winner: "none", state: "tie" });
//     }
//   };

//   const resetBoard = () => {
//     setBoard(["", "", "", "", "", "", "", "", ""]);
//     setResult({ winner: "", state: "" });

//     channel.sendEvent({
//       type: "game-reset",
//     });
//   };

//   channel.on((event) => {
//     if (event.type === "game-move" && event.user.id !== client.userID) {
//       const currentPlayer = event.data.player === "X" ? "O" : "X";
//       setPlayer(currentPlayer);
//       setTurn(currentPlayer);
//       setBoard(
//         board.map((val, idx) => {
//           if (idx === event.data.square && val === "") {
//             return event.data.player;
//           }
//           return val;
//         })
//       );
//     } else if (event.type === "game-reset") {
//       setBoard(["", "", "", "", "", "", "", "", ""]);
//       setResult({ winner: "", state: "" });
//     }
//   });

//   return (
//     <>
//       <div className="board">
//         <Square chooseSquare={() => chooseSquare(0)} value={board[0]} />
//         <Square chooseSquare={() => chooseSquare(1)} value={board[1]} />
//         <Square chooseSquare={() => chooseSquare(2)} value={board[2]} />

//         <Square chooseSquare={() => chooseSquare(3)} value={board[3]} />
//         <Square chooseSquare={() => chooseSquare(4)} value={board[4]} />
//         <Square chooseSquare={() => chooseSquare(5)} value={board[5]} />

//         <Square chooseSquare={() => chooseSquare(6)} value={board[6]} />
//         <Square chooseSquare={() => chooseSquare(7)} value={board[7]} />
//         <Square chooseSquare={() => chooseSquare(8)} value={board[8]} />
//       </div>
//       <ResetButton resetBoard={resetBoard} />
//     </>
//   );
// }

// export default Board;





// import React, { useEffect, useState } from "react";
// import { useChannelStateContext, useChatContext } from "stream-chat-react";
// import Square from "./Square";
// import { Patterns } from "./WinningPatterns";
// import ResetButton from "./ResetButton";

// function Board({ result, setResult }) {
//   // Будемо стежити за кожним <Square /> де буде Х або О
//   const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
//   // Додаємо першого гравця
//   const [player, setPlayer] = useState("X");
//   // Змінюємо гравців
//   const [turn, setTurn] = useState("X");

//   // Підключили канал який буде передавати подію натискання на поле
//   const { channel } = useChannelStateContext();
//   const { client } = useChatContext();

//   // useEffect буде викликаний коли board буде змінено викликаємо функції перемога та нічия
//   useEffect(() => {
//     checkIfTie();
//     checkWin();
//   }, [board]);

//   const chooseSquare = async (square) => {
//     // перевірка на співпадіння гравця зі зміною сторони та на порожній квадрат
//     if (turn === player && board[square] === "") {
//       // Змінюємо сторону, якщо значення гравця дорівнює з "Х" на "О"
//       setTurn(player === "X" ? "O" : "X");

//       // Передача на дій на другий канал
//       await channel.sendEvent({
//         type: "game-move",
//         data: { square, player },
//       });
//       setBoard(
//         // проходимось по значеннях дошки і перевір на співпадіння значення поля та його індексу
//         board.map((val, idx) => {
//           if (idx === square && val === "") {
//             return player;
//           }
//           return val;
//         })
//       );
//       const chooseSquare = async (square) => {
//         if (turn === player && board[square] === "") {
//           setTurn(player === "X" ? "O" : "X");
      
//           await channel.sendEvent({
//             type: "game-move",
//             data: { square, player },
//           });
      
//           // Оновлення дошки після отримання події від іншого гравця
//           const updatedBoard = board.map((val, idx) => {
//             if (idx === square && val === "") {
//               return player;
//             }
//             return val;
//           });
      
//           setBoard(updatedBoard);
//         }
//       };
//     }
    
    
//   };

//   // Визначаємо переможця
//   const checkWin = () => {
//     Patterns.forEach((currPattern) => {
//       const firstPlayer = board[currPattern[0]];
//       if (firstPlayer === "") return;
//       let foundWinningPattern = true;
//       currPattern.forEach((idx) => {
//         if (firstPlayer !== board[idx]) {
//           foundWinningPattern = false;
//         }
//       });
//       if (foundWinningPattern) {
//         alert(`Переможець, гравець - ${board[currPattern[0]]}. Вітання :)`);
//         setResult({ winner: board[currPattern[0]], state: "won" });
//       }
//     });
//   };

//   // Перевірка на нічию
//   const checkIfTie = () => {
//     let filled = true;
//     // проходимо по кожному квадрату
//     board.forEach((square) => {
//       if (square === "") {
//         filled = false;
//       }
//     });

//     if (filled) {
//       alert(`Хмм.. Нічия, спробуй ще.`);
//       setResult({ winner: "none", state: "tie" });
//     }
//   };

//   // Кнопка перезапуску гри
//   const resetBoard = () => {
//     setBoard(["", "", "", "", "", "", "", "", ""]);
//     setResult({ winner: "", state: "" });

//      // Повідомляємо іншого гравця про скидання дошки
//      channel.sendEvent({
//       type: "game-reset",
//     });
//   };

//   // Так слухає подію інший гравець
//   channel.on((event) => {
//     if (event.type === "game-move" && event.user.id !== client.userID) {
//       // Робимо хак щоб змінювати Х на О
//       const currentPlayer = event.data.player === "X" ? "O" : "X";
//       setPlayer(currentPlayer);
//       setTurn(currentPlayer);
//       setBoard(
//         board.map((val, idx) => {
//           if (idx === event.data.square && val === "") {
//             return event.data.player;
//           }
//           return val;
//         })
//       );
//     }
//   });

//   return (
//     <>
//       <div className="board">
//         {/* value це індекс массиву board */}
//         <Square chooseSquare={() => chooseSquare(0)} value={board[0]} />
//         <Square chooseSquare={() => chooseSquare(1)} value={board[1]} />
//         <Square chooseSquare={() => chooseSquare(2)} value={board[2]} />

//         <Square chooseSquare={() => chooseSquare(3)} value={board[3]} />
//         <Square chooseSquare={() => chooseSquare(4)} value={board[4]} />
//         <Square chooseSquare={() => chooseSquare(5)} value={board[5]} />

//         <Square chooseSquare={() => chooseSquare(6)} value={board[6]} />
//         <Square chooseSquare={() => chooseSquare(7)} value={board[7]} />
//         <Square chooseSquare={() => chooseSquare(8)} value={board[8]} />
//       </div>
//       <ResetButton resetBoard={resetBoard}/>
//     </>
//   );
// }

// export default Board;


// const resetBoard = async () => {
//     try {
//       setBoard(["", "", "", "", "", "", "", "", ""]); // Очистка дошки
//       setResult({ winner: "", state: "" }); // Очистка результату
//       setGameOver(false); // Гра не закінчена
//       setShowMessage(false); // Сховати повідомлення

//       // Відправлення події про скидання гри на канал
//       await new Promise((resolve) => setTimeout(resolve, 5000)); // Затримка 1 секунда перед надсиланням наступного запиту
//       await channel.sendEvent({ type: "game-reset" });
   

//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     } catch (error) {
//       console.error("Помилка під час скидання гри:", error);
//     }

//   };