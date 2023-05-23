import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function SignUp({setIsAuth}) {
  // Зберігання аунтифікованого користувача за допомогою бібл "universal-cookie"
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    // Вказую або локал хост або свій айпі
    axios.post("http://192.168.8.250:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      // Встановлюємо cookies
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);

    

      setIsAuth(true)
    });
  };

  return (
    <div className="signUp">
      <label htmlFor="">Реєстрація</label>

      <TextField
        id="outlined-basic-name"
        label="Імʼя"
        type="text"
        variant="outlined"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />

      <TextField
        id="outlined-basic-lastName"
        label="Прізвище"
        type="text"
        variant="outlined"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />

      <TextField
        id="outlined-basic-userName"
        label="Нік"
        type="text"
        variant="outlined"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />

      <TextField
        id="outlined-basic-paswrd"
        label="Пароль"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />

      <Button onClick={signUp} variant="contained">
      Зареєструватися
      </Button>
    </div>
  );
}

export default SignUp;
