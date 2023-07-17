import React, { useState, useEffect } from "react";
import OrderForm from "./TabletComponent/Tablet";
import css from "./OrderTablet.module.css";
import { auth } from "../../services/firebaseAuth";

const OrderTablet = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        event.target.login.value,
        event.target.password.value
      );
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } catch (error) {
      alert(`Ошибка при входе: ${error.message}`);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Вызов функции для регистрации пользователя через Firebase
      await auth.createUserWithEmailAndPassword(
        event.target.login.value,
        event.target.password.value
      );
      alert("Регистрация успешна!");
      event.target.reset();
    } catch (error) {
      alert(`Ошибка при регистрации: ${error.message}`);
    }
  };

  return (
    <div className={css.tirBlock}>
      {isLoggedIn ? (
        <div className={css.tirBlock}>
          <h1 className={css.header}>Welcome, Master!</h1>
          <form className={css.blockForm}>
            <button onClick={handleLogout}>Exit</button>
          </form>

          <OrderForm />
        </div>
      ) : (
        <div>
          <h1 className={css.header}>Login / Register</h1>
          <form onSubmit={handleLogin} className={css.blockForm}>
            <input type="text" name="login" placeholder="login" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Login</button>
          </form>
          <form onSubmit={handleSignUp} className={css.blockForm}>
            <h2>Register</h2>
            <input type="text" name="login" placeholder="login" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderTablet;
