import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const dishes = [
    { name: "Lomo saltado", address: "Jirón Cabo Pantoja, 454" },
    { name: "Aji de gallina", address: "Avenida Grau, 1214" },
    { name: "Ceviche", address: "Avenida Alfredo Mendiola, 6821" },
    { name: "Pachamanca", address: "Avenida Mártires De Uchuraccay, 956" },
    { name: "Cuy chactado", address: "Jiron Chavin, 80" },
    { name: "Tacacho con cecina", address: "Jirón Jimenez Pimentel, 541" },
  ];

export function OrderForm(props) {
    const formEl = useRef(null);

    function onChangeSelect(e) {
        formEl.current.address.value = dishes.find((o) => o.name === e.target.value).address;
    }

    function dishMapper(dish, index) {
        return (
            <option key={index} value={dish.name}>{dish.name}</option>
        );
    }

    function onSubmitForm(e) {
        e.preventDefault();
        const order = {
            uuid: uuidv4(),
            dish: e.target.dish.value,
            address: e.target.address.value,
            note: e.target.note.value,
        };
        props.onSubmitOrder(order);
        formEl.current.reset();
    }

    return (
    <form className="my-2" onSubmit={onSubmitForm} ref={formEl}>
        <div className="form-group">
        <label htmlFor="formControlNoteDish">Dish</label>
        <select
            name="dish"
            onChange={onChangeSelect}
            className="form-control"
            id="formControlNoteDish"
        >
            <option value="">Select a dish</option>
            {dishes.map(dishMapper)}
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
  );
}