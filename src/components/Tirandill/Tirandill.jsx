import React, { useState, useEffect } from "react";
import OrderForm from "../Tirandill/TabletComponent/infotablet";

const Tirandill = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Проверка состояния входа при загрузке страницы
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Проверка логина и пароля
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Неверный логин или пароль!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Добро пожаловать!</h1>
          <button onClick={handleLogout}>Выйти</button>
          <OrderForm />
        </div>
      ) : (
        <div>
          <h1>Вход</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Логин"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Войти</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tirandill;
