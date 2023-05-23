import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import { Button, TextField } from "@mui/material";
import Game from "./Game";
import "../App.css";

function JoinGame() {
  // Створення станів для імені супротивника, каналу та помилки
  const [rivalUsername, setRivalUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState("");

  // Отримання клієнта чату з контексту
  const { client } = useChatContext();

  // Функція для створення каналу
  const createChannel = async () => {
    // Запит на пошук користувача за ім'ям
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });
    if (response.users.length === 0) {
      // Перевірка наявності користувача
      setError("Такого ніку не існує!");
      return;
    }

    // Створення нового каналу чату зі спільними учасниками
    const newChannel = client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    // Підписка на канал для отримання оновлень
    await newChannel.watch();

    // Збереження нового каналу в стані
    setChannel(newChannel);
  };

  return (
    <>
      {channel ? (
        // Відображення гри в каналі
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        // Відображення форми для створення гри
        <div className="game">
          <h4>Вітальня 🤝</h4>
          <TextField
            id="outlined-basic-game"
            label="Нік суперника"
            type="text"
            variant="outlined"
            onChange={(event) => {
              // Оновлення стану імені супротивника при введенні
              setRivalUsername(event.target.value);
              setError(""); // Очищення помилки при введенні нових даних
            }}
          />
          {error && <p className="error-message">{error}</p>} {/* Відображення помилки */}
          <Button
            className="button-join-start"
            onClick={createChannel}
            variant="contained"
            color="success"
          >
            Поїхали
          </Button>
          
        </div>
      )}
    </>
  );
}

export default JoinGame;
