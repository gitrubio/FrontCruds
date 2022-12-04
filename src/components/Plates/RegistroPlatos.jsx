import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { changeState, initialPlate, plate } from "../../helper/const";

const Formplato = () => {
  const [plato, setplato] = useState({
    name   : plate.name,
    price  : plate.price,
    region : plate.region,
  });

  const validarDatos = () => {
    if (plato.name === "") {
      Swal.fire(
        "UPS!",
        "Su Plato no ha sido creado<br/> por favor ingrese un name",
        "failed"
      );
      return false;
    }
    if (plato.price === 0) {
      Swal.fire(
        "UPS!",
        "Su plato no ha sido creado<br/> ingrese una price",
        "failed"
      );
      return false;
    }
    if (plato.region === "") {
      Swal.fire(
        "UPS!",
        "Su plato no ha sido creado<br/> ingrese un region por favor",
        "failed"
      );
      return false;
    }
    // eslint-disable-next-line

    return true;
  };

  const guardarplato = async () => {
    try {
      if (!validarDatos()) {
        return;
      } else {
        axios
          .post("http://3.233.90.188:7002/api/plates", plato)
          .then((result) => {
            Swal.fire("HECHO!", "Su plato ha sido creado", "success");
          })
          .catch((error) => {
            Swal.fire("error!", "Su plato no se logro crear", "error");
          });
      }
    } catch (error) {
      console.log(error);
    }
    limpiar();
  };
  const editarplato = async () => {
    try {
      if (!validarDatos()) {
        return;
      } else {
        await axios.put(`http://3.233.90.188:7002/api/plates/${plate.id}`, plato);
        Swal.fire("HECHO!", "Su plato ha sido editado", "success");
      }
    } catch (error) {
      console.log(error);
    }
    limpiar();
  };

  const limpiar = () => {
    changeState(initialPlate);
    setplato({
      name   : "",
      price  : 0,
      region : "",
    });
  };

  return (
    <>
      <div
        style={{
          display        : "flex",
          alignItems     : "center",
          justifyContent : "center",
          position       : "relative",
          top            : "10px",
        }}
      >
        <form style={{ width: "600px" }}>
          <h3 style={{ fontWeight: "bold" }}>
            {plate.name !== "" ? "Editar plato" : "Hacer plato"}
          </h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={plato.name}
              onChange={(e) => setplato({ ...plato, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              price
            </label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="price"
              value={plato.price}
              onChange={(e) => setplato({ ...plato, price: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="region" className="form-label">
              region
            </label>
            <input
              type="text"
              className="form-control"
              id="region"
              value={plato.region}
              onChange={(e) => setplato({ ...plato, region: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between">
            {plate.name !== "" ? (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", margin: "5px" }}
                onClick={editarplato}
              >
                Editar
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", margin: "5px" }}
                onClick={guardarplato}
              >
                Enviar
              </button>
            )}
            <button
              type="button"
              className="btn btn-dark"
              style={{ width: "100%", margin: "5px" }}
              onClick={limpiar}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Formplato;
