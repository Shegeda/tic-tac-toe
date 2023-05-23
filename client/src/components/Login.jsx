import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function Login({setIsAuth}) {
  const cookies = new Cookies();
  const [username, setUserNmame] = useState(null);
  const [password, setPassword] = useState(null);

  const login = () => {
    axios
    // Вказую або локал хост або свій айпі
      .post("http://192.168.0.163:3001/login", { username, password })
      .then((res) => {
        const { firstName, lastName, token, userId, username } = res.data;
        // Встановлюємо cookies
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        // встановлення аутентифікації
        setIsAuth(true)
      });
  };

  return (
    <div className="login">
      <label htmlFor="">Увійти</label>

      <TextField
        id="outlined-basic-text"
        label="Імʼя"
        type="text"
        variant="outlined"
        onChange={(event) => {
          setUserNmame(event.target.value);
        }}
      />

      <TextField
        id="outlined-basic-password"
        label="Пароль"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <Button onClick={login} variant="contained">
        Ок
      </Button>
    </div>
  );
}

export default Login;
