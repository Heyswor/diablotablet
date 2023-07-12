import React, { useState, useEffect } from "react";
import OrderForm from "../Tirandill/TabletComponent/infotablet";
import css from "./Tirandill.module.css";

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
    <div className={css.tirBlock}>
      {isLoggedIn ? (
        <div className={css.tirBlock}>
          <h1 className={css.header}>Wellcome, Master!</h1>
          <form className={css.blockForm}>
            <button onClick={handleLogout}>Exit</button>
          </form>

          <OrderForm />
        </div>
      ) : (
        <div>
          <h1 className={css.header}>Login</h1>
          <form onSubmit={handleLogin} className={css.blockForm}>
            <input
              type="text"
              placeholder="login"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Tirandill;
