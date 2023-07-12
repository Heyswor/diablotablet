import React, { useState } from "react";

const Tablet = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [levelRange, setLevelRange] = useState("");
  const [executor, setExecutor] = useState("");
  const [price, setPrice] = useState("");
  const [selfplayPilot, setSelfplayPilot] = useState("");

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

  const handleSelfplayPilot = (event) => {
    setSelfplayPilot(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Отправка данных формы на сервер или обработка локально
    const formData = {
      orderNumber,
      clientName,
      levelRange,
      executor,
      price,
      selfplayPilot,
    };

    console.log(formData);
    // Дополнительная логика для отправки или обработки данных формы
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
          <label htmlFor="clientName">Booster:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={handleClientNameChange}
          />
        </div>

        <div>
          <label htmlFor="executor">Цена для бустера:</label>
          <input
            type="text"
            id="executor"
            value={executor}
            onChange={handleExecutorChange}
          />
        </div>
        <div>
          <label htmlFor="price">Стоимость:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div>
          <label htmlFor="levelRange">level:</label>
          <input
            type="text"
            id="levelRange"
            value={levelRange}
            onChange={handleLevelRangeChange}
          />
        </div>
        <div>
          <label htmlFor="levelRange">Selfplay/Pilot:</label>
          <input
            type="text"
            id="SelfplayPilot"
            value={selfplayPilot}
            onChange={handleSelfplayPilot}
          />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default Tablet;
