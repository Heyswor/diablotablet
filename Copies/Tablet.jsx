import React, { useState, useEffect } from "react";
import css from "./Tablet.module.css";
import "firebase/compat/firestore";
import db from "../../../services/firebase";

const OrderForm = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [booster, setBooster] = useState("");
  const [levelRange, setLevelRange] = useState("");
  const [priceForBooster, setPriceForBooster] = useState("");
  const [price, setPrice] = useState("");
  const [selfplayPilot, setSelfplayPilot] = useState("");
  const [commentary, setCommentary] = useState("");
  const [orders, setOrders] = useState([]);
  const [boosterFilter, setBoosterFilter] = useState("");
  const [showBoosterFilter, setShowBoosterFilter] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection("orders").onSnapshot((snapshot) => {
      const updatedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(updatedOrders);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value);
  };

  const handleBoosterChange = (event) => {
    setBooster(event.target.value);
  };

  const handleLevelRangeChange = (event) => {
    setLevelRange(event.target.value);
  };

  const handlePriceForBoosterChange = (event) => {
    setPriceForBooster(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSelfplayPilot = (event) => {
    setSelfplayPilot(event.target.value);
  };

  const handleCommentary = (event) => {
    setCommentary(event.target.value);
  };

  const handleBoosterFilterChange = (event) => {
    setBoosterFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      orderNumber,
      booster,
      levelRange,
      priceForBooster,
      price,
      selfplayPilot,
      commentary,
      completed: false,
    };

    db.collection("orders")
      .add(newOrder)
      .then((docRef) => {
        console.log("Данные успешно добавлены в Cloud Firestore");
        console.log("ID нового документа:", docRef.id);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении данных:", error);
      });

    setOrderNumber("");
    setBooster("");
    setLevelRange("");
    setPriceForBooster("");
    setPrice("");
    setSelfplayPilot("");
    setCommentary("");
  };

  const handleComplete = (index) => {
    const orderId = orders[index].id;
    const orderToUpdate = db.collection("orders").doc(orderId);
    orderToUpdate
      .get()
      .then((doc) => {
        if (doc.exists) {
          const completed = doc.data().completed;
          orderToUpdate.update({ completed: !completed });
        } else {
          console.log("Документ не найден!");
        }
      })
      .catch((error) => {
        console.error(
          "Ошибка при обновлении статуса выполнения заказа:",
          error
        );
      });
  };

  const handleDelete = (index) => {
    const orderId = orders[index].id;
    db.collection("orders")
      .doc(orderId)
      .delete()
      .then(() => {
        console.log("Заказ успешно удален из Cloud Firestore");
      })
      .catch((error) => {
        console.error("Ошибка при удалении заказа:", error);
      });
  };

  return (
    <div className={css.orderBlock}>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit} className={css.orderForm}>
        <div>
          <label htmlFor="orderNumber">Order number:</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={handleOrderNumberChange}
          />
        </div>
        <div>
          <label htmlFor="booster">Booster:</label>
          <input
            type="text"
            id="booster"
            value={booster}
            onChange={handleBoosterChange}
          />
        </div>

        <div>
          <label htmlFor="priceForBooster">Price for a booster:</label>
          <input
            type="text"
            id="priceForBooster"
            value={priceForBooster}
            onChange={handlePriceForBoosterChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="levelRange">Level:</label>
          <input
            type="text"
            id="levelRange"
            value={levelRange}
            onChange={handleLevelRangeChange}
          />
        </div>
        <div>
          <label htmlFor="selfplayPilot">Selfplay/Pilot:</label>
          <input
            type="text"
            id="selfplayPilot"
            value={selfplayPilot}
            onChange={handleSelfplayPilot}
          />
        </div>
        <div>
          <label htmlFor="commentary">Commentary:</label>
          <input
            type="text"
            id="commentary"
            value={commentary}
            onChange={handleCommentary}
          />
        </div>
        <button type="submit">Send</button>
      </form>

      {orders.length > 0 && (
        <div>
          <h2>Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order number</th>
                <th>
                  Booster{" "}
                  <button
                    onClick={() => setShowBoosterFilter(!showBoosterFilter)}
                    className={css.filterBtn}
                  >
                    Filter
                  </button>
                  {showBoosterFilter && (
                    <input
                      type="text"
                      value={boosterFilter}
                      onChange={handleBoosterFilterChange}
                    />
                  )}
                </th>
                <th>Price for a booster</th>
                <th>Price</th>
                <th>Level</th>
                <th>Selfplay/Pilot:</th>
                <th>Commentary</th>
                <th>Completed</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) =>
                  order.booster
                    .toLowerCase()
                    .includes(boosterFilter.toLowerCase())
                )
                .map((order, index) => (
                  <tr
                    key={order.id}
                    className={order.completed ? css.completed : ""}
                  >
                    <td>{order.orderNumber}</td>
                    <td>{order.booster}</td>
                    <td>{order.priceForBooster}</td>
                    <td>{order.price}</td>
                    <td>{order.levelRange}</td>
                    <td>{order.selfplayPilot}</td>
                    <td>{order.commentary}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={order.completed}
                        onChange={() => handleComplete(index)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderForm;
