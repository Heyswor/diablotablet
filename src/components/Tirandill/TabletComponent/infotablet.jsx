import React, { useState, useEffect } from "react";
import css from "./Tablet.module.css";

const OrderForm = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [booster, setBooster] = useState("");
  const [levelRange, setLevelRange] = useState("");
  const [priceForBooster, setPriceForBooster] = useState("");
  const [price, setPrice] = useState("");
  const [selfplayPilot, setSelfplayPilot] = useState("");
  const [commentary, setCommentary] = useState("");
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

    setOrders([...orders, newOrder]);

    setOrderNumber("");
    setBooster("");
    setLevelRange("");
    setPriceForBooster("");
    setPrice("");
    setSelfplayPilot("");
    setCommentary("");
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
                <th>Booster </th>
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
              {orders.map((order, index) => (
                <tr
                  key={index}
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
                    <button onClick={() => handleDelete(index)}>Delete</button>
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
