import { useState, useEffect } from "react";
import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import JoinGame from "./components/JoinGame";

import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";

import Cookies from "universal-cookie";

import { Button } from "@mui/material";

function App() {
  // Ключ API Stream Chat
  const api_key = "27999mm38vxf";
  const cookies = new Cookies();

  // Отримання токена з куків
  const token = cookies.get("token");

  // Створення станів для клієнта та автентифікації
  const [client, setClient] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  // Функція для виходу з системи
  const logOut = () => {
    // Видалення кукісів
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  };

  useEffect(() => {
    if (token) {
      const initializeClient = async () => {
        // Ініціалізація клієнта Stream Chat
        const newClient = StreamChat.getInstance(api_key);

        // Підключення користувача до чату з використанням токена
        await newClient.connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        );

        // Збереження клієнта в стані
        setClient(newClient);
        setIsAuth(true);
      };

      // Ініціалізація клієнта після отримання токена
      initializeClient();
    }
  }, [token]);

  return (
    <div className="App">
      {isAuth && client ? (
        // Відображення чату, якщо користувач автентифікований
        <Chat className="app-container" client={client}>
          <JoinGame />
          <Button
            className="button-logout"
            variant="outlined"
            color="error"
            onClick={logOut}
          >
            Вийти
          </Button>
        </Chat>
      ) : (
        // Відображення форми реєстрації та входу, якщо користувач неавтентифікований
        <div className="container-signUp-login">
          <SignUp setIsAuth={setIsAuth} setClient={setClient} />
          <Login setIsAuth={setIsAuth} setClient={setClient} />
        </div>
      )}
    </div>
  );
}

export default App;
