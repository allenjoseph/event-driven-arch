import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { v4 as uuidv4 } from "uuid";

dayjs.extend(relativeTime);

const dishes = [
  { name: "Lomo saltado", address: "Jirón Cabo Pantoja, 454" },
  { name: "Aji de gallina", address: "Avenida Grau, 1214" },
  { name: "Ceviche", address: "Avenida Alfredo Mendiola, 6821" },
  { name: "Pachamanca", address: "Avenida Mártires De Uchuraccay, 956" },
  { name: "Cuy chactado", address: "Jiron Chavin, 80" },
  { name: "Tacacho con cecina", address: "Jirón Jimenez Pimentel, 541" },
];

function ProgressItem(props) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {JSON.stringify(props.progress.data)}
      <span className="badge badge-light badge-pill">
        {dayjs(props.progress.timestamp).fromNow()}
      </span>
    </li>
  );
}

function App() {
  const formEl = useRef(null);
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
      .then((data) => addProgress(data))
      .catch((err) => addProgress(err));
  }, [order]);

  const addProgress = (data) => {
    const item = { data, timestamp: Date.now() };
    setProgressItems([...progressItems, item]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      uuid: uuidv4(),
      dish: e.target.dish.value,
      address: e.target.address.value,
      note: e.target.note.value,
    };
    addProgress(order);
    setOrder(order);
    formEl.current.reset();
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
          <form className="my-2" onSubmit={handleSubmit} ref={formEl}>
            <div className="form-group">
              <label htmlFor="formControlNoteDish">Dish</label>
              <select
                name="dish"
                onChange={(e) =>
                  (formEl.current.address.value = dishes.find(
                    (o) => o.name === e.target.value
                  ).address)
                }
                className="form-control"
                id="formControlNoteDish"
              >
                <option value="">Select a dish</option>
                {dishes.map((dish, index) => (
                  <option key={index} value={dish.name}>
                    {dish.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="formControlAddress">Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                id="formControlAddress"
                placeholder="Select a dish"
                readOnly="readonly"
              />
            </div>
            <div className="form-group">
              <label htmlFor="formControlNote">Note</label>
              <textarea
                name="note"
                className="form-control"
                id="formControlNote"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Order
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <ul className="list-group">
            {progressItems.map((item, index) => (
              <ProgressItem key={index} progress={item}></ProgressItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
