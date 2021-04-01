import React, { useState, useEffect } from "react";

import { ProgressItem } from "./ProgressItem";
import { OrderForm } from "./OrderForm";

function App() {
  const [order, setOrder] = useState(null);
  const [progressItems, setProgressItems] = useState([]);

  useEffect(() => {
    if (!order) {
      return;
    }

    fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => addProgress(data, 'Order received success.'))
      .catch((err) => addProgress(err, 'Order rejected failed.'));
  }, [order]);

  function addProgress (data, title) {
    const item = { data, timestamp: Date.now(), title };
    setProgressItems([...progressItems, item]);
  };

  function onSubmitOrder(order) {
    addProgress(order, 'Order submitted.');
    setOrder(order);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <header className="my-2">
            <h1 className="display-4">Food to Go</h1>
            <h4>Fake delivery food store</h4>
            <p className="text-muted">
              Sample of event-driven-arch github project.{" "}
              <a
                href="https://github.com/allenjoseph/event-driven-arch"
                target="_blank"
              >
                github.com/allenjoseph/event-driven-arch
              </a>
            </p>
          </header>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <OrderForm onSubmitOrder={onSubmitOrder}></OrderForm>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            {progressItems.map((item, index) => (<ProgressItem key={index} progress={item}></ProgressItem>))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
