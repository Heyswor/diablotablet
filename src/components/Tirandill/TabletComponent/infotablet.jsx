import React, { useState, useEffect } from "react";
import css from "./Tablet.module.css"

const OrderForm = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [levelRange, setLevelRange] = useState("");
  const [executor, setExecutor] = useState("");
  const [price, setPrice] = useState("");
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value);
  };

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  const handleLevelRangeChange = (event) => {
    setLevelRange(event.target.value);
  };

  const handleExecutorChange = (event) => {
    setExecutor(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      orderNumber,
      clientName,
      levelRange,
      executor,
      price,
      completed: false,
    };

    setOrders([...orders, newOrder]);

    setOrderNumber("");
    setClientName("");
    setLevelRange("");
    setExecutor("");
    setPrice("");
  };

  const handleComplete = (index) => {
    const updatedOrders = [...orders];
    updatedOrders[index].completed = !updatedOrders[index].completed;
    setOrders(updatedOrders);
  };

  const handleDelete = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h1>Форма заказа</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="orderNumber">№ Заказа:</label>
          <input
            type="text"
            id="orderNumber"
            value={orderNumber}
            onChange={handleOrderNumberChange}
          />
        </div>
        <div>
          <label htmlFor="clientName">Имя клиента:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={handleClientNameChange}
          />
        </div>
        <div>
          <label htmlFor="levelRange">Диапазон уровней:</label>
          <input
            type="text"
            id="levelRange"
            value={levelRange}
            onChange={handleLevelRangeChange}
          />
        </div>
        <div>
          <label htmlFor="executor">Исполнитель:</label>
          <input
            type="text"
            id="executor"
            value={executor}
            onChange={handleExecutorChange}
          />
        </div>
        <div>
          <label htmlFor="price">Цена:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <button type="submit">Добавить заказ</button>
      </form>

      {orders.length > 0 && (
        <div>
          <h2>Таблица заказов</h2>
          <table>
            <thead>
              <tr>
                <th>№ Заказа</th>
                <th>Имя клиента</th>
                <th>Диапазон уровней</th>
                <th>Исполнитель</th>
                <th>Цена</th>
                <th>Выполнено</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className={order.completed ? css.completed : ""}>
                  <td>{order.orderNumber}</td>
                  <td>{order.clientName}</td>
                  <td>{order.levelRange}</td>
                  <td>{order.executor}</td>
                  <td>{order.price}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={order.completed}
                      onChange={() => handleComplete(index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Удалить</button>
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
