import React, { useState, useEffect } from "react";
import OrderForm from "./TabletComponent/Tablet";
import css from "./OrderTablet.module.css";
import { auth } from "../../services/firebaseAuth";

const OrderTablet = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        event.target.login.value,
        event.target.password.value
      );
    } catch (error) {
      alert(`Ошибка при входе: ${error.message}`);
    }
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
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
          <OrderForm user={user} />{" "}
          {/* Передача информации о текущем пользователе в OrderForm */}
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
