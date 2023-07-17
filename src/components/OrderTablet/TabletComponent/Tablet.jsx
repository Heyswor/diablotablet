import React, { useState, useEffect } from "react";
import css from "./Tablet.module.css";
import { db } from "../../../services/firebase"; // Используйте обновленный путь к файлу firebase.js

const OrderForm = ({ user }) => {
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
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("orders")
        .where("userId", "==", user.uid)
        .onSnapshot((snapshot) => {
          const updatedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(updatedOrders);
        });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

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
      userId: user.uid, // Добавление идентификатора пользователя к заказу
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

  const handleEdit = (index) => {
    const editedOrder = orders[index];
    setEditingOrder(editedOrder);
  };

  const handleSave = (index) => {
    const editedOrder = editingOrder;
    const orderToUpdate = db.collection("orders").doc(editedOrder.id);

    const updatedOrder = {
      ...editedOrder,
      completed: editingOrder.completed,
    };

    orderToUpdate
      .update(updatedOrder)
      .then(() => {
        console.log("Заказ успешно обновлен в Cloud Firestore");
        setEditingOrder(null);

        setOrders((prevOrders) => [
          ...prevOrders.slice(0, index),
          updatedOrder,
          ...prevOrders.slice(index + 1),
        ]);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении заказа:", error);
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
                      className={css.filterInpt}
                    />
                  )}
                </th>
                <th>Price for a booster</th>
                <th>Price</th>
                <th>Level</th>
                <th>Selfplay/Pilot:</th>
                <th>Commentary</th>
                <th>Completed</th>
                <th>Edit</th>
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
                    onDoubleClick={() => handleEdit(index)}
                  >
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.orderNumber}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              orderNumber: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.orderNumber
                      )}
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.booster}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              booster: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.booster
                      )}
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.priceForBooster}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              priceForBooster: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.priceForBooster
                      )}
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.price}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              price: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.price
                      )}
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.levelRange}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              levelRange: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.levelRange
                      )}
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.selfplayPilot}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              selfplayPilot: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.selfplayPilot
                      )}
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <input
                          type="text"
                          value={editingOrder.commentary}
                          onChange={(event) =>
                            setEditingOrder({
                              ...editingOrder,
                              commentary: event.target.value,
                            })
                          }
                        />
                      ) : (
                        order.commentary
                      )}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={order.completed}
                        onChange={() => handleComplete(index)}
                      />
                    </td>
                    <td>
                      {editingOrder && editingOrder.id === order.id ? (
                        <button onClick={() => handleSave(index)}>Save</button>
                      ) : (
                        <button onClick={() => handleEdit(index)}>Edit</button>
                      )}
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
